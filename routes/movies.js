var express = require('express');
var router = express.Router();
var movies = require('../data/mockDB.json')


/* GET users listing. */
router.get('/', function(req, res, next) {
  //req.query is an object
  if(req.query){
    if(req.query.title){
      return searchTitle(req, res)
    }else{
      res.status(400).send('Invalid titleQuery supplied')
    }
  }
  res.status(200).json(movies)
});

/*Search handler*/
function searchTitle(req, res) {
 let searchByTitle = []
 
 //REFACTOR TO KNEX SYNTAX ONCE WE IMPLEMENT THE DB
  /* SQL QUERY
  SELECT * FROM MOVIES
  WHERE title='QUERY TITLE"
  */
  movies.forEach(element =>{
    
    if(element.title.toLowerCase().includes(req.query.title.toLowerCase())){
      searchByTitle.push(element)
    }
  })
  // error handle for no results
  if(searchByTitle.length == 0){
    res.status(404).send('Your query string returned no results.')
  }
  //if the search yielded results
  res.status(200).json(searchByTitle)
}

//REFACTOR TO KNEX SYNYAX ONCE WE IMPLEMENT THE DB
  /* SQL QUERY
  SELECT * FROM MOVIES
  WHERE ID='PARAMS ID"
  */
router.get('/:id', (req, res, next) =>{
  const movieId = req.params.id;
  
  
  if(isNaN(Number(movieId)) === true){
    res.status(400).send('Invalid ID type');
  }

  const foundMovie = movies.find(movie => movie.id === parseInt(movieId));
  if(!foundMovie){
    res.status(404).send(`No movie with ID of ${req.params.id} found`)
  }
  res.status(200).json(foundMovie);
  
});

router.post('/', (req, res, next) => {
  const newMovie = req.body;
  res.status(200).json(newMovie)
})

module.exports = router;



