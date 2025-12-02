import { ActionTypes } from '@enums';

export const actionConfig = {
  [ActionTypes.REQUEST]: {
    labelKey: 'companyActions.requestsTitle',
    color: 'warning.main' as const,
  },
  [ActionTypes.INVITATION]: {
    labelKey: 'companyActions.invitationsTitle',
    color: 'success.main' as const,
  },
  DEFAULT: {
    labelKey: 'companyActions.title',
    color: 'info.main' as const,
  },
};
