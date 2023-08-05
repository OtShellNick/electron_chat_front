import apiClient from "helpers/server";
import { AuthDataLogin, AuthDataRegister } from "types/action.types";

/**
 * Функция для выполнения запроса на вход пользователя.
 *
 * @param {AuthData} authData - Аутентификационные данные пользователя.
 * @returns {Promise} - Промис, который разрешается с данными ответа.
 * @throws {Error} - В случае ошибки при выполнении запроса.
 */
export const login = async (authData: AuthDataLogin): Promise<any> => {
  try {
    const { nick, password } = authData;
    return await apiClient.post("/login", { login: nick, password });
  } catch (error) {
    throw error;
  }
}

/**
 * Функция для выполнения запроса на регистрацию пользователя.
 *
 * @param {AuthData} authData - Аутентификационные данные пользователя.
 * @returns {Promise} - Промис, который разрешается с данными ответа.
 * @throws {Error} - В случае ошибки при выполнении запроса.
 */
export const register = async (authData: AuthDataRegister): Promise<any> => {
  try {
    const { nick, email, password } = authData;
    return await apiClient.post("/signup", { login: nick, email, password });
  } catch (error) {
    throw error;
  }
}
