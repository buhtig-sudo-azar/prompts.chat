import { PrismaClient, PromptType } from "@prisma/client";
import bcrypt from "bcryptjs";

const DATABASE_URL = process.env.DATABASE_URL!;
if (!DATABASE_URL) {
  console.error("DATABASE_URL is not set");
  process.exit(1);
}

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Quick seeding database...");

  // Create admin user
  const password = await bcrypt.hash("admin123", 12);
  // Try to find existing admin first
  let admin = await prisma.user.findFirst({ where: { role: "ADMIN" } });
  if (!admin) {
    admin = await prisma.user.create({
      data: {
        email: "admin@promptforge.ru",
        username: "admin",
        name: "Администратор PromptForge",
        password: password,
        role: "ADMIN",
        locale: "ru",
      },
    });
  } else {
    console.log("✅ Admin user already exists, using existing");
  }
  console.log("✅ Admin user created");

  // Create categories
  const categories = [
    { name: "Программирование", slug: "programming", icon: "💻", order: 1 },
    { name: "Маркетинг", slug: "marketing", icon: "📈", order: 2 },
    { name: "Копирайтинг", slug: "copywriting", icon: "✍️", order: 3 },
    { name: "Образование", slug: "education", icon: "📚", order: 4 },
    { name: "Бизнес", slug: "business", icon: "💼", order: 5 },
    { name: "Креатив", slug: "creative", icon: "🎨", order: 6 },
    { name: "Анализ данных", slug: "data-analysis", icon: "📊", order: 7 },
    { name: "Перевод", slug: "translation", icon: "🌐", order: 8 },
  ];

  const categoryIds: Record<string, string> = {};
  for (const cat of categories) {
    const created = await prisma.category.upsert({
      where: { slug: cat.slug },
      update: { name: cat.name, icon: cat.icon },
      create: cat,
    });
    categoryIds[cat.slug] = created.id;
  }
  console.log(`✅ Created ${categories.length} categories`);

  // Create tags
  const tags = [
    { name: "ChatGPT", slug: "chatgpt", color: "#10a37f" },
    { name: "Claude", slug: "claude", color: "#6366f1" },
    { name: "GPT-4", slug: "gpt-4", color: "#8b5cf6" },
    { name: "Для начинающих", slug: "beginners", color: "#f59e0b" },
    { name: "Продвинутый", slug: "advanced", color: "#ef4444" },
    { name: "Русский язык", slug: "russian", color: "#3b82f6" },
  ];

  const tagIds: Record<string, string> = {};
  for (const tag of tags) {
    const created = await prisma.tag.upsert({
      where: { slug: tag.slug },
      update: { name: tag.name, color: tag.color },
      create: tag,
    });
    tagIds[tag.slug] = created.id;
  }
  console.log(`✅ Created ${tags.length} tags`);

  // Create prompts
  const prompts = [
    {
      title: "Генератор кода на Python",
      slug: "python-code-generator",
      description: "Промпт для генерации чистого, документированного кода на Python с обработкой ошибок",
      content: "Ты — опытный Python-разработчик. Напиши код для следующей задачи:\n\nЗадача: [ОПИШИТЕ ЗАДАЧУ]\n\nТребования:\n- Чистый, читаемый код с типизацией (type hints)\n- Обработка всех возможных ошибок\n- Docstrings для каждой функции\n- Комментарии для сложной логики\n- Следуй PEP 8\n- Добавь примеры использования",
      type: "TEXT" as PromptType,
      categoryId: categoryIds["programming"],
      tags: ["chatgpt", "gpt-4", "advanced"],
    },
    {
      title: "SEO-оптимизация статьи",
      slug: "seo-article-optimizer",
      description: "Промпт для SEO-оптимизации текстов статей с ключевыми словами и мета-описаниями",
      content: "Ты — эксперт по SEO-копирайтингу. Оптимизируй следующую статью для поисковых систем:\n\nСтатья: [ВСТАВЬТЕ ТЕКСТ]\nКлючевые слова: [ВСТАВЬТЕ КЛЮЧЕВЫЕ СЛОВА]\n\nВыполни:\n1. Оптимизируй заголовок (H1) — включи главное ключевое слово\n2. Напиши мета-описание (150-160 символов)\n3. Добавь подзаголовки H2/H3 с ключевыми словами\n4. Оптимизируй плотность ключевых слов (1-2%)\n5. Добавь внутренние ссылки-якори\n6. Предложи alt-тексты для изображений\n7. Выдели LSI-слова",
      type: "TEXT" as PromptType,
      categoryId: categoryIds["marketing"],
      tags: ["chatgpt", "beginners"],
    },
    {
      title: "Улучшатель промптов",
      slug: "prompt-improver",
      description: "Мета-промпт, который делает любой ваш промпт лучше — добавляет конкретику, структуру и примеры",
      content: "Ты — эксперт по prompt engineering. Улучши следующий промпт, сделав его более эффективным:\n\nОригинальный промпт: [ВСТАВЬТЕ СЮДА]\n\nУлучши промпт по следующим критериям:\n1. Конкретность — добавь чёткие инструкции вместо размытых формулировок\n2. Контекст — укажи роль, аудиторию и цель\n3. Структура — организуй промпт с разделителями и секциями\n4. Примеры — добавь примеры ожидаемого вывода (few-shot)\n5. Ограничения — укажи формат, длину, стиль ответа\n6. Проверка — добавь шаги самопроверки для AI\n\nВыведи улучшенный промпт целиком, затем объясни изменения.",
      type: "TEXT" as PromptType,
      categoryId: categoryIds["creative"],
      tags: ["chatgpt", "claude", "gpt-4", "advanced"],
    },
    {
      title: "Персональный репетитор английского",
      slug: "english-tutor",
      description: "Промпт для создания адаптивного преподавателя английского языка с диалоговой практикой",
      content: "Ты — дружелюбный и терпеливый преподаватель английского языка. Твой ученик — [УКАЖИ УРОВЕНЬ: beginner/intermediate/advanced].\n\nПравила:\n- Объясняй ошибки мягко, с примерами\n- Давай упражнения на слабые места\n- Используй метод интервального повторения\n- Чередуй теорию и практику\n- Хвали за прогресс\n- Если ученик ошибается, сначала похвали попытку, потом исправь\n\nФормат каждого занятия:\n1. Разминка (2-3 вопроса на тему)\n2. Основной урок (грамматика/лексика)\n3. Практика (диалог/упражнение)\n4. Домашнее задание\n\nНачни с приветствия и вопроса о текущем уровне.",
      type: "TEXT" as PromptType,
      categoryId: categoryIds["education"],
      tags: ["chatgpt", "beginners", "russian"],
    },
    {
      title: "Бизнес-план стартапа",
      slug: "startup-business-plan",
      description: "Создание детального бизнес-плана для стартапа с анализом рынка и финансовыми прогнозами",
      content: "Ты — опытный бизнес-консультант и венчурный инвестор. Создай детальный бизнес-план для стартапа:\n\nИдея стартапа: [ОПИШИТЕ ИДЕЮ]\nБюджет: [УКАЖИТЕ БЮДЖЕТ]\nРынок: [УКАЖИТЕ РЕГИОН/СТРАНУ]\n\nСтруктура бизнес-плана:\n\n1. Executive Summary (краткое резюме)\n2. Описание компании и видение\n3. Анализ рынка (TAM/SAM/SOM)\n4. Конкурентный анализ (таблица сравнения)\n5. Целевая аудитория (персонажи)\n6. Бизнес-модель и монетизация\n7. Стратегия маркетинга и продаж\n8. Операционный план\n9. Финансовый прогноз (3 года: P&L, Cash Flow)\n10. Риски и их митигация\n11. Дорожная карта (milestones)\n12. Команда и потребности в найме\n\nФормат: профессиональный, с таблицами и цифрами.",
      type: "TEXT" as PromptType,
      categoryId: categoryIds["business"],
      tags: ["chatgpt", "gpt-4", "advanced"],
    },
    {
      title: "Анализатор данных",
      slug: "data-analyzer",
      description: "Промпт для анализа данных, создания SQL-запросов и визуализации результатов",
      content: "Ты — senior data analyst. Проведи анализ данных по следующему запросу:\n\nОписание данных: [ОПИШИТЕ ДАТАСЕТ]\nВопрос: [ЧТО НУЖНО УЗНАТЬ]\n\nПлан анализа:\n1. Понимание данных — типы полей, размерность, качество\n2. Очистка данных — пропуски, дубликаты, выбросы\n3. SQL-запрос(ы) для извлечения нужных данных\n4. Статистический анализ — средние, медианы, корреляции\n5. Визуализация — какие графики построить и почему\n6. Выводы и рекомендации\n7. Следующие шаги для углублённого анализа\n\nФормат: структурированный отчёт с SQL-кодом и Python-визуализацией.",
      type: "TEXT" as PromptType,
      categoryId: categoryIds["data-analysis"],
      tags: ["chatgpt", "gpt-4", "advanced"],
    },
    {
      title: "Переводчик с адаптацией",
      slug: "adaptive-translator",
      description: "Промпт для качественного перевода с сохранением тона, стиля и культурных особенностей",
      content: "Ты — профессиональный переводчик-локализатор. Переведи текст с учётом контекста и культурных особенностей:\n\nИсходный текст: [ВСТАВЬТЕ ТЕКСТ]\nЯзык перевода: [УКАЖИТЕ ЯЗЫК]\nКонтекст: [бизнес/наука/художественный/разговорный]\nТональность: [формальная/дружелюбная/нейтральная]\n\nПравила перевода:\n1. Сохраняй оригинальный смысл и эмоциональную окраску\n2. Адаптируй идиомы и метафоры для целевой культуры\n3. Не переводи буквально — используй естественные формулировки\n4. Сохраняй форматирование оригинала\n5. Технические термины оставляй без перевода, если это принято\n\nВывод:\n- Переведённый текст\n- Примечания к переводу (если есть неоднозначности)\n- Альтернативные варианты для спорных мест",
      type: "TEXT" as PromptType,
      categoryId: categoryIds["translation"],
      tags: ["chatgpt", "claude", "beginners", "russian"],
    },
    {
      title: "Генератор контент-плана",
      slug: "content-plan-generator",
      description: "Промпт для создания полного контент-плана для соцсетей на месяц",
      content: "Ты — опытный SMM-стратег и контент-маркетолог. Создай контент-план на 30 дней:\n\nНиша: [УКАЖИТЕ НИШУ]\nПлощадка: [Instagram/Telegram/VK/TikTok]\nЦель: [подписчики/продажи/узнаваемость]\nАудитория: [ОПИШИТЕ ЦА]\n\nДля каждого дня укажи:\n- Дата и день недели\n- Тип контента (карусель/рилс/сторис/текст/LIVE)\n- Тема и заголовок\n- Ключевая идея поста (1-2 предложения)\n- Призыв к действию (CTA)\n- Хештеги (5-10)\n\nТакже:\n1. Распредели типы контента: 40% польза, 30% вовлечение, 20% продажа, 10% личное\n2. Учитывай трендовые темы и праздники\n3. Предложи рубрики для регулярных постов\n4. Включи идеи для коллабораций",
      type: "TEXT" as PromptType,
      categoryId: categoryIds["marketing"],
      tags: ["chatgpt", "beginners", "russian"],
    },
    {
      title: "Code Review помощник",
      slug: "code-review-assistant",
      description: "Промпт для детального код-ревью с фокусом на безопасность, производительность и читаемость",
      content: "Ты — senior-разработчик с 15-летним опытом. Проведи детальный code review:\n\nКод для ревью:\n```\n[ВСТАВЬТЕ КОД]\n```\nЯзык: [УКАЖИТЕ ЯЗЫК]\nКонтекст: [Что делает этот код]\n\nПроверь по категориям:\n\nБезопасность:\n- Уязвимости (SQL-инъекции, XSS, CSRF)\n- Утечки данных и секретов\n- Валидация входных данных\n\nПроизводительность:\n- N+1 запросы\n- Неэффективные алгоритмы (O(n2) vs O(n))\n- Утечки памяти\n\nЧитаемость:\n- Именование переменных и функций\n- Длина функций (правило 20 строк)\n- Дублирование кода\n\nТестируемость:\n- Можно ли написать юнит-тесты?\n- Зависимости и моки\n\nДля каждой проблемы укажи: серьёзность (критично/предупреждение/совет), описание, исправленный код.",
      type: "TEXT" as PromptType,
      categoryId: categoryIds["programming"],
      tags: ["chatgpt", "claude", "gpt-4", "advanced"],
    },
    {
      title: "Сценарист Reels/TikTok",
      slug: "reels-scriptwriter",
      description: "Промпт для создания вирусных сценариев для коротких видео с хуками и CTA",
      content: "Ты — профессиональный сценарист коротких видео с миллионными просмотрами. Напиши сценарий для Reels/TikTok:\n\nТема: [УКАЖИТЕ ТЕМУ]\nНиша: [УКАЖИТЕ НИШУ]\nДлительность: [15/30/60 секунд]\nЦель: [охваты/подписки/продажи]\n\nСтруктура сценария:\n\nХУК (0-3 сек) — зацепить внимание:\n- Провокационный вопрос\n- Неожиданный факт\n- Обещание пользы\n\nОСНОВНАЯ ЧАСТЬ (3-75% времени):\n- 1 ключевая идея\n- Простым языком\n- С визуальными подсказками\n\nCTA (последние 3 сек):\n- Конкретный призыв\n- Причина действовать сейчас\n\nТакже укажи:\n- Текст на экране (по кадрам)\n- Рекомендации по визуалу\n- Вариант подписи к видео\n- Звуковые эффекты/музыка\n- 3 варианта хука для A/B тестирования",
      type: "TEXT" as PromptType,
      categoryId: categoryIds["creative"],
      tags: ["chatgpt", "beginners", "russian"],
    },
  ];

  let created = 0;
  for (const p of prompts) {
    const existing = await prisma.prompt.findFirst({ where: { slug: p.slug } });
    if (existing) {
      console.log(`⏭️  Skipping "${p.title}" - already exists`);
      continue;
    }

    const prompt = await prisma.prompt.create({
      data: {
        title: p.title,
        slug: p.slug,
        description: p.description,
        content: p.content,
        type: p.type,
        authorId: admin.id,
        categoryId: p.categoryId,
        tags: {
          create: p.tags
            .filter((t) => tagIds[t])
            .map((t) => ({ tagId: tagIds[t] })),
        },
      },
    });

    // Create initial version
    await prisma.promptVersion.create({
      data: {
        promptId: prompt.id,
        version: 1,
        content: p.content,
        changeNote: "Начальная версия",
        createdBy: admin.id,
      },
    });

    created++;
    console.log(`✅ Created: ${p.title}`);
  }

  console.log(`\n🎉 Seeding complete! Created ${created} prompts`);
  console.log("\n📋 Admin credentials:");
  console.log("   Email: admin@promptforge.ru");
  console.log("   Password: admin123");
}

main()
  .catch((e) => {
    console.error("❌ Seeding failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
