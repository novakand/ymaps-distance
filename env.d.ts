/// <reference types="vite/client" />

declare interface ImportMeta {
  /**
   * Предзагружает все модули по заданному шаблону.
   * Возвращает объект, ключи которого — пути к модулям, а значения — сами модули.
   */
  globEager<T = any>(pattern: string): Record<string, T>;
}