import { ActionStatuses, ActionTypes } from '@enums';

import { CompanySchema } from './company';
import { UserSchema } from './user';

export interface CompanyActionSchema {
  id: string;
  user?: UserSchema | null;
  company?: CompanySchema | null;
  action_type: ActionTypes;
  invited_email?: string | null;
  status: ActionStatuses;
  created_at?: string;
  updated_at?: string;
}

export interface CompanyActionCreate {
  user_id: string;
  company_id: string;
  action_type: ActionTypes;
  invited_email?: string | null;
  status?: ActionStatuses;
}

export interface CompanyActionUpdate {
  status?: ActionStatuses;
}

export interface CompanyActionsList {
  actions: CompanyActionSchema[];
  total: number;
  pending_total: number;
  accepted_total: number;
  cancelled_total: number;
}
