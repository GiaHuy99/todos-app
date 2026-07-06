import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { cloudflare } from "@cloudflare/vite-plugin";

const reactAppRoot = path.resolve(
	path.dirname(fileURLToPath(import.meta.url)),
	"src/react-app",
);

export default defineConfig({
	plugins: [react(), tailwindcss(), cloudflare()],
	resolve: {
		alias: {
			"@": reactAppRoot,
		},
	},
});
