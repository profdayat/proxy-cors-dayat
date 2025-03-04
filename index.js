const express = require("express");
const corsAnywhere = require("cors-anywhere");

const app = express();

// Konfigurasi proxy CORS
const proxy = corsAnywhere.createServer({
  originWhitelist: [], // Kosongkan agar semua origin diizinkan
  requireHeader: [], // Tidak memerlukan header khusus
  removeHeaders: ["cookie", "cookie2"], // Menghapus header cookie untuk keamanan
});

// Endpoint utama proxy
app.use((req, res) => {
  req.url = req.url.replace(/^\/proxy\//, ""); // Hapus prefix '/proxy/' dari URL
  proxy.emit("request", req, res);
});

// Jalankan server di Railway (gunakan PORT dari environment variable)
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`CORS Proxy berjalan di port ${PORT}`);
});
