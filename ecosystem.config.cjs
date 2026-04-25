module.exports = {
  apps: [
    {
      name: "dashboard-cipta-karya", // Nama proses di PM2
      script: "bun",                 // Karena menggunakan Bun
      args: "start",                 // Sama dengan perintah "bun start"
      interpreter: "none",           // Memberitahu PM2 untuk menjalankan perintah secara langsung
      env: {
        NODE_ENV: "production",
        PORT: 8002,                  // Port yang Anda inginkan
      },
      // Opsional: Pengaturan log agar server tidak penuh
      out_file: "./logs/out.log",
      error_file: "./logs/error.log",
      merge_logs: true,
      log_date_format: "YYYY-MM-DD HH:mm Z"
    },
  ],
};