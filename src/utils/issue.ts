import { exec } from "child_process";
import { config } from "dotenv";
import { stringify } from "querystring";

(async function (): Promise<void> {
  try {
    const { domain, certs } = (await import("minimist")).default(
      process.argv.slice(2)
    );

    const { LOGIN, BEGET_API_PASSWORD } = config({ path: ".local/.env" })
      .parsed!;

    exec(
      `bash ~/acme.sh/acme.sh --issue --dns -d "${domain}"  -d "*.${domain}" --yes-I-know-dns-manual-mode-enough-go-ahead-please --server ${certs}`,
      (_, stdout, __) => {
        console.log("stdout", stdout);

        const matches = [
          ...stdout.matchAll(/Domain: '(.+?)'\n.*?TXT value: '(.+?)'/g),
        ];

        (async function () {
          const params = stringify({
            login: LOGIN,
            passwd: BEGET_API_PASSWORD,
            input_format: "json",
            output_format: "json",
            input_data: JSON.stringify({
              fqdn: matches[0][1],
              records: {
                TXT: matches.map((e, i) => ({
                  priority: (i + 1) * 10,
                  value: e[2],
                })),
              },
            }),
          });

          (await import("axios")).default
            .post(`https://api.beget.com/api/dns/changeRecords?${params}`)
            .then((response) => console.log(response.data))
            .catch(console.error);
        })();
      }
    );
  } catch (error) {
    throw new Error(String(error));
  }
})();
