export interface LoginRequest {
	email: string;
	password: string;
}

export interface TokenRequest {
	refresh_token: string;
}

export interface TokenResponse {
	access_token: string;
	refresh_token: string;
	token_type: 'bearer';
	expires_in?: number;
}

export interface UserResponse {
	id: string;
	name: string;
	surname: string;
	nickname: string;
	email: string;
	created_at: string;
	updated_at: string;
}
