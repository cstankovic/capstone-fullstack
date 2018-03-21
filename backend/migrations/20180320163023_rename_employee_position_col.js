
exports.up = function(knex, Promise) {
    return knex.schema.table('employees', function (table){
        table.renameColumn('positions_id', 'position_id')
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.table('employees', function (table){
        table.renameColumn('position_id', 'positions_id')
    })
};
