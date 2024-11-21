import { config } from '../config/config.js';
import { AiAssistant } from './ai-assistant/ai-assistant.service.js';
import { CryptService } from './crypt/crypt.service.js';
import { TokenService } from './token/token.service.js';
import { TextTokenCounterService } from './token-counter/token-counter.service.js';

const secretKey = config.ENV.TOKEN.SECRET_KEY;
const expirationTime = config.ENV.TOKEN.EXPIRATION_TIME;

const cryptService = new CryptService();
const textTokenCounterService = new TextTokenCounterService();
const tokenService = new TokenService(secretKey, expirationTime);
const aiAssistant = new AiAssistant(config);

export { aiAssistant, cryptService, textTokenCounterService,tokenService };
export { ChatsContextManager } from './chats-context-service/chats-context-manager.service.js';
export { CryptService } from './crypt/crypt.service.js';
export { TokenService } from './token/token.service.js';
export { TextTokenCounterService } from './token-counter/token-counter.service.js';
