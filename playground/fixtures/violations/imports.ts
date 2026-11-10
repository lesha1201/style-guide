import { basename } from 'node:path';
import { join } from 'node:path';

export const paths = [basename('/tmp/example'), join('/tmp', 'example')];
