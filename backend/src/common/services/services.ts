import { config } from '../config/config.js';
import { baseHttp } from '../http/http.js';
import { AiAssistant } from './ai-assistant/ai-assistant.service.js';
import { CryptService } from './crypt/crypt.service.js';
import { MOVIE_API_BASE } from './movie-api/constants/constants.js';
import { ApiPath } from './movie-api/enums/enums.js';
import { MovieApi } from './movie-api/movie-api.js';
import { TokenService } from './token/token.service.js';
import { TextTokenCounterService } from './token-counter/token-counter.service.js';

const secretKey = config.ENV.TOKEN.SECRET_KEY;
const expirationTime = config.ENV.TOKEN.EXPIRATION_TIME;

const cryptService = new CryptService();
const textTokenCounterService = new TextTokenCounterService();
const tokenService = new TokenService(secretKey, expirationTime);
const aiAssistant = new AiAssistant(config);
const movieApi = new MovieApi({
    baseUrl: MOVIE_API_BASE,
    path: ApiPath.SEARCH,
    http: baseHttp,
    config,
});

export {
    aiAssistant,
    cryptService,
    movieApi,
    textTokenCounterService,
    tokenService,
};
export { ChatsContextManager } from './chats-context-service/chats-context-manager.service.js';
export { CryptService } from './crypt/crypt.service.js';
export { TokenService } from './token/token.service.js';
export { TextTokenCounterService } from './token-counter/token-counter.service.js';
