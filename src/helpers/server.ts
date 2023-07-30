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
      baseURL,
    });
  }

  /**
   * Устанавливает авторизационный токен.
   *
   * @param {string} token - Токен авторизации.
   */
  setAuthToken(token: string): void {
    this.client.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }

  /**
   * Выполняет GET-запрос.
   *
   * @param {string} url - URL запроса.
   * @param {object} params - Параметры запроса.
   * @returns {Promise} - Промис, который разрешается с данными ответа.
   */
  async get<T>(url: string, params?: object): Promise<T> {
    try {
      const response: AxiosResponse<T> = await this.client.get(url, { params });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Выполняет POST-запрос.
   *
   * @param {string} url - URL запроса.
   * @param {object} data - Данные запроса.
   * @returns {Promise} - Промис, который разрешается с данными ответа.
   */
  async post<T>(url: string, data?: object): Promise<T> {
    try {
      const response: AxiosResponse<T> = await this.client.post(url, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Выполняет PUT-запрос.
   *
   * @param {string} url - URL запроса.
   * @param {object} data - Данные запроса.
   * @returns {Promise} - Промис, который разрешается с данными ответа.
   */
  async put<T>(url: string, data?: object): Promise<T> {
    try {
      const response: AxiosResponse<T> = await this.client.put(url, data);
      return response.data;
    } catch (error) {
      throw error;
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
      throw error;
    }
  }
}

// Пример использования
const apiClient = new ApiClient('https://api.example.com');
apiClient.setAuthToken('your_auth_token');

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

getUsers();
