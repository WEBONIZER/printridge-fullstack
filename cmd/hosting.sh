export $(cat ".env" | grep -v "^#" | grep -v "^$" | xargs)

sudo apt-get update && sudo apt-get install -y caddy docker.io docker-compose-v2 && sudo apt autoremove -y

sudo chown -R caddy:caddy "/var/lib/caddy"

sudo tee "/etc/caddy/Caddyfile" << EOF
{
  email system@webonizer.su
  acme_ca https://acme-v02.api.letsencrypt.org/directory
  renew_interval 24h
}
$DOMAIN {
    reverse_proxy 127.0.0.1:$HTTP
    encode gzip
    tls {
        protocols tls1.3
        ciphers TLS_ECDHE_ECDSA_WITH_AES_256_GCM_SHA384
    }
}
EOF

sudo systemctl restart caddy docker

bash "cmd/compose.sh" 