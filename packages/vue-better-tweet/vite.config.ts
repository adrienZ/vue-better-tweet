import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { libInjectCss } from "vite-plugin-lib-inject-css";
import { resolve } from "node:path";

const entries = {
  index: resolve(__dirname, "src/index.ts"),
  "index.client": resolve(__dirname, "src/index.client.ts"),
  api: resolve(__dirname, "src/api/index.ts"),
};

export default defineConfig({
  plugins: [
    vue(),
    libInjectCss(),
  ],
  build: {
    // Avoid minified JS var collisions in CSS module output when bundled by other tools.
    minify: false,
    sourcemap: true,
    outDir: "dist",
    cssCodeSplit: true,
    lib: {
      entry: entries,
      formats: ["es"],
      name: 'vue-better-tweet',
    },
    rollupOptions: {
      external: ["vue", "clsx", "swrv"],
      output: {
        // preserve to mach swc behavior fromm original react project
        preserveModules: true,
        preserveModulesRoot: "src",
        entryFileNames: "[name].js",
        chunkFileNames: "chunks/[name]-[hash].js",
        assetFileNames: "assets/[name]-[hash][extname]",
      },
    },
  },
});
