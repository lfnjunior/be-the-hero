npx knex migrate:make create_ongs
npx knex migrate:latest

npx knex migrate:make create_incidents
npx knex migrate:latest

npx knex migrate:rollback

npx knex migrate:status