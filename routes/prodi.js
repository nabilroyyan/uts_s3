const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const connection = require("../config/db");

router.get("/", function (req, res) {
  connection.query("select * from prodi", (err, rows) => {
    if (err) {
      return res.status(500).json({
        status: false,
        message: "server gagal",
        Error: err,
      });
    } else {
      return res.status(200).json({
        status: true,
        message: "data  prodi",
        data: rows[0],
      });
    }
  });
});

router.post(
  "/create",
  [
    body("nama_prodi").notEmpty(),
    body("id_fakultas").notEmpty(),
    body("id_mahasiswa").notEmpty(),
  ],
  (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json({
        error: error.array(),
      });
    }
    let data = {
      nama_prodi: req.body.nama_prodi,
      id_fakultas: req.body.id_fakultas,
      id_mahasiswa: req.body.id_mahasiswa,
    };
    connection.query("insert into prodi set ?", data, function (err, rows) {
      if (err) {
        return res.status(500).json({
          status: false,
          message: "server gangguan",
        });
      } else {
        return res.status(201).json({
          status: true,
          message: "data berhasil di buat",
          data: rows[0],
        });
      }
    });
  }
);

router.get("/(:id)", function (req, res) {
  let id = req.params.id;
  connection.query(
    `select * from prodi where id_prodi = ${id}`,
    function (err, rows) {
      if (err) {
        return res.status(500).json({
          status: false,
          message: "server error ",
          error: err,
        });
      }
      if (rows.length <= 0) {
        return res.status.json({
          status: false,
          message: "not found",
        });
      } else {
        return res.status(200).json({
          status: true,
          message: "alat tangkap ada",
          data: rows[0],
        });
      }
    }
  );
});

router.patch(
  "/update/:id",
  [
    body("nama_prodi").notEmpty(),
    body("id_fakultas").notEmpty(),
    body("id_mahasiswa").notEmpty(),
  ],
  (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(422).json({
        error: error.array(),
      });
    }
    let id = req.params.id;
    let data = {
      nama_prodi: req.body.nama_prodi,
      id_fakultas: req.body.id_fakultas,
      id_mahasiswa: req.body.id_mahasiswa,
    };
    connection.query(
      `update prodi set ? where id_prodi = ${id}`,
      data,
      function (err, rows) {
        if (err) {
          return res.status(500).json({
            status: false,
            message: "server error",
          });
        } else {
          return res.status(200).json({
            status: true,
            message: "update berhasill",
          });
        }
      }
    );
  }
);

router.delete("/delete/(:id)", function (req, res) {
  let id = req.params.id;
  connection.query(
    `delete from prodi where id_prodi = ${id}`,
    function (err, rows) {
      if (err) {
        return req.status(500).json({
          status: false,
          message: "server error",
        });
      } else {
        return res.status(200).json({
          status: true,
          message: "data berhasil dihapus",
        });
      }
    }
  );
});

module.exports = router;
