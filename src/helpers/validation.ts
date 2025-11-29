export interface ValidationData {
  name?: string;
  nickname?: string;
  email?: string;
  password?: string;
}

export function validation(data: ValidationData, t: (key: string) => string) {
  const errors: Record<string, string> = {};

  if ('name' in data && !data.name)
    errors.name = t('common.errors.nameRequired');

  if ('nickname' in data && !data.nickname)
    errors.nickname = t('common.errors.nicknameRequired');

  if ('email' in data) {
    if (!data.email) errors.email = t('common.errors.emailRequired');
    else if (!/\S+@\S+\.\S+/.test(data.email))
      errors.email = t('common.errors.emailInvalid');
  }

  if ('password' in data) {
    if (!data.password) errors.password = t('common.errors.passwordRequired');
    else if (data.password.length < 6)
      errors.password = t('common.errors.passwordInvalid');
  }

  return errors;
}

export function hasErrors(errors: Record<string, string>): boolean {
  for (const error in errors) {
    if (errors[error]) return true;
  }
  return false;
}
