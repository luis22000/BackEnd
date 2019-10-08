var express = require('express');
var router = express.Router();
let Peliculas = require('./data');
const body_parser = require('body-parser');
router.use(body_parser.json());

router.get('/', function(req, res){
    res.status('200');
    res.json(Peliculas);
});

router.get("/:pelicula", (req, res) => {
    const NombrePelicula = req.params.pelicula;
    const Pelicula = Peliculas.find(_Pelicula => _Pelicula.NombrePelicula === NombrePelicula);
  
    if (Pelicula) {
       res.status('200');
       res.json(Pelicula);
    } else {
       res.status('404');
       res.json({ message: `Pelicula ${NombrePelicula} No existe`})
    }
 });
 
 router.post("/", (req, res) => {
   const Pelicula = req.body;
   if(Pelicula.NombrePelicula)
   {
      Peliculas.push(Pelicula);
      res.status('201');
      res.json(Peliculas);
   }
   else{
      
      res.status('400');
      res.json({ message: `Pelicula ${Pelicula} no contiene nombre pelicula`});
   }

   
});


module.exports = router;
