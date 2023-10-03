const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const connection = require("../config/db");

router.get("/", function (req, res) {
  connection.query("select * from jadwalkuliah", (err, rows) => {
    if (err) {
      return res.status(500).json({
        status: false,
        message: "server gagal",
        Error: err,
      });
    } else {
      return res.status(200).json({
        status: true,
        message: "data  jadwal kuliah",
        data: rows[0],
      });
    }
  });
});

router.post(
  "/create",
  [
    //validation
    body("id_matakuliah").notEmpty(),
    body("id_dosen").notEmpty(),
    body("id_prodi").notEmpty(),
    body("hari").notEmpty(),
    body("jam").notEmpty(),
  ],
  (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(422).json({
        error: error.array(),
      });
    }
    let data = {
      id_matakuliah: req.body.id_matakuliah,
      id_dosen: req.body.id_dosen,
      id_prodi: req.body.id_prodi,
      hari: req.body.hari,
      jam: req.body.jam,
    };
    connection.query(
      "insert into jadwalkuliah set ?",
      data,
      function (err, rows) {
        if (err) {
          return res.status(500).json({
            status: false,
            massage: "server eror",
          });
        } else {
          return res.status(201).json({
            status: true,
            massage: "succes",
            data: rows[0],
          });
        }
      }
    );
  }
);

router.get("/:id", function (req, res) {
  let id = req.params.id;
  connection.query(
    `select * from jadwalkuliah where id_jadwal = ${id}`,
    function (err, rows) {
      if (err) {
        return res.status(500).json({
          status: false,
          massage: "server eror",
        });
      }
      if (rows.length <= 0) {
        return res.status(404).json({
          status: false,
          massage: "not found",
        });
      } else {
        return res.status(200).json({
          status: true,
          massage: "data jadwalkuliah",
          data: rows[0],
        });
      }
    }
  );
});

router.patch(
  "/update/:id",
  [
    body("id_matakuliah").notEmpty(),
    body("id_dosen").notEmpty(),
    body("id_prodi").notEmpty(),
    body("hari").notEmpty(),
    body("jam").notEmpty(),
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
      id_matakuliah: req.body.id_matakuliah,
      id_dosen: req.body.id_dosen,
      id_prodi: req.body.id_prodi,
      hari: req.body.hari,
      jam: req.body.jam,
    };
    connection.query(
      `update jadwalkuliah set ? where id_jadwal = ${id}`,
      data,
      function (err, rows) {
        if (err) {
          return res.status(500).json({
            status: false,
            massage: "server eror",
          });
        } else {
          return res.status(200).json({
            status: true,
            massage: "update berhasil",
          });
        }
      }
    );
  }
);

router.delete("/delete/:id", function (req, res) {
  let id = req.params.id;
  connection.query(
    `delete from jadwalkuliah where id_jadwal = ${id} `,
    function (err, rows) {
      if (err) {
        return res.status(500).json({
          status: false,
          massage: "server eror",
        });
      } else {
        return res.status(200).json({
          status: true,
          massage: "delete berhasil",
        });
      }
    }
  );
});

module.exports = router;
