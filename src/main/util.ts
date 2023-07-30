/* eslint import/prefer-default-export: off */
import { URL } from 'url';
import path from 'path';

/**
 * Разрешает путь до HTML-файла в зависимости от окружения.
 * @param htmlFileName - Название HTML-файла.
 * @returns Разрешенный путь до HTML-файла.
 */
export function resolveHtmlPath(htmlFileName: string) {
  if (process.env.NODE_ENV === 'development') {
    const port = process.env.PORT || 1212;
    const url = new URL(`http://localhost:${port}`);
    url.pathname = htmlFileName;
    return url.href;
  }
  return `file://${path.resolve(__dirname, '../renderer/', htmlFileName)}`;
}
