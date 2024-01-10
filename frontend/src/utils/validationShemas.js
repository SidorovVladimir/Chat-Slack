import * as Yup from 'yup';

export const getModalShema = (items, translate) => Yup.object().shape({
  name: Yup.string()
    .trim()
    .required(translate('validate.required'))
    .min(3, translate('validate.min_max'))
    .max(20, translate('validate.min_max'))
    .notOneOf(items, translate('validate.unique')),
});

export const getSignupSchema = (translate) => Yup.object().shape({
  username: Yup.string()
    .required(translate('validate.required'))
    .trim()
    .min(3, translate('validate.min_max'))
    .max(20, translate('validate.min_max')),
  password: Yup.string()
    .min(6, translate('validate.passwordMin'))
    .trim()
    .required(translate('validate.required')),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], translate('validate.mustMatch'))
    .required(translate('validate.required')),
});

export const chatInputSchema = Yup.object().shape({
  body: Yup.string().trim().required(),
});
