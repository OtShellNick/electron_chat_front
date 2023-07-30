import { memo } from 'react';
import { useFormik, FormikHelpers } from 'formik';

import { validationSchemaLogin } from 'helpers/validation';

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
  const formik = useFormik<FormValues>({
    initialValues: {
      nick: '',
      password: ''
    },
    validationSchema: validationSchemaLogin,
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
      <button type="submit">Войти</button>
    </form>
  );
});
