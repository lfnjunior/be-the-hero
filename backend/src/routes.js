const express = require('express');

const ong = require('./controllers/ong-controller');
const incident = require('./controllers/incident-controller');
const profile = require('./controllers/profile-controller');
const session = require('./controllers/session-controller');

const routes = express.Router();

routes.post('/session', session.login);

routes.get('/ong', ong.list);
routes.post('/ong', ong.create);

routes.get('/profile', profile.list);

routes.get('/incident', incident.list);
routes.post('/incident', incident.create);
routes.delete('/incident/:id', incident.delete);

module.exports = routes;