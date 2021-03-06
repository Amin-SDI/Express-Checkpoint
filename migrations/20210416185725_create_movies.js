
exports.up = function(knex) {
  return knex.schema.createTable('movies', table =>{
      table.increments('id');
      table.string('title');
      table.integer('runtime');
      table.integer('release_year');
      table.string('director');
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('movies');
};
