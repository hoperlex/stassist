import { Button, Card, Col, Row, Typography } from 'antd';

const { Title, Paragraph, Text } = Typography;

interface ServiceCard {
  titleRu: string;
  textRu: string;
  href: string;
  ctaRu: string;
}

const SERVICES: ServiceCard[] = [
  {
    titleRu: 'Натальная карта',
    textRu: 'Точный расчёт по дате, времени и месту рождения: планеты, дома, аспекты — и подробный разбор ИИ-астропомощника простым языком.',
    href: '/natalnaya-karta',
    ctaRu: 'Рассчитать бесплатно',
  },
  {
    titleRu: 'Матрица судьбы',
    textRu: 'Психоматрица и матрица судьбы (метод «квадрат Пифагора»): расшифровка чакр, предназначения, денежной и любовной линий.',
    href: '/matrica-sudby',
    ctaRu: 'Построить матрицу',
  },
  {
    titleRu: 'Совместимость',
    textRu: 'Сравнение двух карт (синастрия) — как знаки и планеты партнёров сочетаются друг с другом, сильные и напряжённые точки пары.',
    href: '/sovmestimost',
    ctaRu: 'Проверить совместимость',
  },
  {
    titleRu: 'Гороскопы',
    textRu: 'Ежедневные, недельные и годовые гороскопы по всем 12 знакам зодиака — общий, любовь, финансы, карьера, здоровье.',
    href: '/goroskop',
    ctaRu: 'Читать гороскоп',
  },
  {
    titleRu: 'Лунный календарь',
    textRu: 'Фазы Луны, лунные дни, void-of-course — с рекомендациями по стрижкам, посадкам и маникюру на каждый день.',
    href: '/lunnyj-kalendar',
    ctaRu: 'Открыть календарь',
  },
  {
    titleRu: 'Число жизненного пути',
    textRu: 'Нумерологический расчёт по дате рождения и полному имени: жизненный путь, число выражения, души и личности.',
    href: '/chislo-puti',
    ctaRu: 'Узнать число',
  },
];

/** Вариант «Текущий» — исходный минимал-лендинг на antd (сохранён без изменений). */
export function ExistingHome(): React.JSX.Element {
  return (
    <main style={{ maxWidth: 1040, margin: '0 auto', padding: '0 24px 64px' }}>
      <section style={{ textAlign: 'center', padding: '72px 0 48px' }}>
        <Title>Зодиакум — астрология и нумерология с точным расчётом</Title>
        <Paragraph style={{ fontSize: 18, maxWidth: 680, margin: '0 auto 32px' }}>
          Натальная карта, матрица судьбы, гороскопы и разборы с ИИ-астропомощником — на основе
          детерминированного расчётного ядра, а не готовых шаблонов. Каждый вывод опирается на
          реально вычисленные позиции планет, аспекты и числа — и это видно в блоке «как считали»
          любого отчёта.
        </Paragraph>
        <Button type="primary" size="large" href="/natalnaya-karta">
          Рассчитать натальную карту бесплатно
        </Button>
      </section>

      <section>
        <Title level={2} style={{ textAlign: 'center', marginBottom: 32 }}>
          Что можно сделать на портале
        </Title>
        <Row gutter={[24, 24]}>
          {SERVICES.map((service) => (
            <Col xs={24} sm={12} md={8} key={service.href}>
              <Card style={{ height: '100%' }}>
                <Title level={4}>{service.titleRu}</Title>
                <Paragraph>{service.textRu}</Paragraph>
                <a href={service.href}>{service.ctaRu} →</a>
              </Card>
            </Col>
          ))}
        </Row>
      </section>

      <section style={{ marginTop: 56, textAlign: 'center' }}>
        <Card style={{ background: '#fafafa' }}>
          <Title level={3}>Премиум-подписка</Title>
          <Paragraph style={{ maxWidth: 640, margin: '0 auto 16px' }}>
            Полная персональная лента прогнозов, безлимитный чат с ИИ-астропомощником, полные
            разборы карты и скидка на PDF-отчёты — с бесплатным пробным периодом 7 дней и отменой
            в один клик.
          </Paragraph>
          <Button href="/tarify">Смотреть тарифы</Button>
        </Card>
      </section>

      <section style={{ marginTop: 48, textAlign: 'center' }}>
        <Text type="secondary">
          <a href="/o-nas">О проекте</a> · <a href="/redakciya">Редакция</a> ·{' '}
          <a href="/methodology">Методология расчётов</a> · <a href="/faq">Вопросы и ответы</a> ·{' '}
          <a href="/wiki">База знаний</a> · <a href="/pravila-soobshchestva">Правила сообщества</a>
        </Text>
      </section>

      <section style={{ marginTop: 16, textAlign: 'center' }}>
        <Text type="secondary">
          Материалы сервиса носят информационно-развлекательный характер и не заменяют
          профессиональную медицинскую, психологическую, юридическую или финансовую консультацию —
          подробнее в <a href="/disclaimer">дисклеймере</a>.
        </Text>
      </section>
    </main>
  );
}
