# bun run src/utils/append.ts --updated ".local/.env" --renewing ".local/fullchain.cer" --name "cert"
# bun run src/utils/append.ts --updated ".local/.env" --renewing ".local/printridge.ru.key" --name "key"
bun run "src/utils/append.ts" --updated ".local/.env" --renewing ".local/.env" --name "env"