import {defineConfig} from 'vite';
import {resolve} from 'path';

export default defineConfig({
    // Base public path for assets
    base: '/assets/',

    // Configure build output
    build: {
        outDir: resolve(__dirname, '_site/assets'),
        emptyOutDir: true,
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'assets/js/main.js'),
            },
            output: {
                entryFileNames: 'js/[name]-[hash].js',
                chunkFileNames: 'js/[name]-[hash].js',
                assetFileNames: (assetInfo) => {
                    const info = assetInfo.name.split('.');
                    const ext = info[info.length - 1];

                    if (/\.(png|jpe?g|gif|svg|webp)$/i.test(assetInfo.name)) {
                        return 'images/[name]-[hash].[ext]';
                    }

                    if (/\.css$/i.test(assetInfo.name)) {
                        return 'css/[name]-[hash].[ext]';
                    }

                    if (/\.(woff2?|eot|ttf|otf)$/i.test(assetInfo.name)) {
                        return 'fonts/[name]-[hash].[ext]';
                    }

                    return '[ext]/[name]-[hash].[ext]';
                }
            }
        }
    },

    // Development server configuration
    server: {
        host: 'localhost',
        port: 5173,
        open: false, // Don't open browser automatically
        hmr: {
            protocol: 'ws',
            host: 'localhost',
            port: 5173
        }
    },

    // Resolve paths
    resolve: {
        alias: {
            '@': resolve(__dirname, 'assets')
        }
    }
});
