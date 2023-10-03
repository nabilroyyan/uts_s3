const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const connection = require("../config/db");

router.get("/", function (req, res) {
  connection.query("SELECT * from fakultas", function (err, rows) {
    if (err) {
      return res.status(500).json({
        status: false,
        message: "Server Failed",
      });
    } else {
      return res.status(200).json({
        status: true,
        message: "Data fakultas",
        data: rows,
      });
    }
  });
});

router.post(
  "/create",
  [
    //validation
    body("nama_fakultas").notEmpty(),
    body("id_universitas").notEmpty(),
  ],
  (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(422).json({
        error: error.array(),
      });
    }
    let data = {
      nama_fakultas: req.body.nama_fakultas,
      id_universitas: req.body.id_universitas,
    };
    connection.query("insert into fakultas set ?", data, function (err, rows) {
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
    });
  }
);

router.get("/:id", function (req, res) {
  let id = req.params.id;
  connection.query(
    `select * from fakultas where id_fakultas = ${id}`,
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
          massage: "data fakultas",
          data: rows[0],
        });
      }
    }
  );
});

router.patch(
  "/update/:id",
  [body("nama_fakultas").notEmpty(), body("id_universitas").notEmpty()],
  (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(422).json({
        error: error.array(),
      });
    }
    let id = req.params.id;
    let data = {
      nama_fakultas: req.body.nama_fakultas,
      id_universitas: req.body.id_universitas,
    };
    connection.query(
      `update fakultas set ? where id_fakultas = ${id}`,
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
    `delete from fakultas where id_fakultas = ${id} `,
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
