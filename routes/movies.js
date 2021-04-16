const { query } = require('express');
var express = require('express');
var router = express.Router();
var movies = require('../data/mockDB.json');
const PORT = process.env.PORT || 3000;
const knex = require('knex')(require('../knexfile.js')[process.env.NODE_ENV]);


router.get('/', (req, res, next) => {
  if(req.query.title){
    knex
    .from('movies')
    .select('*')
    .where('title', 'ilike', `%${req.query.title}%`)   
    .then(data => {
      if(!data[0].id){
        throw new Error
      }
      res.status(200).json(data)
    })
    .catch(err =>
      res.status(404).json({
        message: 'The data you are looking for could not be found. Please try again'
      }))
  }
  else{
    knex
    .select('*')
    .from('movies')
    .then(data => {
      if(!data[0].id){
        throw new Error
      }
      res.status(200).json(data)
    })
    .catch(err =>
      res.status(404).json({
        message: 'The data you are looking for could not be found. Please try again'
      }))
  }
});

//REFACTOR TO KNEX SYNYAX ONCE WE IMPLEMENT THE DB
  /* SQL QUERY
  SELECT * FROM MOVIES
  WHERE ID='PARAMS ID"
  */
router.get('/:id', (req, res, next) =>{
  const movieId = parseInt(req.params.id);
  
  knex
    .select('*')
    .from('movies')
    .where({id: movieId})
    .then(data => {
      if(!data[0].id){
        throw new Error
      }
      res.status(200).json(data)
    })
    .catch(err =>
      res.status(404).json({
        message: 'The data you are looking for could not be found. Please try again'
      }))
  })
  

router.post('/', (req, res, next) => {
  const newMovie = req.body;
  knex('movies')
  .insert(newMovie)
  .then((data)=> res.status(200).json(newMovie))
})

router.delete('/:id', (req, res, next) => {
  const movieId = parseInt(req.params.id);
  knex('movies')
  .where({id: 7})
  .del()
  .then((data)=> res.status(200).json(`Movie ${movieId} has been deleted.`))
})

module.exports = router;



