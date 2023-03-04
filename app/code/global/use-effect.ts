import { onBeforeUnmount, onMounted } from 'vue';

type VoidFunction = () => void;

export default function useEffect(effect: () => VoidFunction | void) {
  let dispose: VoidFunction | undefined | void;

  onMounted(() => {
    dispose = Reflect.apply(effect, undefined, []);
  });

  onBeforeUnmount(() => {
    if (dispose) {
      Reflect.apply(dispose, undefined, []);
    }
  });
}
