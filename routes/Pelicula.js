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
       res.json({ message: `Pelicula ${NombrePelicula} No existe`});
    }
 });
 
 router.post("/", (req, res) => {
   const Pelicula = req.body;
   
   if(Object.keys(Pelicula).length === 5)
   {
      
      if(Pelicula.NombrePelicula)
         {
            Peliculas.push(Pelicula);
            res.status('201');
            res.json(Peliculas);
         }
         else{
            
            res.status('400');
            res.json(Pelicula);
         }
      
     
   }
   else
   {
      res.status('400');
      res.json({ message: `Solo deben existir 5 parametros cualquier cantidad diferente no es aceptada`})
   }

   
});

router.put("/:pelicula", (req, res) => {
   const NombrePelicula = req.params.pelicula;
   const PeliculaActualizada = req.body;
   
   const Pelicula2 = Peliculas.find(_Pelicula => _Pelicula.NombrePelicula === NombrePelicula);
   const PeliculasActualizacion = [];
   if (Pelicula2) 
   {
      Peliculas.forEach(Pelicula => {
         if (Pelicula.NombrePelicula === NombrePelicula) {
            PeliculasActualizacion.push(PeliculaActualizada);
         } else {
            PeliculasActualizacion.push(Pelicula);
         }
      });

      Peliculas = PeliculasActualizacion;
      res.status('204');
      res.json(Peliculas);
   } 
   else 
   {
      res.status('404');
      res.json({ message: `Pelicula ${NombrePelicula} No existe`});
   }
   
});
router.delete("/:pelicula", (req, res) => {
   const NombrePelicula = req.params.pelicula;
   
   const Pelicula2 = Peliculas.find(_Pelicula => _Pelicula.NombrePelicula === NombrePelicula);
   const PeliculasActualizacion = [];
   if (Pelicula2) 
   {
      Peliculas.forEach(Pelicula => {
         if (Pelicula.NombrePelicula === NombrePelicula) {
            
         } else {
            PeliculasActualizacion.push(Pelicula);
         }
      });

      Peliculas = PeliculasActualizacion;
      res.status('204');
      res.json(Peliculas);
   } 
   else 
   {
      res.status('404');
      res.json({ message: `Pelicula ${NombrePelicula} No existe`});
   }
   
});
module.exports = router;
