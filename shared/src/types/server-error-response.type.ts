import { type ServerErrorType } from '../enums/enums.js';

type ServerCommonErrorResponse = {
    errorType: typeof ServerErrorType.COMMON;
    message: string;
};

export { type ServerCommonErrorResponse };
