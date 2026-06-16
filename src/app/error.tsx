"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ServerCrash, Home, ArrowLeft, RefreshCw, Database, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  const router = useRouter();
  
  // Check if this is a database connection error
  const isDbError = 
    error?.message?.includes("database") || 
    error?.message?.includes("connect") || 
    error?.message?.includes("prisma") ||
    error?.message?.includes("P1001") ||
    error?.message?.includes("P1003") ||
    error?.digest;

  return (
    <div className="container flex flex-col items-center justify-center min-h-[60vh] py-12">
      <div className="text-center space-y-6 max-w-lg">
        {/* Icon */}
        <div className="mx-auto w-20 h-20 rounded-full bg-muted flex items-center justify-center">
          {isDbError ? (
            <Database className="h-10 w-10 text-amber-500" />
          ) : (
            <ServerCrash className="h-10 w-10 text-muted-foreground" />
          )}
        </div>

        {/* Error Code */}
        <div className="space-y-2">
          <h1 className="text-7xl font-bold text-primary">500</h1>
          <h2 className="text-xl font-semibold">
            {isDbError ? "База данных не подключена" : "Ошибка сервера"}
          </h2>
          <p className="text-sm text-muted-foreground">
            {isDbError 
              ? "Для работы PromptForge необходима база данных PostgreSQL. Создайте бесплатную базу данных Neon через Vercel Dashboard."
              : "Произошла непредвиденная ошибка. Попробуйте обновить страницу."}
          </p>
        </div>

        {/* Setup instructions for DB error */}
        {isDbError && (
          <div className="text-left p-4 rounded-xl border bg-card space-y-3 text-sm">
            <h3 className="font-semibold text-center">Как подключить базу данных:</h3>
            <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
              <li>Откройте <a href="https://vercel.com/dashboard" target="_blank" rel="noopener noreferrer" className="text-amber-600 hover:underline inline-flex items-center gap-1">Vercel Dashboard <ExternalLink className="h-3 w-3" /></a></li>
              <li>Перейдите в проект <strong>prompts.chat</strong></li>
              <li>Нажмите вкладку <strong>Storage</strong></li>
              <li>Нажмите <strong>Create Database</strong> и выберите <strong>Neon Postgres</strong></li>
              <li>Выберите регион и нажмите <strong>Create</strong></li>
              <li>Vercel автоматически добавит DATABASE_URL в переменные окружения</li>
              <li>Вернитесь сюда и обновите страницу</li>
            </ol>
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
          <Button onClick={() => reset()}>
            <RefreshCw className="mr-2 h-4 w-4" />
            Обновить
          </Button>
          <Button variant="outline" asChild>
            <Link href="/guide">
              <Home className="mr-2 h-4 w-4" />
              Руководство
            </Link>
          </Button>
          <Button variant="ghost" onClick={() => router.back()}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Назад
          </Button>
        </div>
      </div>
    </div>
  );
}
