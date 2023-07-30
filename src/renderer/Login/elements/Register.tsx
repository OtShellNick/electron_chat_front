import { memo } from 'react';
import { useFormik, FormikHelpers } from 'formik';

import { Button } from 'components/Button';

import { validationSchemaRegister } from 'helpers/validation';

/**
 * Интерфейс для значений формы.
 */
interface FormValues {
  nick: string;
  email: string;
  password: string;
  confirmPassword: string;
}

/**
 * Компонент Формы регистрации.
 * @returns Компонент Формы регистрации.
 */
export const Register: React.FC = memo(() => {
  const formik = useFormik<FormValues>({
    initialValues: {
      nick: '',
      email: '',
      password: '',
      confirmPassword: ''
    },
    validationSchema: validationSchemaRegister,
    onSubmit: handleSubmit
  });

  /**
   * Обработчик отправки формы.
   * @param values - Значения формы.
   * @param formikHelpers - Вспомогательные функции Formik.
   */
  function handleSubmit(
    values: FormValues,
    formikHelpers: FormikHelpers<FormValues>
  ) {
    formikHelpers.setSubmitting(true);
    console.log(values);
    formikHelpers.setSubmitting(false);
  }

  return (
    <form className="form" onSubmit={formik.handleSubmit}>
      <div className="form__field">
        <label htmlFor="nick">Ник</label>
        <input
          id="nick"
          name="nick"
          type="text"
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
        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="anon@anon.ru"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.email && formik.errors.email && (
          <div className="form__error">{formik.errors.email}</div>
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
      <div className="form__field">
        <label htmlFor="confirmPassword">Подтверждение пароля</label>
        <input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          placeholder="********"
          value={formik.values.confirmPassword}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.confirmPassword && formik.errors.confirmPassword && (
          <div className="form__error">{formik.errors.confirmPassword}</div>
        )}
      </div>
      <Button type="submit">Отправить</Button>
    </form>
  );
});
