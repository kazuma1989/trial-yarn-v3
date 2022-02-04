/// <reference types="vite/client" />

interface ImportMetaEnv {
  [key: `PUBLIC_ENV_${string}`]: string
}

interface Window {
  __REDUX_DEVTOOLS_EXTENSION__?(): import('redux').StoreEnhancer
}
