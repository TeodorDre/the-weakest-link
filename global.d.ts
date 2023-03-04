declare module '*.png' {
  const value: string;
  export default value;
}

declare module '*.jpg' {
  const value: string;
  export default value;
}

declare module '*.mp4' {
  const value: string;
  export default value;
}

declare module '*.svg' {
  import type { Component } from 'vue';

  const value: Component;
  export default value;
}
