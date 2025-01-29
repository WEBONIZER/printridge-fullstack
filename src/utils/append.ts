import { appendFileSync, readFileSync } from "fs";

(async function (): Promise<void> {
  try {
    const { updated, renewing, name } = (await import("minimist")).default(
      process.argv.slice(2)
    );

    const key = String(name).toUpperCase();

    const value = Buffer.from(readFileSync(renewing, "utf-8")).toString(
      "base64"
    );

    appendFileSync(updated, `${key}="${value}"\r`);
  } catch (error) {
    throw new Error(String(error));
  }
})();
