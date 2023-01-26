import { env } from 'src/utils/env';
const { SECRET_KEY } = env;

export default {
  jwt: {
    secretKey: SECRET_KEY,
    expiresIn: 36000000,
  },
};
