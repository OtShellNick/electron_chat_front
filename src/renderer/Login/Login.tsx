import { memo, useState } from 'react';
import cn from 'classnames';

import { Login as LoginBlock, Register } from 'renderer/Login/elements';

import './Login.scss';

/**
 * Компонент Логина.
 * @returns Компонент Логина.
 */
export const Login: React.FC = memo(() => {
  const [isLogin, setIsLogin] = useState<boolean>(true);

  /**
   * Обработчик клика по пункту меню "Login".
   */
  const handleLoginClick = () => {
    setIsLogin(true);
  };

  /**
   * Обработчик клика по пункту меню "Register".
   */
  const handleRegisterClick = () => {
    setIsLogin(false);
  };

  return (
    <main className="login">
      <div className="login__container">
        <ul className="login__header">
          <li
            className={cn('login__header-item', {
              'login__header-item-active': isLogin
            })}
            onClick={handleLoginClick}
          >
            Вход
          </li>
          <li
            className={cn('login__header-item', {
              'login__header-item-active': !isLogin
            })}
            onClick={handleRegisterClick}
          >
            Регистрация
          </li>
        </ul>
        <div className="login__content">
          {isLogin && <LoginBlock />}
          {!isLogin && <Register />}
        </div>
      </div>
    </main>
  );
});
