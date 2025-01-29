vite build --ssrManifest --outDir dist/client
vite build --ssr src/frontend/entry-server.tsx --outDir dist/server
bun run src/backend/main.ts