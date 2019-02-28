module.exports = {
  test: {
    client: 'mysql2',
    connection: {
      host: 'localhost',
      user: 'root',
      database: 'hrr'
    },
    migrations: {
      directory: __dirname + '/db/migrations'
    },
    seeds: {
      directory: __dirname + '/db/seeds/development'
    }
  },
  development: {
    client: 'mysql2',
    connection: {
      host: 'localhost',
      user: 'root',
      database: 'hrr'
    },
    pool: { min: 0, max: 101 },
    migrations: {
      directory: __dirname + '/db/migrations'
    },
    seeds: {
      directory: __dirname + '/db/seeds/development'
    }
  }
}