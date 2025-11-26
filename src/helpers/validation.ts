export interface ValidationData {
  name?: string;
  nickname?: string;
  email?: string;
  password?: string;
}

export const validation = (
  data: ValidationData,
  t: (key: string) => string
) => {
  const errors: Record<string, string> = {};

  if ('name' in data && !data.name) errors.name = t('errors.nameRequired');

  if ('nickname' in data && !data.nickname)
    errors.nickname = t('errors.nicknameRequired');

  if ('email' in data) {
    if (!data.email) errors.email = t('errors.emailRequired');
    else if (!/\S+@\S+\.\S+/.test(data.email))
      errors.email = t('errors.emailInvalid');
  }

  if ('password' in data) {
    if (!data.password) errors.password = t('errors.passwordRequired');
    else if (data.password.length < 6)
      errors.password = t('errors.passwordInvalid');
  }

  return errors;
};

export const hasErrors = (errors: Record<string, string>): boolean => {
  for (const error in errors) {
    if (errors[error]) return true;
  }
  return false;
};
