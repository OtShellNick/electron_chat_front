import * as Yup from 'yup';

/**
 * Интерфейс для значений формы.
 */
interface FormValuesRegister {
  nick: string;
  email: string;
  password: string;
  confirmPassword: string;
}
interface FormValuesLogin {
  nick: string;
  password: string;
}

/**
 * Схема валидации для формы регистрации.
 */
 export const validationSchemaRegister: Yup.Schema<FormValuesRegister> = Yup.object().shape({
  nick: Yup.string()
    .matches(/^[a-z0-9]([._]?[a-z0-9]){2,15}$/, 'Некорректный ник')
    .required('Обязательное поле'),
  email: Yup.string().email('Некорректный email').required('Обязательное поле'),
  password: Yup.string()
    .min(7, 'Минимум 7 символов')
    .max(64, 'Максимум 64 символа')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&]).*$/, 'Некорректный пароль')
    .required('Обязательное поле'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Пароли должны совпадать')
    .required('Обязательное поле')
});

export const validationSchemaLogin: Yup.Schema<FormValuesLogin> = Yup.object().shape({
  nick: Yup.string().required('Обязательное поле'),
  password: Yup.string().required('Обязательное поле'),
});
