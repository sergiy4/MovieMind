import { type ValueOf } from 'shared';

import { type Sender } from '../enums/enums.js';

type MessageSender = ValueOf<typeof Sender>;

export { type MessageSender };
