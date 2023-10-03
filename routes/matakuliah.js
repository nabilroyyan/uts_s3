const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const connection = require("../config/db");


router.get("/", function (req, res) {
     connection.query("select * from matakuliah", (err, rows) => {
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
    //validation
    body("nama_matakuliah").notEmpty(),
    body("sks").notEmpty(),
  ],
  (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(422).json({
        error: error.array(),
      });
    }
    let data = {
      nama_matakuliah: req.body.nama_matakuliah,
      sks: req.body.sks,
    };
    connection.query("insert into matakuliah set ?", data, function (err, rows) {
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
    `select * from matakuliah where id_matakuliah = ${id}`,
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
          massage: "data matakuliah",
          data: rows[0],
        });
      }
    }
  );
});

router.patch(
  "/update/:id",
  [body("nama_matakuliah").notEmpty(), body("sks").notEmpty()],
  (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(422).json({
        error: error.array(),
      });
    }
    let id = req.params.id;
    let data = {
      nama_matakuliah: req.body.nama_matakuliah,
      sks: req.body.sks,
    };
    connection.query(
      `update matakuliah set ? where id_matakuliah = ${id}`,
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
    `delete from matakuliah where id_matakuliah = ${id} `,
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
