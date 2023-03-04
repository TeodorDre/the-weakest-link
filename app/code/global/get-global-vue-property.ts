import { ComponentInternalInstance } from 'vue';

import { UnexpectedComponentStateError } from '@/code/errors/component-state-error';

export default function getGlobalVueProperty(
  app: ComponentInternalInstance | null,
  key: PropertyKey,
) {
  if (!app) {
    throw new UnexpectedComponentStateError('getCurrentInstance');
  }

  return Reflect.get(app.appContext.config.globalProperties, key);
}
