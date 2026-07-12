import { useEffect, useMemo, useRef, useState } from 'react';
import {
  Alert,
  AutoComplete,
  Button,
  Card,
  Checkbox,
  Form,
  Input,
  Select,
  Typography,
} from 'antd';
import { api, ApiError, getAccessToken } from '../../../lib/api-client.js';

const { Title, Text } = Typography;

interface GeocodeResultDto {
  placeName: string;
  lat: number;
  lon: number;
  tzId: string;
}

interface CalcPresetDto {
  id: string;
  name: string;
  isSystem: boolean;
}

interface BirthProfileFormValues {
  label: string;
  kind: 'self' | 'other' | 'celebrity';
  birthDate: string;
  birthTime?: string;
  timeUnknown: boolean;
  presetId?: string;
  gender?: string;
  notes?: string;
}

/** Автодополнение места рождения через `/api/v1/geocode/suggest` (Geocoder-порт + geocode_cache). */
function usePlaceAutocomplete() {
  const [options, setOptions] = useState<GeocodeResultDto[]>([]);
  const [selected, setSelected] = useState<GeocodeResultDto | null>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  function onSearch(query: string): void {
    setSelected(null);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (query.trim().length < 2) {
      setOptions([]);
      return;
    }
    // Debounce 350мс — соблюдение usage policy Nominatim (не бьём по внешнему API на каждый
    // символ), см. NominatimGeocoder в packages/shared/src/ports/geocoder.ts.
    debounceRef.current = setTimeout(() => {
      api
        .get<GeocodeResultDto[]>(`/geocode/suggest?q=${encodeURIComponent(query)}`)
        .then(setOptions)
        .catch(() => setOptions([]));
    }, 350);
  }

  function onSelect(placeName: string): void {
    const result = options.find((o) => o.placeName === placeName);
    if (result) setSelected(result);
  }

  return { options, selected, onSearch, onSelect };
}

export function Page(): React.JSX.Element {
  const [presets, setPresets] = useState<CalcPresetDto[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [timeUnknown, setTimeUnknown] = useState(false);
  const place = usePlaceAutocomplete();

  useEffect(() => {
    if (!getAccessToken()) {
      window.location.href = '/login?next=/profiles/new';
      return;
    }
    api
      .get<CalcPresetDto[]>('/calc-presets')
      .then(setPresets)
      .catch(() => setPresets([]));
  }, []);

  const placeOptions = useMemo(
    () => place.options.map((o) => ({ value: o.placeName })),
    [place.options],
  );

  async function onFinish(values: BirthProfileFormValues): Promise<void> {
    if (!place.selected) {
      setError('Выберите место рождения из списка подсказок.');
      return;
    }
    setSubmitting(true);
    setError(null);
    try {
      const profile = await api.post<{ id: string }>('/birth-profiles', {
        label: values.label,
        kind: values.kind,
        birthDate: values.birthDate,
        birthTime: values.timeUnknown ? undefined : values.birthTime,
        timeUnknown: values.timeUnknown,
        place: place.selected,
        presetId: values.presetId || undefined,
        gender: values.gender || undefined,
        notes: values.notes || undefined,
      });
      window.location.href = `/profiles/${profile.id}`;
    } catch (err) {
      if (err instanceof ApiError && err.code === 'consent_required') {
        window.location.href = '/consent?next=/profiles/new';
        return;
      }
      setError(err instanceof ApiError ? err.message : 'Не удалось сохранить профиль.');
      setSubmitting(false);
    }
  }

  return (
    <main style={{ maxWidth: 560, margin: '64px auto', padding: '0 24px' }}>
      <Text>
        <a href="/profiles">← Ко всем профилям</a>
      </Text>
      <Card style={{ marginTop: 16 }}>
        <Title level={3}>Новый профиль рождения</Title>
        {error && <Alert type="error" showIcon message={error} style={{ marginBottom: 16 }} />}
        <Form<BirthProfileFormValues>
          layout="vertical"
          disabled={submitting}
          initialValues={{ kind: 'self', timeUnknown: false }}
          onFinish={onFinish}
        >
          <Form.Item label="Название профиля" name="label" rules={[{ required: true, message: 'Укажите название' }]}>
            <Input placeholder="Например: «Я», «Партнёр», «Ребёнок»" maxLength={100} />
          </Form.Item>

          <Form.Item label="Чей это профиль" name="kind">
            <Select
              options={[
                { value: 'self', label: 'Мой собственный' },
                { value: 'other', label: 'Другой человек' },
                { value: 'celebrity', label: 'Знаменитость' },
              ]}
            />
          </Form.Item>

          <Form.Item label="Дата рождения" name="birthDate" rules={[{ required: true, message: 'Укажите дату рождения' }]}>
            <Input type="date" />
          </Form.Item>

          <Form.Item name="timeUnknown" valuePropName="checked">
            <Checkbox onChange={(e) => setTimeUnknown(e.target.checked)}>Точное время рождения неизвестно</Checkbox>
          </Form.Item>

          {!timeUnknown && (
            <Form.Item
              label="Время рождения"
              name="birthTime"
              rules={[{ required: !timeUnknown, message: 'Укажите время или отметьте «время неизвестно»' }]}
            >
              <Input type="time" />
            </Form.Item>
          )}

          <Form.Item label="Место рождения" required>
            {/* data-testid для e2e — Form.Item без `name` не связывает <label> c AutoComplete
                автоматически (место выбирается через отдельный usePlaceAutocomplete-хук, а не
                через Form-состояние), поэтому getByLabel не сработал бы. */}
            <AutoComplete
              id="place-input"
              options={placeOptions}
              onSearch={place.onSearch}
              onSelect={place.onSelect}
              placeholder="Начните вводить город (минимум 2 символа)"
            />
            {place.selected && (
              <Text type="secondary" style={{ fontSize: 12 }}>
                Часовой пояс на момент рождения: {place.selected.tzId}
              </Text>
            )}
          </Form.Item>

          {presets.length > 0 && (
            <Form.Item label="Расчётный пресет" name="presetId" extra="По умолчанию — «Современная западная».">
              <Select
                allowClear
                placeholder="Современная западная (по умолчанию)"
                options={presets.map((p) => ({ value: p.id, label: p.name }))}
              />
            </Form.Item>
          )}

          <Form.Item label="Пол (необязательно)" name="gender">
            <Input maxLength={50} />
          </Form.Item>
          <Form.Item label="Заметки (необязательно)" name="notes">
            <Input.TextArea maxLength={2000} rows={3} />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={submitting} block>
              Сохранить и рассчитать карту
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </main>
  );
}
