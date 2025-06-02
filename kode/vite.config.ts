
import react from '@vitejs/plugin-react';
import laravel from 'laravel-vite-plugin';
import { defineConfig } from 'vite';

export default defineConfig({
    plugins: [
        laravel({
            input: ["resources/js/main.tsx"],
            refresh: true,
        }),
        react(),
    ],
    resolve: {
        alias: {
            "@": "/resources/js",
        },
    },
    server: {
        host: "127.0.0.1",
        port: 5173,
        strictPort: true,
        cors: true,
        hmr: {
            host: "127.0.0.1",
        },
    },
    // css: {
    //     preprocessorOptions: {
    //         scss: {
    //             includePaths: ["resources/js/styles/sass"],
    //             additionalData: `@use "abstracts" as *;`, 
    //         },
    //     },
    // },
});
