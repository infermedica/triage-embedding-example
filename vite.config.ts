import { defineConfig } from "vite";
import proxy from "./proxy/proxy";

export default defineConfig(({ mode }) => {
  return {
    plugins: [proxy(mode)],
    server: {
      port: 3000,
      proxy: {
        "/proxy": {
          target: "http://localhost:3001",
          changeOrigin: true,
          secure: false,
          rewrite: (path) => path.replace("/proxy", ""),
        },
      },
    },
  };
});
