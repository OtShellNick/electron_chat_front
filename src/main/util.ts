/* eslint import/prefer-default-export: off */
import { URL } from 'url';
import path from 'path';
import storage from 'electron-json-storage';

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

interface Cookies {
  [key: string]: string;
  url: string;
}

export function parseCookies(cookieString: string): Cookies {
  const cookies: Cookies = {
    url: 'http://localhost:1212',
  };

  cookieString.split(';').forEach((cookie) => {
    const [name, value] = cookie.trim().split('=');
    if (name === 'jwt') {
      cookies.name = name;
      cookies.value = value;

      storage.set('token', { token: value }, (error) => {
        console.log('@@error', error);
      });
    }
  });

  return cookies;
}
