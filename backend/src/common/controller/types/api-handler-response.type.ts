import { type HttpCode } from '~/common/enums/enums.js';
import { type ValueOf } from '~/common/types/types.js';

type ApiHandlerResponse = {
    status: ValueOf<typeof HttpCode>;
    payload: unknown;
};

export { type ApiHandlerResponse };
