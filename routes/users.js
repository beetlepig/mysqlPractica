var express = require('express');
var router = express.Router();
var mysql = require ("mysql");

var con = mysql.createConnection({
    host: "200.3.193.22",
    user: "P09652_1_9",
    password: "mQ9YZPGe",
    database: "P09652_1_9"
});



router.get('/:id/posts', function(req,res,next){
    var correo = req.params.id;

        con.query({
                sql: 'SELECT * FROM posts WHERE id_usuario = ?',
                timeout: 7000,
            },
            [correo],
            function (err, rows) {
                console.log(rows);
                res.render('post',{posts:rows});
            });

});

module.exports = router;
