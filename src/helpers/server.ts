import axios, { AxiosInstance, AxiosResponse, AxiosError } from 'axios';

/**
 * Универсальный класс для работы с запросами.
 */
class ApiClient {
  private client: AxiosInstance;

  /**
   * Создает экземпляр ApiClient.
   *
   * @param {string} baseURL - Базовый URL для всех запросов.
   */
  constructor(baseURL: string) {
    this.client = axios.create({
      baseURL
    });
  }

  /**
   * Устанавливает авторизационный токен.
   *
   * @param {string} token - Токен авторизации.
   */
  setAuthToken(token: string): void {
    this.client.defaults.headers.common.Authorization = `Bearer ${token}`;
  }

  /**
   * Обработчик ошибок.
   *
   * @param {AxiosError<unknown>} error - Объект ошибки.
   * @throws {Error} - В случае ошибки при выполнении запроса.
   */
  private handleError(error: AxiosError | Error): void {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        // Обработка ошибки с ответом от сервера
        console.error(
          'Response Error:',
          error.response.status,
          error.response.data
        );
      } else if (error.request) {
        // Обработка ошибки без ответа от сервера
        console.error('Request Error:', error.request);
      } else {
        // Обработка других ошибок
        console.error('Error:', error.message);
      }
    } else {
      console.error('Unknown Error:', error);
    }
  }

  /**
   * Выполняет GET-запрос.
   *
   * @param {string} url - URL запроса.
   * @param {object} params - Параметры запроса.
   * @returns {Promise<T>} - Промис, который разрешается с данными ответа.
   */
  async get<T>(url: string, params?: object): Promise<T> {
    try {
      const response: AxiosResponse<T> = await this.client.get(url, { params });
      return response.data;
    } catch (error) {
      const err = error as AxiosError | Error;
      this.handleError(err);
      throw err;
    }
  }

  /**
   * Выполняет POST-запрос.
   *
   * @param {string} url - URL запроса.
   * @param {object} data - Данные запроса.
   * @returns {Promise} - Промис, который разрешается с данными ответа.
   */
  async post<T, D>(url: string, data?: D): Promise<T> {
    try {
      const response: AxiosResponse<T> = await this.client.post(url, data);
      return response.data;
    } catch (error) {
      const err = error as AxiosError | Error;
      this.handleError(err);
      throw err;
    }
  }

  /**
   * Выполняет PUT-запрос.
   *
   * @param {string} url - URL запроса.
   * @param {object} data - Данные запроса.
   * @returns {Promise} - Промис, который разрешается с данными ответа.
   */
  async put<T, D>(url: string, data?: D): Promise<T> {
    try {
      const response: AxiosResponse<T> = await this.client.put(url, data);
      return response.data;
    } catch (error) {
      const err = error as AxiosError | Error;
      this.handleError(err);
      throw err;
    }
  }

  /**
   * Выполняет DELETE-запрос.
   *
   * @param {string} url - URL запроса.
   * @returns {Promise} - Промис, который разрешается с данными ответа.
   */
  async delete<T>(url: string): Promise<T> {
    try {
      const response: AxiosResponse<T> = await this.client.delete(url);
      return response.data;
    } catch (error) {
      const err = error as AxiosError | Error;
      this.handleError(err);
      throw err;
    }
  }
}

// Пример использования
const apiClient = new ApiClient('http://185.20.225.15:3000');
// apiClient.setAuthToken('your_auth_token');

export default apiClient;

interface User {
  id: number;
  name: string;
  email: string;
}

async function getUsers() {
  try {
    const users: User[] = await apiClient.get<User[]>('/users', { page: 1 });
    console.log(users);
  } catch (error) {
    console.error(error);
  }
}
