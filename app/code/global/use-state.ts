import { Ref, ref, UnwrapRef } from 'vue';

function useState<T>(defaultValue: T): [Ref<T>, ((val: UnwrapRef<T>) => void)] {
  const item = ref<T>(defaultValue);

  const setValue = (val: UnwrapRef<T>) => {
    item.value = val;
  };

  return [item as Ref<T>, setValue];
}

export default useState;
