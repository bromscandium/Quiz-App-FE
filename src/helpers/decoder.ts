import { CookieNames } from '@constants';
import { getCookie } from '@helpers/cookies';
import { jwtDecode } from 'jwt-decode';

interface JWTPayload {
  sub: string;
  iat: number;
  exp: number;
  type: string;
}

export const getCurrentUserFromToken = async (): Promise<JWTPayload | null> => {
  try {
    const accessToken = await getCookie({ name: CookieNames.ACCESS_TOKEN });
    if (!accessToken) return null;

    return jwtDecode<JWTPayload>(accessToken);
  } catch (error) {
    console.error('Failed to decode token', error);
    return null;
  }
};
