var express = require('express');
var router = express.Router();
var mysql = require ("mysql");
var errortype="";
var conectado=false;

var current_user;

var con = mysql.createConnection({
    host: "200.3.193.22",
    user: "P09652_1_9",
    password: "mQ9YZPGe",
    database: "P09652_1_9"
});





router.get('/', function(req, res, next) {
    if (!conectado){
        con.connect(function (err) {
            if (err) {
                console.log('Error conectando');
                res.write("error con db");
                res.end();
            } else {
                res.render('index', {title: 'la wea sql', error: errortype});
                conectado = true;
            }

        });
    } else {
        res.render('index', {title: 'la wea sql', error: errortype});
    }

});

router.post('/', function(req,res,next){
    var user = req.body.correo;
    var pass = req.body.pass;


    con.query({
            sql: 'SELECT * FROM usuarios WHERE correo = ?',
            timeout: 7000,
        },
        [user],
        function (err, rows) {

            if(err){
                console.log(err);
                res.write(err);
                res.end();
            }else{

                console.log(rows[0]);

                if(rows.length == 0){
                    errortype= 'no existe el usuario que ingresaste';
                    res.redirect('/');
                }else{
                    if (rows[0].pass == pass){
                        current_user = rows[0];
                        res.redirect(303,'/users/'+rows[0].correo+'/posts');
                        errortype="";
                    }else{
                        errortype= 'Contraseña incorrecta';
                        res.redirect('/');
                    }
                }
            }
        });

});

module.exports = router;
