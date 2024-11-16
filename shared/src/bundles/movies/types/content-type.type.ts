import { type ValueOf } from 'shared';

import { type ContentType as ContentTypeEnum } from '../enums/enums.js';

type ContentType = ValueOf<typeof ContentTypeEnum>;

export { type ContentType };
