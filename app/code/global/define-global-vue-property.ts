import { ComponentInternalInstance } from 'vue';
import { UnexpectedComponentStateError } from '@/code/errors/component-state-error';

export default function defineGlobalVueProperty(
  app: ComponentInternalInstance | null,
  key: PropertyKey,
  value: unknown) {
  if (!app) {
    throw new UnexpectedComponentStateError('getCurrentInstance');
  }

  Reflect.set(app.appContext.config.globalProperties, key, value);
}
