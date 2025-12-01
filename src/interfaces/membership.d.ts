import { Roles } from '@enums/roles';

import { CompanySchema } from './company';
import { UserSchema } from './user';

export interface MembershipSchema {
  id: string;
  user?: UserSchema | null;
  company?: CompanySchema | null;
  role: Roles;
  is_active: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface MembershipCreate {
  user_id: string;
  company_id: string;
  role?: Roles;
  is_active?: boolean;
}

export interface MembershipUpdate {
  role: Roles;
  is_active?: boolean;
}

export interface MembershipsList {
  total?: number;
  active_total?: number;
}

export interface UserMembership {
  id: string;
  company?: CompanySchema | null;
  role: Roles;
  is_active: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface UserMembershipsList extends MembershipsList {
  memberships?: UserMembership[];
}

export interface CompanyMembership {
  id: string;
  user?: UserSchema | null;
  role: Roles;
  is_active: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface CompanyMembershipsList extends MembershipsList {
  memberships?: CompanyMembership[];
}
