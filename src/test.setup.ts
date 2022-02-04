// --isolatedModules フラグがオンのときは import か export が必須なので、その回避として入れている。
export {}

globalThis.window = globalThis.window ?? {
  location: 'https://example.com/',
}
