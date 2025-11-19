export interface UserSchema {
	id: string;
	name: string;
	surname: string;
	nickname: string;
	email: string;
	hashed_password: string;
	created_at: string;
	updated_at: string;
}

export interface UserCreate {
	name: string;
	surname: string;
	nickname: string;
	email: string;
	password: string;
}
