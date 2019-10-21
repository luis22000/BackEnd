var express = require('express');
var express = require('express');
var router = express.Router();
const { getPelicula,getOnePelicula,PostPelicula} = require('../managers/Pelicula')
const body_parser = require('body-parser');
router.use(body_parser.json());

/* GET users listing. */
router.get('/', getPelicula);
router.get('/:pelicula', getOnePelicula);
router.post('/', PostPelicula);
module.exports = router;
