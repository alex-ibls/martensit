// Запускайте через `npm run pm2` — сначала next build, затем этот процесс.
module.exports = {
  apps: [
    {
      name: "martensit",
      cwd: __dirname,
      script: "node_modules/next/dist/bin/next",
      args: ["start", "-H", "0.0.0.0", "-p", "3002"],
      interpreter: "node",
      instances: 1,
      exec_mode: "fork",
      autorestart: true,
      watch: false,
      max_memory_restart: "512M",
      env: {
        NODE_ENV: "production",
        HOSTNAME: "0.0.0.0",
        PORT: 3002,
      },
    },
  ],
};
