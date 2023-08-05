/**
 * Интерфейс для объекта аутентификационных данных.
 */
 export interface AuthDataRegister {
  nick: string;
  email: string;
  password: string;
}

export interface AuthDataLogin {
  nick: string;
  password: string;
}
