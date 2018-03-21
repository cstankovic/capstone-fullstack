
exports.up = function(knex, Promise) {
    return knex.schema.createTableIfNotExists('positions', function (table){
        table.increments('id').primary();
        table.string('name').notNullable();
        table.integer('maxPoints').notNullable();
    })
  };




exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('positions')
  };