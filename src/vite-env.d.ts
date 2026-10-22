/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Origem usada para buscar o JSON de produtos. Ver src/services/products.ts */
  readonly VITE_API_ORIGIN?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
