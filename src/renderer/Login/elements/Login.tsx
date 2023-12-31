import React, { memo } from 'react';
import { useFormik, FormikHelpers } from 'formik';
import { useDispatch } from 'react-redux';

import { Button } from 'components/Button';

import { validationSchemaLogin } from 'helpers/validation';
import { setUserData } from 'helpers/storage';
import { setUser } from 'store/user.store';

import { login } from 'actions/auth.actions';

/**
 * Интерфейс для значений формы.
 */
interface FormValues {
  nick: string;
  password: string;
}

/**
 * Компонент Формы входа.
 * @returns Компонент Формы входа.
 */
export const Login: React.FC = memo(() => {
  const dispatch = useDispatch();

  /**
   * Обработчик отправки формы.
   * @param values - Значения формы.
   * @param formikHelpers - Вспомогательные функции Formik.
   */
  async function handleSubmit(
    values: FormValues,
    formikHelpers: FormikHelpers<FormValues>
  ) {
    formikHelpers.setSubmitting(true);
    try {
      const data = await login(values);
      setUserData('userData', data);
      dispatch(setUser({ user: data }));
    } catch (err) {
      console.log('login error', err);
    }
    formikHelpers.setSubmitting(false);
  }

  const formik = useFormik<FormValues>({
    initialValues: {
      nick: '',
      password: '',
    },
    validationSchema: validationSchemaLogin,
    onSubmit: handleSubmit,
  });

  return (
    <form className="form" onSubmit={formik.handleSubmit}>
      <div className="form__field">
        <label htmlFor="nick">Ник</label>
        <input
          id="nick"
          name="nick"
          type="nick"
          placeholder="Ник"
          value={formik.values.nick}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.nick && formik.errors.nick && (
          <div className="form__error">{formik.errors.nick}</div>
        )}
      </div>
      <div className="form__field">
        <label htmlFor="password">Пароль</label>
        <input
          id="password"
          name="password"
          type="password"
          placeholder="********"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.password && formik.errors.password && (
          <div className="form__error">{formik.errors.password}</div>
        )}
      </div>
      <Button size="md" type="submit">
        Войти
      </Button>
    </form>
  );
});
