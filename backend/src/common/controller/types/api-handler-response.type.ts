import { type ValueOf } from '~/common/types/types.js';

import { type HttpCode } from '../../enums/enums.js';

type ApiHandlerResponse = {
    status: ValueOf<typeof HttpCode>;
    payload: unknown;
};

export { type ApiHandlerResponse };
