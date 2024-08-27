interface ImportMetaEnv {
    readonly VITE_BACKEND_URL: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
/// <reference types="vite/client" />