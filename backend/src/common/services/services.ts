import { config } from '../config/config.js';
import { CryptService } from './crypt/crypt.service.js';
import { TokenService } from './token/token.service.js';

const cryptService = new CryptService();

const secretKey = config.ENV.TOKEN.SECRET_KEY;
const expirationTime = config.ENV.TOKEN.EXPIRATION_TIME;
const tokenService = new TokenService(secretKey, expirationTime);

export { cryptService,  tokenService };export { CryptService } from './crypt/crypt.service.js';
export { TokenService } from './token/token.service.js';