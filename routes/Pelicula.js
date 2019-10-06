var express = require('express');
var router = express.Router();
let data = require('./data');

router.get('/', function(req, res){
    res.status('200');
    res.json(data);
});

router.get("/:pelicula", (req, res) => {
    const NombrePelicula = req.params.pelicula;
    const item = data.find(_item => _item.NombrePelicula === NombrePelicula);
 
    if (item) {
       res.status('200');
       res.json(item);
    } else {
       res.status('404');
       res.json({ message: `Pelicula ${NombrePelicula} No existe`})
    }
 });
 



module.exports = router;
