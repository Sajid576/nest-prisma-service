import config from 'src/config';
import * as jwt from 'jsonwebtoken';

export function createToken(email: string, roles: string[]) {
  const expiresIn = config.jwt.expiresIn;
  const secretKey = config.jwt.secretKey;

  const userInfo = { email: email, roles: roles };
  const token = jwt.sign(userInfo, secretKey, { expiresIn });

  return {
    expires_in: expiresIn,
    access_token: token,
  };
}

export function decodeToken(token: string) {
  const secretKey = config.jwt.secretKey;

  return jwt.verify(token, secretKey);
}
