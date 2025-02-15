import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// console.log(path.resolve(__dirname, "./src"));
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: [{ find: "@", replacement: path.resolve(__dirname, "src") }],
    },
    server: {
        host: '0.0.0.0',
        port: 3000
    }
});
