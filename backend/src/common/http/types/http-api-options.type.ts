import { type ValueOf } from '~/common/types/types.js';

import { type HttpContentType } from '../enums/enums.js';
import { type CustomHeader, type HttpOptions } from './types.js';

type HTTPApiOptions = Omit<
    HttpOptions,
    'headers' | 'payload' | 'credentials'
> & {
    contentType: ValueOf<typeof HttpContentType>;
    headers?: CustomHeader;
    payload?: HttpOptions['payload'];
    credentials?: HttpOptions['credentials'];
};

export { type HTTPApiOptions };
