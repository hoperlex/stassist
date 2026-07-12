import { describe, expect, it } from 'vitest';
import { buildSoftRefusalText, detectForbidden } from './forbidden-filters.js';

describe('detectForbidden — реальные запросы по-прежнему ловятся (recall)', () => {
  it.each([
    ['когда я умру?', 'death'],
    ['предскажи мою смерть по карте', 'death'],
    ['сниму ли я порчу', 'curse'],
    ['есть ли на мне сглаз', 'curse'],
    ['поставь мне диагноз по симптомам', 'medical'],
    ['вылечи мою болезнь при помощи звёзд', 'medical'],
    ['гарантируете, что я выйду замуж в этом году', 'guarantee'],
  ])('«%s» → %s', (text, category) => {
    expect(detectForbidden(text).map((m) => m.category)).toContain(category);
  });
});

describe('detectForbidden — отрицание/оговорка НЕ триггерит (не рубим добросовестный текст, блок C)', () => {
  it.each([
    'Это не приговор и не диагноз, а склонность, окрашенная всей картой.',
    'Астрология описывает тенденции и ничего не гарантирует.',
    'Я не ставлю медицинские диагнозы и не даю рекомендаций по лечению.',
    'Портал «Зодиакум» не занимается темами порчи и сглаза.',
    'Свойства камня — традиция, а не гарантия результата.',
    'Это склонность, а не гарантия, и проявится настолько, насколько вы сами захотите.',
  ])('«%s» → нет срабатываний', (text) => {
    expect(detectForbidden(text)).toEqual([]);
  });

  it('отрицание снимает ТОЛЬКО ложное срабатывание, реальный запрос в том же тексте ловит', () => {
    // «ничего не гарантирую» (оговорка) снимается, но «поставь диагноз» (реальный запрос) остаётся
    const matches = detectForbidden('Ничего не гарантирую. Но всё равно поставь мне диагноз по дате рождения.');
    expect(matches.map((m) => m.category)).toContain('medical');
    expect(matches.map((m) => m.category)).not.toContain('guarantee');
  });
});

describe('detectForbidden — подстроки-омонимы НЕ триггерят (over-match фикс)', () => {
  it.each([
    'Венера отвечает за влечение и вкус к красоте.',
    'Его увлечение музыкой перерастает в дело жизни.',
    'Это лёгкое развлечение, а не серьёзный выбор.',
    'Привлечение внимания даётся ему легко.',
    'Вопрос не в том, достаточно ли я делаю, а в том, живу ли я своей жизнью.',
    'На критику он реагирует болезненно, близко к сердцу.',
    'Это была болезненная, но важная тема для разговора.',
  ])('«%s» → нет срабатываний', (text) => {
    expect(detectForbidden(text)).toEqual([]);
  });

  it('настоящее «лечение»/«точно ли»/«болезнь» по-прежнему ловятся', () => {
    expect(detectForbidden('назначь мне лечение травами').map((m) => m.category)).toContain('medical');
    expect(detectForbidden('точно ли я разбогатею?').map((m) => m.category)).toContain('guarantee');
    expect(detectForbidden('какая болезнь мне грозит по карте').map((m) => m.category)).toContain('medical');
  });
});

describe('detectForbidden — легитимные метафоры и нейтральное', () => {
  it('13-й Аркан «Смерть» как архетип трансформации — не death', () => {
    expect(detectForbidden('Аркан 13 («Смерть») раскрывает тему трансформации и обновления.')).toEqual([]);
  });
  it('нейтральный астротекст — пусто', () => {
    expect(detectForbidden('Марс в Скорпионе усиливает волю и глубину переживаний.')).toEqual([]);
  });
});

describe('buildSoftRefusalText', () => {
  it('склеивает уникальные категории без дублей', () => {
    const text = buildSoftRefusalText([{ category: 'medical' }, { category: 'medical' }, { category: 'guarantee' }]);
    expect(text).toContain('врач');
    expect(text).toContain('тенденции');
    // одна и та же категория не повторяется дважды
    expect(text.split('врач').length - 1).toBe(1);
  });
});
