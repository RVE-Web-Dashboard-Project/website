import react from "@vitejs/plugin-react";
import viteTsconfigPaths from "vite-tsconfig-paths";
import { defineConfig, loadEnv } from 'vite';
import typescript from "rollup-plugin-typescript2";
import tspCompiler from "ts-patch/compiler";

export default defineConfig(({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd(), '') }
  return {
    // depending on your application, base can also be "/"
    base: "",
    plugins: [
      {
        ...typescript({
          typescript: tspCompiler,
          sourceMap: true,
          inlineSources: true
        }), enforce: "post"
      },
    ],
    esbuild: false,
    server: {
      // this ensures that the browser opens upon server start
      open: true,
      // this sets a default port to 3000
      port: Number(process.env.PORT) || 3000,
    },
    // include: ["../../**/*.ts+(|x)"],
  }
});