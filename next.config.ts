import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow atlas dev's tailnet/tunnel origins so Next doesn't block cross-origin
  // /_next/* requests. `**` is Next's recursive wildcard (a single `*` only
  // matches one DNS label, so `*.ts.net` would not match atlas.<tailnet>.ts.net).
  allowedDevOrigins: ["**.ts.net", "**.trycloudflare.com"],
  experimental: {
    useTypeScriptCli: true,
  },
};

export default nextConfig;
