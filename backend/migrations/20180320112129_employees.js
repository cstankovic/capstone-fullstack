exports.up = function(knex, Promise) {
    return knex.schema.createTableIfNotExists('employees', function (table){
        table.increments('id').primary();
        table.string('name').notNullable();
        table.integer('position_id').notNullable();
    })
  };
  
  exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('employees')
  };