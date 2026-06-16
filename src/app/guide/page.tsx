import { getTranslations } from "next-intl/server";
import { HelpCircle, Search, Copy, PenTool, Bookmark, Star, MessageSquare, ChevronRight, Lightbulb, Zap, ArrowRight } from "lucide-react";
import Link from "next/link";

export default async function GuidePage() {
  const t = await getTranslations();

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <div className="relative overflow-hidden border-b">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 via-transparent to-orange-500/5" />
        <div className="container relative py-12 md:py-16">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 text-sm font-medium mb-4">
              <HelpCircle className="h-4 w-4" />
              Руководство пользователя
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Как пользоваться PromptForge
            </h1>
            <p className="text-lg text-muted-foreground">
              Простое пошаговое руководство для начинающих. Научитесь находить, создавать и использовать AI-промпты за считанные минуты.
            </p>
          </div>
        </div>
      </div>

      <div className="container py-8 md:py-12">
        <div className="max-w-4xl mx-auto space-y-12">

          {/* What is PromptForge */}
          <section>
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Lightbulb className="h-6 w-6 text-amber-500" />
              Что такое PromptForge?
            </h2>
            <div className="prose prose-neutral dark:prose-invert max-w-none">
              <p>
                PromptForge — это библиотека AI-промптов, где вы можете находить готовые промпты для ChatGPT, Claude, Gemini и других AI-моделей, а также создавать и делиться своими собственными. Промпт — это текстовая инструкция, которую вы даёте AI, чтобы получить нужный результат. Чем лучше промпт — тем точнее и полезнее ответ AI.
              </p>
              <p>
                Представьте это как кузницу: вы берёте «заготовку» (готовый промпт из библиотеки), при необходимости «ковыряете» его под свою задачу (меняете переменные), и получаете идеальный инструмент для работы с AI.
              </p>
            </div>
          </section>

          {/* Step-by-step guide */}
          <section>
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Zap className="h-6 w-6 text-amber-500" />
              Быстрый старт за 5 шагов
            </h2>

            <div className="space-y-6">
              {/* Step 1 */}
              <div className="flex gap-4 p-5 rounded-xl border bg-card hover:shadow-md transition-shadow">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center text-amber-700 dark:text-amber-300 font-bold text-lg">
                  1
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                    <Search className="h-5 w-5 text-muted-foreground" />
                    Найдите нужный промпт
                  </h3>
                  <p className="text-muted-foreground mb-3">
                    Используйте строку поиска на главной странице, чтобы найти промпт по ключевым словам. Например, введите &quot;письмо&quot;, &quot;код&quot; или &quot;маркетинг&quot;. Также можно просматривать промпты по <Link href="/categories" className="text-amber-600 hover:underline">категориям</Link> или <Link href="/tags" className="text-amber-600 hover:underline">тегам</Link>.
                  </p>
                  <div className="p-3 bg-muted/50 rounded-lg text-sm">
                    <strong>Совет:</strong> Категории помогают найти промпты по теме (например, &quot;Маркетинг&quot;, &quot;Программирование&quot;), а теги — по формату (например, &quot;JSON&quot;, &quot;пошаговый&quot;).
                  </div>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex gap-4 p-5 rounded-xl border bg-card hover:shadow-md transition-shadow">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center text-amber-700 dark:text-amber-300 font-bold text-lg">
                  2
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                    <Copy className="h-5 w-5 text-muted-foreground" />
                    Скопируйте промпт
                  </h3>
                  <p className="text-muted-foreground mb-3">
                    Нажмите кнопку &quot;Копировать&quot; на карточке промпта. Текст промпта будет скопирован в буфер обмена, и вы сможете вставить его прямо в чат с AI (ChatGPT, Claude и т.д.). Некоторые промпты содержат переменные — специальные поля, которые нужно заполнить перед использованием.
                  </p>
                  <div className="p-3 bg-muted/50 rounded-lg text-sm">
                    <strong>Переменные:</strong> Если в промпте есть поля вида <code className="px-1 py-0.5 bg-muted rounded text-xs">{"{{имя}}"}</code> — это переменные. Замените их на свои данные. Например, <code className="px-1 py-0.5 bg-muted rounded text-xs">{"{{тема}}"}</code> → &quot;маркетинг в соцсетях&quot;.
                  </div>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex gap-4 p-5 rounded-xl border bg-card hover:shadow-md transition-shadow">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center text-amber-700 dark:text-amber-300 font-bold text-lg">
                  3
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                    <PenTool className="h-5 w-5 text-muted-foreground" />
                    Создайте свой промпт
                  </h3>
                  <p className="text-muted-foreground mb-3">
                    Зарегистрируйтесь и нажмите &quot;Создать промпт&quot; (кнопка с плюсом в навигации). Напишите заголовок, описание и текст промпта. Вы можете добавить переменные, выбрать категорию и теги. Промпт можно сделать приватным (виден только вам) или публичным (доступен всем).
                  </p>
                  <div className="p-3 bg-muted/50 rounded-lg text-sm">
                    <strong>Формула хорошего промпта:</strong> Роль + Контекст + Задача + Формат ответа. Например: &quot;Ты — опытный маркетолог. Напиши план продвижения для [продукт] в соцсетях на 1 месяц. Оформи в виде таблицы.&quot;
                  </div>
                </div>
              </div>

              {/* Step 4 */}
              <div className="flex gap-4 p-5 rounded-xl border bg-card hover:shadow-md transition-shadow">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center text-amber-700 dark:text-amber-300 font-bold text-lg">
                  4
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                    <Bookmark className="h-5 w-5 text-muted-foreground" />
                    Сохраните в коллекцию
                  </h3>
                  <p className="text-muted-foreground">
                    Нажмите значок закладки на карточке промпта, чтобы добавить его в свою личную коллекцию. Все сохранённые промпты доступны в разделе &quot;Моя коллекция&quot; в навигации. Это удобно, чтобы быстро находить любимые промпты без повторного поиска.
                  </p>
                </div>
              </div>

              {/* Step 5 */}
              <div className="flex gap-4 p-5 rounded-xl border bg-card hover:shadow-md transition-shadow">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center text-amber-700 dark:text-amber-300 font-bold text-lg">
                  5
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                    <Star className="h-5 w-5 text-muted-foreground" />
                    Оцените и поделитесь
                  </h3>
                  <p className="text-muted-foreground">
                    Голосуйте за полезные промпты (значок стрелки вверх), чтобы помочь другим пользователям найти лучшие инструкции. Оставляйте комментарии с примерами использования. Делитесь промптами с коллегами через кнопку &quot;Поделиться&quot;.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* FAQ */}
          <section>
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <MessageSquare className="h-6 w-6 text-amber-500" />
              Частые вопросы
            </h2>

            <div className="space-y-4">
              <details className="group p-4 rounded-xl border bg-card">
                <summary className="cursor-pointer font-medium flex items-center gap-2">
                  <ChevronRight className="h-4 w-4 transition-transform group-open:rotate-90" />
                  Нужно ли регистрироваться?
                </summary>
                <p className="mt-3 text-muted-foreground pl-6">
                  Просмотр и копирование промптов доступно без регистрации. Но для создания промптов, сохранения в коллекцию, голосования и комментирования нужно создать бесплатный аккаунт.
                </p>
              </details>

              <details className="group p-4 rounded-xl border bg-card">
                <summary className="cursor-pointer font-medium flex items-center gap-2">
                  <ChevronRight className="h-4 w-4 transition-transform group-open:rotate-90" />
                  Какие AI-модели поддерживаются?
                </summary>
                <p className="mt-3 text-muted-foreground pl-6">
                  Промпты из PromptForge работают с любыми AI-моделями: ChatGPT, Claude, Gemini, Llama, Mistral и другими. Просто скопируйте промпт и вставьте в чат с нужным AI. Некоторые промпты могут быть оптимизированы под конкретную модель — это указано в описании.
                </p>
              </details>

              <details className="group p-4 rounded-xl border bg-card">
                <summary className="cursor-pointer font-medium flex items-center gap-2">
                  <ChevronRight className="h-4 w-4 transition-transform group-open:rotate-90" />
                  Что такое переменные в промптах?
                </summary>
                <p className="mt-3 text-muted-foreground pl-6">
                  Переменные — это поля в промпте, которые вы заменяете на свои данные. Они выглядят как <code className="px-1 py-0.5 bg-muted rounded text-xs">{"{{название}}"}</code>. Например, в промпте &quot;Напиши рецепт {"{{блюдо}}"} из {"{{ингредиенты}}"}&quot; вы заменяете переменные на &quot;пасту&quot; и &quot;помидоры, чеснок, базилик&quot;. Это позволяет использовать один и тот же промпт для разных задач.
                </p>
              </details>

              <details className="group p-4 rounded-xl border bg-card">
                <summary className="cursor-pointer font-medium flex items-center gap-2">
                  <ChevronRight className="h-4 w-4 transition-transform group-open:rotate-90" />
                  Можно ли использовать промпты в коммерческих целях?
                </summary>
                <p className="mt-3 text-muted-foreground pl-6">
                  Да! Все промпты в PromptForge доступны по лицензии CC0 (общественное достояние). Это значит, что вы можете использовать их свободно для любых целей — личных или коммерческих, без указания авторства.
                </p>
              </details>

              <details className="group p-4 rounded-xl border bg-card">
                <summary className="cursor-pointer font-medium flex items-center gap-2">
                  <ChevronRight className="h-4 w-4 transition-transform group-open:rotate-90" />
                  Что такое &quot;Запрос на изменение&quot;?
                </summary>
                <p className="mt-3 text-muted-foreground pl-6">
                  Это система улучшения промптов сообществом. Если вы видите промпт, который можно улучшить, вы можете предложить изменение (похоже на Pull Request в GitHub). Автор промпта примет или отклонит ваше предложение. Это помогает делать промпты всё лучше и точнее.
                </p>
              </details>

              <details className="group p-4 rounded-xl border bg-card">
                <summary className="cursor-pointer font-medium flex items-center gap-2">
                  <ChevronRight className="h-4 w-4 transition-transform group-open:rotate-90" />
                  Как переключить язык интерфейса?
                </summary>
                <p className="mt-3 text-muted-foreground pl-6">
                  Нажмите на значок глобуса в правом верхнем углу навигации и выберите нужный язык. PromptForge поддерживает 17 языков, включая русский, английский, испанский, китайский, японский и другие.
                </p>
              </details>
            </div>
          </section>

          {/* Tips for writing prompts */}
          <section>
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <PenTool className="h-6 w-6 text-amber-500" />
              Советы по написанию промптов
            </h2>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="p-4 rounded-xl border bg-card">
                <h3 className="font-semibold text-green-600 dark:text-green-400 mb-2">Хороший промпт</h3>
                <p className="text-sm text-muted-foreground mb-2 italic">
                  &quot;Ты — опытный копирайтер. Напиши продающий заголовок для онлайн-курса по фотографии. Целевая аудитория — начинающие фотографы 25-35 лет. Заголовок должен быть коротким, цепляющим и содержать выгоду. Дай 5 вариантов.&quot;
                </p>
                <p className="text-xs text-green-600 dark:text-green-400">Есть роль, контекст, задача и формат</p>
              </div>
              <div className="p-4 rounded-xl border bg-card">
                <h3 className="font-semibold text-red-600 dark:text-red-400 mb-2">Плохой промпт</h3>
                <p className="text-sm text-muted-foreground mb-2 italic">
                  &quot;Напиши заголовок&quot;
                </p>
                <p className="text-xs text-red-600 dark:text-red-400">Слишком общо — AI не поймёт, что именно нужно</p>
              </div>
            </div>

            <div className="mt-6 p-4 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800">
              <h3 className="font-semibold text-amber-700 dark:text-amber-300 mb-2">Формула идеального промпта:</h3>
              <div className="flex flex-wrap gap-2 text-sm">
                <span className="px-3 py-1 bg-amber-100 dark:bg-amber-800/40 rounded-full font-medium">Роль</span>
                <span className="text-muted-foreground">+</span>
                <span className="px-3 py-1 bg-amber-100 dark:bg-amber-800/40 rounded-full font-medium">Контекст</span>
                <span className="text-muted-foreground">+</span>
                <span className="px-3 py-1 bg-amber-100 dark:bg-amber-800/40 rounded-full font-medium">Задача</span>
                <span className="text-muted-foreground">+</span>
                <span className="px-3 py-1 bg-amber-100 dark:bg-amber-800/40 rounded-full font-medium">Формат</span>
                <span className="text-muted-foreground">=</span>
                <span className="px-3 py-1 bg-green-100 dark:bg-green-800/40 text-green-700 dark:text-green-300 rounded-full font-medium">Отличный результат</span>
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="text-center py-8">
            <h2 className="text-2xl font-bold mb-4">Готовы начать?</h2>
            <p className="text-muted-foreground mb-6">
              Изучите библиотеку промптов или создайте свой первый промпт прямо сейчас.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/categories"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-amber-500 text-white font-medium hover:bg-amber-600 transition-colors"
              >
                Смотреть категории
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/prompts/new"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border font-medium hover:bg-accent transition-colors"
              >
                <PenTool className="h-4 w-4" />
                Создать промпт
              </Link>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}
