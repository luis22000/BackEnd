var express = require('express');
var router = express.Router();
let Peliculas = require('./data');
const body_parser = require('body-parser');
router.use(body_parser.json());
const PeliculaDB = require('../model/model.pelicula');

const getPelicula = async(req, res,next) =>{
   PeliculaDB.find()
    .then(peliculadb => {
        res.status(200);
        res.json(peliculadb);
    }); 
   
};


const getOnePelicula = async(req, res,next) => {
   PeliculaDB.find(  { NombrePelicula: req.params.pelicula })
    .then(peliculadb => {
        if(!peliculadb) {
            res.status(404);
            res.send();
        }
        res.status(200);
        res.json(peliculadb);
    })
}; 
 const PostPelicula = async(req, res,next) => {
   Pelicula = req.body;
   console.log(Pelicula); 
   if(Object.keys(Pelicula).length === 5)
   {
      if(Pelicula.NombrePelicula && Pelicula.NombreDirector && Pelicula.Genero && Pelicula.Duracion && Pelicula.Descripcion )
         {
            const peliculaDB = new PeliculaDB({
               NombrePelicula: Pelicula.NombrePelicula , 
               NombreDirector: Pelicula.NombreDirector,
               Genero: Pelicula.Genero,
               Duracion:Pelicula.Duracion,
               Descripcion: Pelicula.Descripcion 
           });
           peliculaDB.save()
               .then(Peliculadb => {
                  res.status(200);
                  res.send(Peliculadb);
               });
         }
         else{
            
            res.status(400);
            res.send();
         }
   }
   else
   {
      res.status(400);
      res.send();
   }
};

const PutPelicula = async(req, res,next) => {
   
  Pelicula = req.body;
  PeliculaDB.find(  { NombrePelicula: req.params.pelicula })
  .then(peliculadb => {
      if(!peliculadb) {
          res.status(404);
          res.send();
      }
      if(Object.keys(Pelicula).length === 5)
      {
         if(Pelicula.NombrePelicula && Pelicula.NombreDirector && Pelicula.Genero && Pelicula.Duracion && Pelicula.Descripcion )
            {
               
               PeliculaDB.findOneAndUpdate(peliculadb, {
                  NombrePelicula: Pelicula.NombrePelicula,
                  NombreDirector: Pelicula.NombreDirector ,
                  Genero: Pelicula.Genero,
                  Duracion: Pelicula.Duracion,
                  Descripcion: Pelicula.Descripcion
         
               }, {new: true})
               .then(Peliculadb3 => {  
                   res.status(204);
               });
          
            }
      }
      else
      {
        res.status(404);
        res.send();
      }
  })
   
};
const DeletePelicula = async(req, res,next) => {

  PeliculaDB.find(  { NombrePelicula: req.params.pelicula })
  .then(peliculadb => {
      if(!peliculadb) {
          res.status(404);
          res.send();
      }                 
      PeliculaDB.findOneAndDelete(peliculadb)
      .then(Peliculadb3 => {  
            res.status(204);
            res.send();
      });
          
  })
   
};
module.exports = {
   getPelicula,
   getOnePelicula,
   Peliculas,
   PostPelicula,
   PutPelicula,
   DeletePelicula
 }
