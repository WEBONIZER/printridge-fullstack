import { exec } from "child_process";
import { copyFile } from "fs/promises";
import { homedir } from "os";
import { join, resolve } from "path";

(async function (): Promise<void> {
  try {
    const { domain } = (await import("minimist")).default(
      process.argv.slice(2)
    );

    exec(
      `bash ~/acme.sh/acme.sh --renew --dns -d "${domain}"  -d "*.${domain}" --yes-I-know-dns-manual-mode-enough-go-ahead-please`,
      async (_, stdout, __) => {
        console.log("stdout", stdout);

        const certPath = join(homedir(), `.acme.sh/${domain}_ecc`);
        const projectPath = resolve(".local");

        await copyFile(
          join(certPath, `${domain}.cer`),
          join(projectPath, `${domain}.cer`)
        );

        await copyFile(
          join(certPath, `${domain}.key`),
          join(projectPath, `${domain}.key`)
        );

        await copyFile(join(certPath, "ca.cer"), join(projectPath, "ca.cer"));

        await copyFile(
          join(certPath, "fullchain.cer"),
          join(projectPath, "fullchain.cer")
        );
      }
    );
  } catch (error) {
    throw new Error(String(error));
  }
})();
