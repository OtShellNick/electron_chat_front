import * as Yup from 'yup';

/**
 * Интерфейс для значений формы.
 */
interface FormValues {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

/**
 * Схема валидации для формы регистрации.
 */
export const validationSchemaRegister: Yup.Schema<FormValues> = Yup.object().shape({
  name: Yup.string().required('Обязательное поле'),
  email: Yup.string().email('Некорректный email').required('Обязательное поле'),
  password: Yup.string().required('Обязательное поле'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Пароли должны совпадать')
    .required('Обязательное поле')
});
