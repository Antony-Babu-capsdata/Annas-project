// config/knex.js
const knex = require('knex');

let knexInstance = null;

module.exports = {
  initialize(config) {

    if (!knexInstance) {
      knexInstance = knex({
        client: 'mysql2', // Changed from 'mysql' to 'mysql2' (recommended)
        connection: {
          host: config.datastores.default.host,
          user: config.datastores.default.user,
          password: config.datastores.default.password,
          database: config.datastores.default.database
        },

        pool: {
          min: 2,
          max: 10
        }
      });
    }
    return knexInstance;
    // // config/knex.js
    // const knex = require('knex')({
    //   client: 'mysql',
    //   connection: {
    //     host: 'localhost',
    //     user: 'root',
    //     password: 'Annasathish123',
    //     database: 'myfruits'
    //   }
    // });

    // module.exports = knex;

  }
};
