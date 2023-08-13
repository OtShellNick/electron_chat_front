import apiClient from 'helpers/server';
import {
  AuthDataLogin,
  AuthDataRegister,
  AuthResponseData,
} from 'types/action.types';

/**
 * Функция для выполнения запроса на вход пользователя.
 *
 * @param {AuthData} authData - Аутентификационные данные пользователя.
 * @returns {Promise} - Промис, который разрешается с данными ответа.
 * @throws {Error} - В случае ошибки при выполнении запроса.
 */
export const login = async (
  authData: AuthDataLogin
): Promise<AuthResponseData> => {
  const { nick, password } = authData;
  return apiClient.post('/login', { login: nick, password });
};

/**
 * Функция для выполнения запроса на регистрацию пользователя.
 *
 * @param {AuthData} authData - Аутентификационные данные пользователя.
 * @returns {Promise} - Промис, который разрешается с данными ответа.
 * @throws {Error} - В случае ошибки при выполнении запроса.
 */
export const register = async (
  authData: AuthDataRegister
): Promise<AuthResponseData> => {
  const { nick, email, password } = authData;
  return apiClient.post('/signup', { login: nick, email, password });
};
