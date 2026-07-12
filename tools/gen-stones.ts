/**
 * Оффлайн data-step (см. §4 конвенций реализации): генерирует committed датасет камней —
 * `tools/data/stones.json` (машиночитаемый, источник правды) и `drizzle/seed/0007_stones.sql`
 * (см. tools/db-seed.ts). НЕ часть build/test:unit/CI-гейта — отдельная команда `pnpm data:stones`.
 *
 * Источники и методология (req.4 промта Ф6, находка [content-source] в
 * _work/build/findings/f6.md — «таблицы соответствий не имеют назначенного источника»):
 *  - Список камней и мИНЕРАЛОГИЧЕСКИЕ факты (цвет, семейство минерала) — общеизвестные
 *    справочные данные (минералогия/геммология, School-level общедоступные факты о разновидностях
 *    кварца/корунда/берилла и т.д.), не эксклюзивный источник — при сомнении в конкретном факте
 *    карточка помечена ниже как «требует проверки» (см. `REQUIRES_VERIFICATION_SLUGS`).
 *  - Соответствия камень↔планета — классическая западная традиция + джйотиш/наваратна ориентиры
 *    (см. docs/research/06-нумерология-и-минералы.md §3, GemSelect naваратна). ОДНА из нескольких
 *    конкурирующих традиций — не единственно верная.
 *  - Соответствия камень↔знак зодиака — распространённые (не единственные — разные каталоги
 *    расходятся, см. doc 06 §3 «традиции различаются между источниками»).
 *  - Соответствия декада→планета-субуправитель — АЛГОРИТМИЧЕСКИ, по классическому «халдейскому»
 *    порядку планет (Сатурн→Юпитер→Марс→Солнце→Венера→Меркурий→Луна, непрерывный цикл по 36
 *    деканам зодиака, 1-й декан Овна = Марс — управитель самого Овна), см. `decanRulerPlanet()`.
 *    Отсюда decades камня = все деканы, чей субправитель входит в `planets` этого камня.
 *  - Соответствия камень↔аркан Таро — АЛГОРИТМИЧЕСКИ, по атрибуции Золотой Зари (Golden Dawn)
 *    аркан↔планета/знак (см. `ARCANUM_ASTRO_RULER`) — ОБЩЕПРИНЯТАЯ эзотерическая традиция, ЕЁ
 *    соответствие конкретно методу «матрица судьбы» Наталии Ладини НЕ проверено (школа Ладини
 *    свою таблицу камень↔аркан публично не раскрывает) — помечено в README камней как «требует
 *    проверки заказчиком» при коммерческом запуске кросс-блока.
 *  - Соответствия камень↔чакра — АЛГОРИТМИЧЕСКИ, по традиционному цвет→чакра (см. `COLOR_CHAKRA`).
 *  - «Назначения» (purposes) и «магические/лечебные свойства» — общеизвестный фольклор
 *    кристаллотерапии («по традиции считается») — КАЖДАЯ карточка получает явный дисклеймер
 *    (не медицинский факт, не научное утверждение), см. `DISCLAIMER_SENTENCE`.
 *
 * Идемпотентность сида — тот же паттерн, что tools/gen-corpus.ts: ON CONFLICT ("slug") DO UPDATE
 * ТОЛЬКО пока status='draft' (не затирает реведактированные карточки).
 */
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  STONE_CHAKRAS,
  type StoneChakraSlug,
  type StonePlanetSlug,
  type StonePurpose,
  STONE_PURPOSE_NAME_RU,
  type ZodiacSignEnSlug,
  ZODIAC_SIGN_EN_SLUGS,
} from '@stassist/shared';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_OUT_PATH = path.join(__dirname, 'data', 'stones.json');
const SEED_OUT_PATH = path.join(__dirname, '..', 'drizzle', 'seed', '0007_stones.sql');

// -------------------------------------------------------------------------------------------
// Базовые факты по камню — АВТОРСКИЙ минимум, остальное (декады/арканы/чакры/текст) считается.
// -------------------------------------------------------------------------------------------

interface StoneBaseFact {
  slug: string;
  name: string;
  colors: string[];
  familyMd: string;
  zodiacSigns?: ZodiacSignEnSlug[];
  planets?: StonePlanetSlug[];
  purposes: StonePurpose[];
  suitableMd?: string;
  unsuitableMd?: string;
}

const STONES: readonly StoneBaseFact[] = [
  { slug: 'ametist', name: 'Аметист', colors: ['фиолетовый'], familyMd: 'разновидность кварца фиолетового цвета, окраска связана с примесью железа.', zodiacSigns: ['pisces', 'aquarius', 'virgo'], planets: ['jupiter', 'neptune'], purposes: ['harmony', 'wisdom', 'health'], suitableMd: 'считается подходящим для успокоения и медитации.' },
  { slug: 'citrin', name: 'Цитрин', colors: ['жёлтый'], familyMd: 'жёлтая разновидность кварца, натуральный цитрин встречается реже, чем термообработанный аметист.', zodiacSigns: ['gemini', 'leo'], planets: ['sun', 'mercury'], purposes: ['money', 'career', 'luck'] },
  { slug: 'rozovyj-kvarc', name: 'Розовый кварц', colors: ['розовый'], familyMd: 'розовая разновидность кварца, окраска связана с примесями титана/марганца.', zodiacSigns: ['taurus', 'libra'], planets: ['venus'], purposes: ['love', 'harmony'] },
  { slug: 'dymchatyj-kvarc', name: 'Дымчатый кварц (раухтопаз)', colors: ['коричневый', 'серый'], familyMd: 'бурая/серая разновидность кварца, окраска — результат природного облучения.', zodiacSigns: ['capricorn', 'scorpio'], planets: ['saturn'], purposes: ['protection', 'career'] },
  { slug: 'gornyj-hrustal', name: 'Горный хрусталь', colors: ['бесцветный'], familyMd: 'бесцветная прозрачная разновидность кварца.', zodiacSigns: ['aries'], planets: ['sun', 'moon'], purposes: ['wisdom', 'harmony'] },
  { slug: 'tigrovyj-glaz', name: 'Тигровый глаз', colors: ['жёлтый', 'коричневый'], familyMd: 'кварц с шелковистым отливом (эффект «кошачьего глаза»), образуется при замещении крокидолита.', zodiacSigns: ['leo', 'capricorn'], planets: ['sun', 'mars'], purposes: ['career', 'protection', 'luck'] },
  { slug: 'avantyurin-zelenyj', name: 'Авантюрин зелёный', colors: ['зелёный'], familyMd: 'кварцит с вкраплениями слюды/фуксита, дающими характерный блеск.', zodiacSigns: ['aries'], planets: ['mercury'], purposes: ['luck', 'money'] },
  { slug: 'avantyurin-sinij', name: 'Авантюрин синий', colors: ['синий'], familyMd: 'редкая синяя разновидность авантюрина с вкраплениями дюмортьерита/крокидолита.', planets: ['saturn'], purposes: ['wisdom', 'protection'] },
  { slug: 'serdolik', name: 'Сердолик (карнеол)', colors: ['оранжевый', 'красный'], familyMd: 'оранжево-красная разновидность халцедона.', zodiacSigns: ['leo', 'virgo'], planets: ['sun'], purposes: ['career', 'luck', 'health'] },
  { slug: 'agat', name: 'Агат', colors: ['серый', 'полосчатый'], familyMd: 'слоистая полосчатая разновидность халцедона.', zodiacSigns: ['gemini', 'virgo'], planets: ['mercury'], purposes: ['harmony', 'protection'] },
  { slug: 'oniks', name: 'Оникс', colors: ['чёрный'], familyMd: 'однотонная чёрная (или чёрно-белая полосчатая) разновидность халцедона.', zodiacSigns: ['leo', 'capricorn'], planets: ['saturn'], purposes: ['protection', 'career'] },
  { slug: 'yashma-krasnaya', name: 'Яшма красная', colors: ['красный'], familyMd: 'непрозрачная плотная микрозернистая разновидность кварца (халцедон/кварцит) с высоким содержанием оксидов железа.', zodiacSigns: ['scorpio'], planets: ['mars'], purposes: ['protection', 'health'] },
  { slug: 'yashma-zelenaya', name: 'Яшма зелёная', colors: ['зелёный'], familyMd: 'непрозрачная микрозернистая кварцевая порода, зелёный оттенок дают силикаты железа.', zodiacSigns: ['virgo'], planets: ['venus'], purposes: ['health', 'harmony'] },
  { slug: 'hrizopraz', name: 'Хризопраз', colors: ['зелёный'], familyMd: 'яблочно-зелёная разновидность халцедона, окраска связана с примесью никеля.', zodiacSigns: ['taurus'], planets: ['venus'], purposes: ['love', 'luck'] },
  { slug: 'almaz', name: 'Алмаз', colors: ['бесцветный'], familyMd: 'кристаллическая форма углерода, самый твёрдый природный минерал (10 по шкале Мооса).', zodiacSigns: ['aries', 'leo'], planets: ['venus', 'sun'], purposes: ['protection', 'career'] },
  { slug: 'rubin', name: 'Рубин', colors: ['красный'], familyMd: 'красная разновидность корунда, окраска — от примеси хрома.', zodiacSigns: ['leo'], planets: ['sun'], purposes: ['career', 'luck', 'protection'] },
  { slug: 'sapfir-sinij', name: 'Сапфир синий', colors: ['синий'], familyMd: 'синяя разновидность корунда, окраска — от примесей железа и титана.', zodiacSigns: ['virgo', 'libra'], planets: ['saturn'], purposes: ['wisdom', 'career'] },
  { slug: 'sapfir-zheltyj', name: 'Сапфир жёлтый', colors: ['жёлтый'], familyMd: 'жёлтая разновидность корунда.', zodiacSigns: ['sagittarius'], planets: ['jupiter'], purposes: ['money', 'wisdom'] },
  { slug: 'izumrud', name: 'Изумруд', colors: ['зелёный'], familyMd: 'зелёная разновидность берилла, окраска — от примеси хрома/ванадия.', zodiacSigns: ['taurus', 'cancer'], planets: ['mercury', 'venus'], purposes: ['wisdom', 'love', 'harmony'] },
  { slug: 'aleksandrit', name: 'Александрит', colors: ['зелёный', 'красный'], familyMd: 'разновидность хризоберилла, меняющая цвет при разном освещении (эффект александрита).', zodiacSigns: ['gemini'], planets: ['mercury'], purposes: ['luck', 'harmony'] },
  { slug: 'topaz-goluboj', name: 'Топаз голубой', colors: ['голубой'], familyMd: 'голубая разновидность топаза (природная либо облагороженная облучением/нагревом).', zodiacSigns: ['sagittarius'], planets: ['jupiter'], purposes: ['wisdom', 'career'] },
  { slug: 'topaz-zolotistyj', name: 'Топаз золотистый (империал)', colors: ['золотистый', 'оранжевый'], familyMd: 'редкая золотисто-оранжевая разновидность топаза.', zodiacSigns: ['sagittarius'], planets: ['sun'], purposes: ['money', 'career'] },
  { slug: 'akvamarin', name: 'Аквамарин', colors: ['голубой'], familyMd: 'голубовато-зелёная разновидность берилла.', zodiacSigns: ['pisces', 'aries'], planets: ['neptune', 'moon'], purposes: ['wisdom', 'harmony', 'health'] },
  { slug: 'turmalin-rozovyj', name: 'Турмалин розовый (рубеллит)', colors: ['розовый'], familyMd: 'розово-малиновая разновидность турмалина.', zodiacSigns: ['libra'], planets: ['venus'], purposes: ['love'] },
  { slug: 'turmalin-zelenyj', name: 'Турмалин зелёный (верделит)', colors: ['зелёный'], familyMd: 'зелёная разновидность турмалина.', zodiacSigns: ['taurus'], planets: ['venus'], purposes: ['money', 'health'] },
  { slug: 'turmalin-chernyj', name: 'Турмалин чёрный (шерл)', colors: ['чёрный'], familyMd: 'самая распространённая разновидность турмалина, богатая железом.', zodiacSigns: ['capricorn'], planets: ['saturn'], purposes: ['protection'] },
  { slug: 'peridot', name: 'Перидот (хризолит)', colors: ['зелёный'], familyMd: 'ювелирная разновидность минерала оливина.', zodiacSigns: ['libra', 'virgo'], planets: ['venus'], purposes: ['money', 'harmony'] },
  { slug: 'granat-almandin', name: 'Гранат альмандин', colors: ['красный', 'бордовый'], familyMd: 'железисто-алюминиевая разновидность граната, самая распространённая ювелирная.', zodiacSigns: ['capricorn', 'aquarius'], planets: ['mars'], purposes: ['protection', 'career'] },
  { slug: 'granat-pirop', name: 'Гранат пироп', colors: ['красный'], familyMd: 'магниево-алюминиевая разновидность граната глубокого красного цвета.', zodiacSigns: ['scorpio'], planets: ['mars'], purposes: ['protection', 'luck'] },
  { slug: 'opal-belyj', name: 'Опал белый', colors: ['белый', 'радужный'], familyMd: 'аморфный гидратированный кремнезём с характерной радужной игрой цвета (опалесценцией).', zodiacSigns: ['libra', 'pisces'], planets: ['venus'], purposes: ['love', 'luck'] },
  { slug: 'opal-ognennyj', name: 'Опал огненный', colors: ['оранжевый', 'красный'], familyMd: 'прозрачная-полупрозрачная оранжево-красная разновидность опала.', zodiacSigns: ['leo'], planets: ['sun'], purposes: ['career', 'luck'] },
  { slug: 'lunnyj-kamen', name: 'Лунный камень (адуляр)', colors: ['белый', 'голубоватый'], familyMd: 'разновидность полевого шпата (ортоклаза) с характерным сине-белым переливом (адуляресценцией).', zodiacSigns: ['cancer', 'pisces'], planets: ['moon'], purposes: ['love', 'harmony'] },
  { slug: 'solnechnyj-kamen', name: 'Солнечный камень (гелиолит)', colors: ['оранжевый', 'золотистый'], familyMd: 'разновидность полевого шпата с металлическим блеском от включений гематита/гётита.', zodiacSigns: ['leo'], planets: ['sun'], purposes: ['career', 'luck'] },
  { slug: 'labradorit', name: 'Лабрадорит', colors: ['серый', 'синий'], familyMd: 'разновидность полевого шпата с характерной радужной иризацией (лабрадоресценцией).', zodiacSigns: ['scorpio'], planets: ['saturn', 'uranus'], purposes: ['protection', 'wisdom'] },
  { slug: 'malahit', name: 'Малахит', colors: ['зелёный'], familyMd: 'карбонат меди, узнаваемый по концентрическим зелёным полосам.', zodiacSigns: ['scorpio', 'capricorn'], planets: ['venus', 'pluto'], purposes: ['protection', 'money'] },
  { slug: 'biryuza', name: 'Бирюза', colors: ['голубой', 'бирюзовый'], familyMd: 'непрозрачный фосфат меди и алюминия, окраска — от меди.', zodiacSigns: ['sagittarius'], planets: ['jupiter'], purposes: ['protection', 'career', 'luck'] },
  { slug: 'lazurit', name: 'Лазурит (ляпис-лазурь)', colors: ['синий'], familyMd: 'глубоко-синяя порода на основе минерала лазурита, часто с вкраплениями пирита.', zodiacSigns: ['sagittarius'], planets: ['jupiter', 'saturn'], purposes: ['wisdom', 'protection'] },
  { slug: 'sodalit', name: 'Содалит', colors: ['синий'], familyMd: 'минерал группы содалита, синий с белыми прожилками кальцита.', zodiacSigns: ['sagittarius'], planets: ['jupiter'], purposes: ['wisdom', 'harmony'] },
  { slug: 'obsidian', name: 'Обсидиан', colors: ['чёрный'], familyMd: 'вулканическое стекло, образуется при быстром остывании лавы.', zodiacSigns: ['scorpio', 'sagittarius'], planets: ['pluto', 'saturn'], purposes: ['protection'] },
  { slug: 'gematit', name: 'Гематит', colors: ['серый', 'чёрный'], familyMd: 'оксид железа с характерным металлическим блеском.', zodiacSigns: ['aries', 'aquarius'], planets: ['mars', 'saturn'], purposes: ['protection', 'career'] },
  { slug: 'pirit', name: 'Пирит', colors: ['золотистый'], familyMd: 'дисульфид железа с металлическим золотистым блеском («золото дураков»).', zodiacSigns: ['leo'], planets: ['sun', 'mars'], purposes: ['money', 'protection'] },
  { slug: 'nefrit', name: 'Нефрит', colors: ['зелёный'], familyMd: 'плотный минерал-агрегат (актинолит-тремолитовый ряд), одна из двух пород, называемых «нефритом».', zodiacSigns: ['taurus', 'libra'], planets: ['venus'], purposes: ['health', 'harmony', 'luck'] },
  { slug: 'zhadeit', name: 'Жадеит', colors: ['зелёный'], familyMd: 'пироксеновый минерал, вторая порода, называемая «нефритом» в быту (ювелирный «императорский жад»).', zodiacSigns: ['taurus'], planets: ['venus'], purposes: ['luck', 'money'] },
  { slug: 'rodonit', name: 'Родонит', colors: ['розовый', 'малиновый'], familyMd: 'силикат марганца с характерными чёрными прожилками (оксиды марганца).', zodiacSigns: ['taurus'], planets: ['mars', 'venus'], purposes: ['love', 'protection'] },
  { slug: 'charoit', name: 'Чароит', colors: ['фиолетовый'], familyMd: 'силикатный минерал сиреневых оттенков, известное месторождение — река Чара (Россия).', zodiacSigns: ['scorpio'], planets: ['pluto'], purposes: ['wisdom', 'protection'] },
  { slug: 'shungit', name: 'Шунгит', colors: ['чёрный'], familyMd: 'углеродсодержащая порода (месторождение — Карелия, Россия).', zodiacSigns: ['scorpio'], planets: ['saturn'], purposes: ['protection', 'health'] },
  { slug: 'yantar', name: 'Янтарь', colors: ['жёлтый', 'оранжевый'], familyMd: 'окаменевшая ископаемая смола хвойных деревьев (не минерал в строгом смысле).', zodiacSigns: ['leo'], planets: ['sun'], purposes: ['health', 'luck', 'protection'] },
  { slug: 'zhemchug', name: 'Жемчуг', colors: ['белый', 'кремовый'], familyMd: 'органогенное образование (карбонат кальция) в раковинах моллюсков, не минерал.', zodiacSigns: ['cancer'], planets: ['moon'], purposes: ['love', 'harmony'] },
  { slug: 'korall-krasnyj', name: 'Коралл красный', colors: ['красный'], familyMd: 'известковый скелет колониальных морских полипов, не минерал.', zodiacSigns: ['scorpio'], planets: ['mars'], purposes: ['protection', 'health'] },
  { slug: 'koshachij-glaz', name: 'Кошачий глаз (хризоберилл)', colors: ['жёлто-зелёный'], familyMd: 'разновидность хризоберилла с эффектом «кошачьего глаза» (шелковистая полоса блика).', zodiacSigns: ['gemini'], planets: ['mercury'], purposes: ['protection', 'luck'] },
  { slug: 'cirkon', name: 'Циркон', colors: ['бесцветный', 'голубой'], familyMd: 'силикат циркония, один из старейших минералов земной коры.', zodiacSigns: ['sagittarius'], planets: ['jupiter'], purposes: ['wisdom', 'career'] },
  { slug: 'shpinel', name: 'Шпинель', colors: ['красный', 'розовый'], familyMd: 'оксид магния и алюминия, исторически часто путали с рубином.', zodiacSigns: ['leo'], planets: ['mars'], purposes: ['career', 'protection'] },
  { slug: 'tanzanit', name: 'Танзанит', colors: ['синий', 'фиолетовый'], familyMd: 'синевато-фиолетовая разновидность минерала цоизита, месторождение — только Танзания.', zodiacSigns: ['sagittarius'], planets: ['jupiter'], purposes: ['wisdom', 'harmony'] },
  { slug: 'iolit', name: 'Иолит (кордиерит)', colors: ['синий', 'фиолетовый'], familyMd: 'силикатный минерал с выраженным плеохроизмом (меняет цвет в зависимости от угла обзора).', zodiacSigns: ['sagittarius'], planets: ['jupiter'], purposes: ['wisdom'] },
  { slug: 'kianit', name: 'Кианит (дистен)', colors: ['синий'], familyMd: 'силикат алюминия с анизотропной твёрдостью (разной по разным направлениям кристалла).', zodiacSigns: ['libra', 'taurus'], planets: ['venus'], purposes: ['harmony', 'wisdom'] },
  { slug: 'ametrin', name: 'Аметрин', colors: ['фиолетовый', 'жёлтый'], familyMd: 'кварц, сочетающий в одном кристалле зоны аметиста и цитрина.', zodiacSigns: ['libra'], planets: ['venus', 'mercury'], purposes: ['harmony', 'money'] },
  { slug: 'praziolit', name: 'Празиолит', colors: ['зелёный'], familyMd: 'зелёная разновидность кварца, чаще всего получается термообработкой аметиста.', zodiacSigns: ['virgo'], planets: ['mercury'], purposes: ['health', 'harmony'] },
  { slug: 'geliotrop', name: 'Гелиотроп (кровавик)', colors: ['зелёный', 'красный'], familyMd: 'тёмно-зелёная разновидность халцедона с красными вкраплениями оксида железа.', zodiacSigns: ['aries', 'pisces'], planets: ['mars'], purposes: ['protection', 'health'] },
  { slug: 'flyuorit', name: 'Флюорит', colors: ['фиолетовый', 'зелёный'], familyMd: 'фторид кальция, один из самых разнообразных по окраске минералов.', zodiacSigns: ['pisces', 'capricorn'], planets: ['neptune'], purposes: ['wisdom', 'harmony'] },
  { slug: 'selenit', name: 'Селенит', colors: ['белый'], familyMd: 'прозрачная волокнистая разновидность гипса с шелковистым блеском.', zodiacSigns: ['cancer', 'taurus'], planets: ['moon'], purposes: ['harmony', 'protection'] },
  { slug: 'kalcit-oranzhevyj', name: 'Кальцит оранжевый', colors: ['оранжевый'], familyMd: 'карбонат кальция, один из самых распространённых минералов земной коры.', zodiacSigns: ['leo'], planets: ['sun'], purposes: ['career', 'luck'] },
  { slug: 'apatit-sinij', name: 'Апатит синий', colors: ['синий'], familyMd: 'фосфатный минерал, синяя ювелирная разновидность.', zodiacSigns: ['gemini'], planets: ['mercury'], purposes: ['wisdom', 'career'] },
  { slug: 'morganit', name: 'Морганит', colors: ['розовый'], familyMd: 'розовая разновидность берилла, окраска — от примеси марганца.', zodiacSigns: ['taurus'], planets: ['venus'], purposes: ['love'] },
  { slug: 'kuncit', name: 'Кунцит', colors: ['розовый', 'сиреневый'], familyMd: 'розово-сиреневая разновидность минерала сподумена.', zodiacSigns: ['taurus', 'libra'], planets: ['venus'], purposes: ['love', 'harmony'] },
  { slug: 'govlit', name: 'Говлит белый', colors: ['белый'], familyMd: 'борат кальция с характерным сетчатым узором прожилок, часто окрашивается для имитации бирюзы.', zodiacSigns: ['virgo'], planets: ['mercury'], purposes: ['harmony', 'health'] },
  { slug: 'magnezit', name: 'Магнезит', colors: ['белый'], familyMd: 'карбонат магния.', zodiacSigns: ['virgo'], planets: ['mercury'], purposes: ['harmony'] },
  { slug: 'sugilit', name: 'Сугилит', colors: ['фиолетовый'], familyMd: 'редкий силикатный минерал насыщенно-фиолетового цвета.', zodiacSigns: ['pisces'], planets: ['neptune', 'uranus'], purposes: ['wisdom', 'protection'] },
  { slug: 'unakit', name: 'Унакит', colors: ['зелёный', 'розовый'], familyMd: 'метаморфическая порода, смесь эпидота (зелёный) и полевого шпата (розовый).', zodiacSigns: ['scorpio'], planets: ['mars', 'venus'], purposes: ['health', 'harmony'] },
  { slug: 'lepidolit', name: 'Лепидолит', colors: ['сиреневый'], familyMd: 'литиевая слюда сиреневого цвета.', zodiacSigns: ['libra'], planets: ['venus'], purposes: ['harmony'] },
  { slug: 'zmeevik', name: 'Змеевик (серпентин)', colors: ['зелёный'], familyMd: 'группа силикатных минералов с рисунком, напоминающим змеиную кожу.', zodiacSigns: ['gemini', 'virgo'], planets: ['mercury'], purposes: ['protection', 'health'] },
  { slug: 'agat-mohovyj', name: 'Агат моховый', colors: ['зелёный'], familyMd: 'разновидность халцедона с включениями хлорита/роговой обманки, напоминающими мох.', zodiacSigns: ['virgo'], planets: ['mercury', 'venus'], purposes: ['harmony', 'health'] },
  { slug: 'agat-ognennyj', name: 'Агат огненный', colors: ['красный', 'оранжевый'], familyMd: 'разновидность халцедона с иризацией в тёплых тонах.', zodiacSigns: ['aries'], planets: ['mars'], purposes: ['protection', 'career'] },
  { slug: 'geliodor', name: 'Гелиодор', colors: ['жёлтый'], familyMd: 'золотисто-жёлтая разновидность берилла.', zodiacSigns: ['leo'], planets: ['sun'], purposes: ['career', 'luck'] },
  { slug: 'hrizokolla', name: 'Хризоколла', colors: ['бирюзовый', 'синий'], familyMd: 'силикат меди, часто сопутствует малахиту и бирюзе в медных месторождениях.', zodiacSigns: ['taurus'], planets: ['venus'], purposes: ['harmony', 'health'] },
  { slug: 'azurit', name: 'Азурит', colors: ['синий'], familyMd: 'карбонат меди насыщенно-синего цвета, часто сопутствует малахиту.', zodiacSigns: ['sagittarius'], planets: ['jupiter'], purposes: ['wisdom', 'protection'] },
];

/** Минералогические факты, помеченные «требует проверки заказчиком» — намеренно, т.к. тезис
 *  спорный/упрощён (2 претендента на «нефрит», плеохроизм, разночтения по месторождениям) —
 *  см. заголовок файла и корневой CLAUDE.md «неуверенные результаты явно помечаем». */
const REQUIRES_VERIFICATION_SLUGS = new Set(['nefrit', 'zhadeit', 'aleksandrit', 'tanzanit', 'iolit']);

// -------------------------------------------------------------------------------------------
// Алгоритмические соответствия (см. заголовок файла) — НЕ авторский ввод, а расчёт.
// -------------------------------------------------------------------------------------------

const CHALDEAN_ORDER: readonly StonePlanetSlug[] = ['saturn', 'jupiter', 'mars', 'sun', 'venus', 'mercury', 'moon'];

/** Декан-субправитель по классическому «халдейскому» непрерывному циклу (см. заголовок файла). */
function decanRulerPlanet(signIndex: number, decadeIndex: 1 | 2 | 3): StonePlanetSlug {
  const continuousIndex = signIndex * 3 + (decadeIndex - 1);
  const ariesFirstDecanOffset = CHALDEAN_ORDER.indexOf('mars');
  return CHALDEAN_ORDER[(continuousIndex + ariesFirstDecanOffset) % CHALDEAN_ORDER.length]!;
}

interface DecadeEntry {
  sign: ZodiacSignEnSlug;
  decadeIndex: 1 | 2 | 3;
}

function decadesRuledByAnyOf(planets: readonly StonePlanetSlug[]): DecadeEntry[] {
  return ZODIAC_SIGN_EN_SLUGS.flatMap((sign, signIndex) =>
    ([1, 2, 3] as const)
      .filter((decadeIndex) => planets.includes(decanRulerPlanet(signIndex, decadeIndex)))
      .map((decadeIndex) => ({ sign, decadeIndex })),
  );
}

/**
 * Атрибуция аркан↔планета/знак традиции Золотой Зари (Golden Dawn), адаптированная под нумерацию
 * 1-22 этого портала (`reduceToArcanum`: 0→22, т.е. 22 = Шут). См. заголовок файла — арканы 12
 * (Повешенный→стихия Воды), 20 (Суд→стихия Огня), 22 (Шут→стихия Воздуха) сознательно БЕЗ
 * планеты/знака (не назначаем камень «на всякий случай»).
 */
const ARCANUM_ASTRO_RULER: Readonly<Record<number, { planet?: StonePlanetSlug; sign?: ZodiacSignEnSlug }>> = {
  1: { planet: 'mercury' },
  2: { planet: 'moon' },
  3: { planet: 'venus' },
  4: { sign: 'aries' },
  5: { sign: 'taurus' },
  6: { sign: 'gemini' },
  7: { sign: 'cancer' },
  8: { sign: 'leo' },
  9: { sign: 'virgo' },
  10: { planet: 'jupiter' },
  11: { sign: 'libra' },
  13: { sign: 'scorpio' },
  14: { sign: 'sagittarius' },
  15: { sign: 'capricorn' },
  16: { planet: 'mars' },
  17: { sign: 'aquarius' },
  18: { sign: 'pisces' },
  19: { planet: 'sun' },
  21: { planet: 'saturn' },
};

function arcanaForStone(fact: StoneBaseFact): number[] {
  const out: number[] = [];
  for (const [arcanumStr, ruler] of Object.entries(ARCANUM_ASTRO_RULER)) {
    const arcanum = Number(arcanumStr);
    const byPlanet = ruler.planet && fact.planets?.includes(ruler.planet);
    const bySign = ruler.sign && fact.zodiacSigns?.includes(ruler.sign);
    if (byPlanet || bySign) out.push(arcanum);
  }
  return out.sort((a, b) => a - b);
}

/** Цвет → чакра (традиционное соответствие цветовых спектров чакрам, см. заголовок файла). */
const COLOR_CHAKRA: Readonly<Record<string, StoneChakraSlug>> = {
  красный: 'health_root',
  бордовый: 'health_root',
  оранжевый: 'health_sacral',
  'золотистый': 'health_solar_plexus',
  жёлтый: 'health_solar_plexus',
  'жёлто-зелёный': 'health_solar_plexus',
  зелёный: 'health_heart',
  розовый: 'health_heart',
  малиновый: 'health_heart',
  голубой: 'health_throat',
  бирюзовый: 'health_throat',
  голубоватый: 'health_throat',
  синий: 'health_third_eye',
  сиреневый: 'health_third_eye',
  фиолетовый: 'health_crown',
  белый: 'health_crown',
  кремовый: 'health_crown',
  бесцветный: 'health_crown',
  радужный: 'health_crown',
  серый: 'health_root',
  чёрный: 'health_root',
  коричневый: 'health_root',
};

function chakrasForStone(colors: readonly string[]): StoneChakraSlug[] {
  const set = new Set<StoneChakraSlug>();
  for (const color of colors) {
    const chakra = COLOR_CHAKRA[color];
    if (chakra) set.add(chakra);
  }
  // Гарантия непустоты: если ни один цвет не сматчился — самая частая чакра-фолбэк (сердечная).
  if (set.size === 0) set.add('health_heart');
  return STONE_CHAKRAS.filter((c) => set.has(c));
}

const DISCLAIMER_SENTENCE =
  'По традиции считается, что камень обладает описанными свойствами — это справочная информация о традиционных ' +
  'представлениях, а не медицинский или научный факт; решения о здоровье принимайте со специалистом.';

function purposesSentence(purposes: readonly StonePurpose[]): string {
  const names = purposes.map((p) => STONE_PURPOSE_NAME_RU[p]);
  return `В традиции камень чаще всего используют как талисман ${names.join(', ')}.`;
}

interface StoneRecord {
  slug: string;
  name: string;
  propertiesMd: string;
  colors: string[];
  zodiacSigns: ZodiacSignEnSlug[];
  planets: StonePlanetSlug[];
  decades: DecadeEntry[];
  arcana: number[];
  chakras: StoneChakraSlug[];
  purposes: StonePurpose[];
  suitableMd: string | null;
  unsuitableMd: string | null;
  status: 'draft';
}

function buildStoneRecord(fact: StoneBaseFact): StoneRecord {
  const zodiacSigns = fact.zodiacSigns ?? [];
  const planets = fact.planets ?? [];
  const verificationNote = REQUIRES_VERIFICATION_SLUGS.has(fact.slug)
    ? ' Отдельные детали этого факта требуют проверки заказчиком/редакцией перед публичным запуском.'
    : '';
  const propertiesMd = [
    `${fact.name} — ${fact.familyMd}${verificationNote}`,
    purposesSentence(fact.purposes),
    DISCLAIMER_SENTENCE,
  ].join(' ');

  return {
    slug: fact.slug,
    name: fact.name,
    propertiesMd,
    colors: fact.colors,
    zodiacSigns,
    planets,
    decades: decadesRuledByAnyOf(planets),
    arcana: arcanaForStone(fact),
    chakras: chakrasForStone(fact.colors),
    purposes: fact.purposes,
    suitableMd: fact.suitableMd ?? null,
    unsuitableMd: fact.unsuitableMd ?? null,
    status: 'draft',
  };
}

function sqlString(value: string): string {
  return `'${value.replace(/'/g, "''")}'`;
}
function sqlTextArray(values: readonly string[]): string {
  return `ARRAY[${values.map(sqlString).join(',')}]::text[]`;
}
function sqlIntArray(values: readonly number[]): string {
  return `ARRAY[${values.join(',')}]::integer[]`;
}

function buildSeedSql(records: readonly StoneRecord[]): string {
  const lines: string[] = [
    `-- stones — датасет камней Ф6 (${records.length} карточек).`,
    '-- СГЕНЕРИРОВАНО: tools/gen-stones.ts. НЕ редактировать руками — перегенерировать `pnpm data:stones`.',
    "-- Идемпотентно: ON CONFLICT (\"slug\") DO UPDATE ТОЛЬКО пока status='draft' (не затирает",
    '-- ручную редактуру, см. §6 конвенций реализации).',
    '',
  ];
  for (const r of records) {
    lines.push(
      `INSERT INTO "stones" ("slug", "name", "properties_md", "colors", "zodiac_signs", "planets", "decades", "arcana", "chakras", "purposes", "suitable_md", "unsuitable_md", "status")`,
      `VALUES (${sqlString(r.slug)}, ${sqlString(r.name)}, ${sqlString(r.propertiesMd)}, ${sqlTextArray(r.colors)}, ${sqlTextArray(r.zodiacSigns)}, ${sqlTextArray(r.planets)}, ${sqlString(JSON.stringify(r.decades))}::jsonb, ${sqlIntArray(r.arcana)}, ${sqlTextArray(r.chakras)}, ${sqlTextArray(r.purposes)}, ${r.suitableMd ? sqlString(r.suitableMd) : 'NULL'}, ${r.unsuitableMd ? sqlString(r.unsuitableMd) : 'NULL'}, 'draft')`,
      `ON CONFLICT ("slug") DO UPDATE SET`,
      `  "name" = EXCLUDED."name",`,
      `  "properties_md" = EXCLUDED."properties_md",`,
      `  "colors" = EXCLUDED."colors",`,
      `  "zodiac_signs" = EXCLUDED."zodiac_signs",`,
      `  "planets" = EXCLUDED."planets",`,
      `  "decades" = EXCLUDED."decades",`,
      `  "arcana" = EXCLUDED."arcana",`,
      `  "chakras" = EXCLUDED."chakras",`,
      `  "purposes" = EXCLUDED."purposes",`,
      `  "updated_at" = now()`,
      `WHERE "stones"."status" = 'draft';`,
      '',
    );
  }
  return lines.join('\n');
}

async function main(): Promise<void> {
  const records = STONES.map(buildStoneRecord);

  const uniqueSlugs = new Set(records.map((r) => r.slug));
  if (uniqueSlugs.size !== records.length) throw new Error('gen-stones: обнаружены дублирующиеся slug');

  await mkdir(path.dirname(DATA_OUT_PATH), { recursive: true });
  await writeFile(DATA_OUT_PATH, JSON.stringify(records, null, 2) + '\n', 'utf8');

  await mkdir(path.dirname(SEED_OUT_PATH), { recursive: true });
  await writeFile(SEED_OUT_PATH, buildSeedSql(records), 'utf8');

  const signsCovered = new Set(records.flatMap((r) => r.zodiacSigns));
  console.log(`Записано ${records.length} камней → ${DATA_OUT_PATH} и ${SEED_OUT_PATH}`);
  console.log(`Знаков зодиака покрыто: ${signsCovered.size}/12`);
  if (signsCovered.size < 12) {
    const missing = ZODIAC_SIGN_EN_SLUGS.filter((s) => !signsCovered.has(s));
    console.warn(`ВНИМАНИЕ: знаки без камней: ${missing.join(', ')}`);
  }
}

main().catch((err: unknown) => {
  console.error(err);
  process.exit(1);
});
