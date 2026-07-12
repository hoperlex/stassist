import { useEffect, useMemo, useRef, useState } from 'react';
import { AutoComplete, Checkbox, Form, Input, Typography } from 'antd';
import { api } from './api-client.js';

const { Text } = Typography;

export interface PlaceOption {
  placeName: string;
  lat: number;
  lon: number;
  tzId: string;
}

export interface PublicBirthValue {
  dateTime: { year: number; month: number; day: number; hour: number; minute: number; second: number };
  timeUnknown: boolean;
  tzId: string;
  place: { lat: number; lon: number; elevationM: number };
}

/**
 * Форма ввода данных рождения для анонимных калькуляторов (натал/совместимость) — дата, время
 * («время неизвестно»), место (автодополнение через ПУБЛИЧНЫЙ `/api/v1/calc/geocode/suggest`,
 * см. apps/api/src/routes/public-geocode.ts). Ничего не сохраняется — значение живёт только в
 * состоянии формы, отправляется в `/api/v1/calc/*` при расчёте (см. lib/api-client.ts, §4 промта
 * Ф3: анонимные расчётные эндпоинты без сохранения ПД).
 */
export function PublicBirthForm({
  label,
  onChange,
}: {
  label: string;
  onChange: (value: PublicBirthValue | null) => void;
}): React.JSX.Element {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [timeUnknown, setTimeUnknown] = useState(false);
  const [options, setOptions] = useState<PlaceOption[]>([]);
  const [place, setPlace] = useState<PlaceOption | null>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  function onSearch(query: string): void {
    setPlace(null);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (query.trim().length < 2) {
      setOptions([]);
      return;
    }
    debounceRef.current = setTimeout(() => {
      api
        .get<PlaceOption[]>(`/calc/geocode/suggest?q=${encodeURIComponent(query)}`)
        .then(setOptions)
        .catch(() => setOptions([]));
    }, 350);
  }

  function onSelect(placeName: string): void {
    const found = options.find((o) => o.placeName === placeName);
    if (found) setPlace(found);
  }

  const placeOptions = useMemo(() => options.map((o) => ({ value: o.placeName })), [options]);

  useEffect(() => {
    const dateMatch = /^(\d{4})-(\d{2})-(\d{2})$/.exec(date);
    if (!dateMatch || !place) {
      onChange(null);
      return;
    }
    const timeMatch = !timeUnknown ? /^(\d{2}):(\d{2})$/.exec(time) : null;
    if (!timeUnknown && !timeMatch) {
      onChange(null);
      return;
    }
    onChange({
      dateTime: {
        year: Number(dateMatch[1]),
        month: Number(dateMatch[2]),
        day: Number(dateMatch[3]),
        hour: timeMatch ? Number(timeMatch[1]) : 12,
        minute: timeMatch ? Number(timeMatch[2]) : 0,
        second: 0,
      },
      timeUnknown,
      tzId: place.tzId,
      place: { lat: place.lat, lon: place.lon, elevationM: 0 },
    });
    // `onChange` намеренно не в deps — родитель обычно передаёт новую функцию на каждый рендер
    // (setState), включение её в deps вызвало бы бесконечный цикл эффекта.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date, time, timeUnknown, place]);

  return (
    <Form layout="vertical">
      <Form.Item label={`${label}: дата рождения`} required>
        <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
      </Form.Item>
      <Form.Item>
        <Checkbox checked={timeUnknown} onChange={(e) => setTimeUnknown(e.target.checked)}>
          Точное время рождения неизвестно
        </Checkbox>
      </Form.Item>
      {!timeUnknown && (
        <Form.Item label={`${label}: время рождения`} required>
          <Input type="time" value={time} onChange={(e) => setTime(e.target.value)} />
        </Form.Item>
      )}
      <Form.Item label={`${label}: место рождения`} required>
        <AutoComplete
          style={{ width: '100%' }}
          options={placeOptions}
          onSearch={onSearch}
          onSelect={onSelect}
          // Короткий плейсхолдер: длинный текст задавал min-content шире телефона и распирал
          // страницу (у AntD Select плейсхолдер участвует в intrinsic-ширине). Подсказка про
          // «минимум 2 символа» реализована логикой onSearch (см. выше).
          placeholder="Начните вводить город"
        />
        {place && (
          <Text type="secondary" style={{ fontSize: 12 }}>
            Часовой пояс: {place.tzId}
          </Text>
        )}
      </Form.Item>
    </Form>
  );
}
