/// <reference types="vitest" />
import react from '@vitejs/plugin-react'
import { defineConfig, UserConfig } from 'vite'

export default defineConfig(async ({ command }) => {
  const { BROWSER, BUILD_PATH, HOST, PORT } = process.env

  const config: UserConfig = {
    server: {
      // localhost 以外で起動したい場合は指定する。
      host: HOST || 'localhost',

      // Create React App のデフォルトのポートと同じにする。
      port: (PORT && parseInt(PORT)) || 3000,

      // 自動でブラウザーを開きたくないときは open=false を指定する。
      // もしくは CLI オプションで `--no-open` を渡す。
      // (e.g.) $ npm start -- --no-open
      open: BROWSER || true,
    },

    build: {
      // Create React App のデフォルトの出力先と同じにする。
      outDir: BUILD_PATH || './build/',
    },

    // 環境変数の接頭辞を `VITE_` 以外の値にする。
    envPrefix: 'PUBLIC_ENV_',

    plugins: [
      // The all-in-one Vite plugin for React projects.
      react(),
    ],

    // Vitest
    test: {
      setupFiles: ['./src/test.setup.ts'],
    },
  }

  switch (command) {
    case 'serve': {
      config.plugins.push(
        // TypeScript で型検査する。
        await import('vite-plugin-checker')
          .then(
            (m) =>
              // @ts-expect-error vite-plugin-checker の export が型と合わない。
              m.default.default as typeof m.default,
          )
          .then((checker) =>
            checker({
              typescript: {
                tsconfigPath: './tsconfig.loose.json',
              },
            }),
          ),
      )

      break
    }

    case 'build':
    default: {
      break
    }
  }

  return config
})
