// Update with your config settings.

module.exports = {

  development: {
    client: 'postgresql',
    connection: {
      host : '',
      user : 'postgres',
      password : '',
      database : 'be_the_hero'
    },
    migrations: {
      directory: './src/database/migrations'
    }
  },

  test: {
    client: 'sqlite3',
    connection: {
      filename : './src/database/test.sqlite',
    },
    migrations: {
      directory: './src/database/migrations'
    },
    useNullAsDefault: true
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
