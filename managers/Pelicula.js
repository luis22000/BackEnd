var express = require('express');
var router = express.Router();
let Peliculas = require('./data');
const body_parser = require('body-parser');
router.use(body_parser.json());
const PeliculaDB = require('../model/model.pelicula');
var redis = require('redis');
const config = require('config');
var config2 = config.get('Customer.redisConf');
var client = redis.createClient(config2);
var KeyPelicula = "getPelicula";

const getPelicula = async(req, res,next) =>{
   client.exists(KeyPelicula, function(err, reply) 
   {
      if (reply === 1) {

         

         client.get(KeyPelicula, function(error,Rpelicula){

         res.status(200).json(JSON.parse(Rpelicula));

         })

      }
      else
      {
            PeliculaDB.find()
            .then(peliculadb => {
               client.set(KeyPelicula,JSON.stringify(peliculadb));
              client.expire(KeyPelicula,30);
               res.status(200);
               res.json(peliculadb);
            }); 
      }
})
   
};


const getOnePelicula = async(req, res,next) => {
   PeliculaDB.find(  { NombrePelicula: req.params.pelicula })
    .then(peliculadb  => {
       
        if(!peliculadb[0]) 
        {
            res.status(404);
            res.send();
            return;
        }
        res.status(200);
        res.json(peliculadb);
    })
}; 
 const PostPelicula = async(req, res,next) => {
   Pelicula = req.body;
   
   if(Object.keys(Pelicula).length === 5)
   {
      if(Pelicula.NombrePelicula && Pelicula.NombreDirector && Pelicula.Genero && Pelicula.Duracion && Pelicula.Descripcion )
         {
            
            PeliculaDB.find(  { NombrePelicula: Pelicula.NombrePelicula })
               .then(peliculadb2 => {
                  console.log(peliculadb2[0]);
                  if(peliculadb2[0]) {
                        res.status(202);
                        res.send();
                  }
                  else
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
  console.log(Pelicula);
  PeliculaDB.find(  { NombrePelicula: req.params.pelicula })
  .then(peliculadb => {
      if(!peliculadb[0]) {
          res.status(202);
          res.send();
      }
      if(Object.keys(Pelicula).length === 5)
      {
         if(Pelicula.NombrePelicula && Pelicula.NombreDirector && Pelicula.Genero && Pelicula.Duracion && Pelicula.Descripcion )
            {
               
               PeliculaDB.findByIdAndUpdate(peliculadb, {
                  NombrePelicula: Pelicula.NombrePelicula,
                  NombreDirector: Pelicula.NombreDirector ,
                  Genero: Pelicula.Genero,
                  Duracion: Pelicula.Duracion,
                  Descripcion: Pelicula.Descripcion
         
               }, {new: true})
               .then(Peliculadb3 => {  
                  
                   res.status(204);
                   res.send();
                   return;
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
