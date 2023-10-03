const express = require("express");
const app = express();
const port = 3000;
const bodyPs = require("body-parser");

app.use(bodyPs.urlencoded({ extended: false }));
app.use(bodyPs.json());

const prodiRouter = require("./routes/prodi");
app.use("/api/prodi", prodiRouter);

const universitasRouter = require("./routes/universitas");
app.use("/api/universitas", universitasRouter);

const mahasiswaRouter = require("./routes/mahasiswa");
app.use("/api/mahasiswa", mahasiswaRouter);

const fakultasRouter = require("./routes/fakultas");
app.use("/api/fakultas", fakultasRouter);

const matakuliahRouter = require("./routes/matakuliah");
app.use("/api/matakuliah", matakuliahRouter);

const dosenRouter = require("./routes/dosen");
app.use("/api/dosen", dosenRouter);

const jadwalkuliahRouter = require("./routes/jadwalkuliah");
app.use("/api/jadwalkuliah", jadwalkuliahRouter);

app.listen(port, () => {
  console.log(`aplikasi berjalan di http::localhost:${port}`);
});
