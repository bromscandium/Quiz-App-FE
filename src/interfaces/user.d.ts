export interface UserSchema {
  id: string;
  name: string;
  surname?: string;
  nickname: string;
  email: string;
  hashed_password: string;
  avatar_url?: string;
  bio?: string;
  birthday?: string;
  created_at: string;
  updated_at: string;
}

export interface UserCreate {
  name: string;
  surname?: string;
  nickname: string;
  email: string;
  password: string;
}

export interface UserUpdate {
  name?: string;
  surname?: string;
  nickname?: string;
  password?: string;
  avatar_url?: string;
  bio?: string;
  birthday?: string | Dayjs | null;
}

export interface UsersList {
  users: UserSchema[];
  total: number;
}

export interface UserOwnedCompany {
  id: string;
  name: string;
  description?: string;
  visibility: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface UserOwnedCompaniesList {
  companies: UserOwnedCompany[];
  total: number;
}
