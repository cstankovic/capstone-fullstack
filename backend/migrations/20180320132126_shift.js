
exports.up = function(knex, Promise) {
    return knex.schema.createTableIfNotExists('shift', function (table){
        table.increments('id').primary();
        table.string('name').notNullable();
        table.string('position').notNullable();
        table.string('points').notNullable();
        // table.integer('tipsEarned');
        // table.integer('tips paid');
    })
  };
  
  exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('shift')
  };