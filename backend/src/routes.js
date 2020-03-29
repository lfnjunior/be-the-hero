const express = require('express');

const { celebrate, Segments, Joi } = require('celebrate');

const ong = require('./controllers/ong-controller');
const incident = require('./controllers/incident-controller');
const profile = require('./controllers/profile-controller');
const session = require('./controllers/session-controller');

const routes = express.Router();

routes.post('/session', celebrate({
  [Segments.BODY]: Joi.object().keys({
    id: Joi.string().required()
  }) 
}), session.login);

routes.get('/ong', ong.list);
routes.post('/ong', celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().required().email(), 
    whatsapp: Joi.string().trim().regex(RegExp(/^[0-9]{10,11}$/)).required(), 
    city: Joi.string().required(), 
    uf: Joi.string().required().length(2),
  }) 
}), ong.create);

routes.get('/profile', celebrate({
  [Segments.HEADERS]: Joi.object({
    authorization: Joi.string().required()
  }).unknown() 
}) ,profile.list);

routes.get('/incident', celebrate({
  [Segments.QUERY]: Joi.object().keys({
    page: Joi.number()
  }) 
}), incident.list);

routes.post('/incident',  celebrate({
  [Segments.BODY]: Joi.object().keys({
    title: Joi.string().required(),
    description: Joi.string().required(), 
    value: Joi.number().required()
  }),
  [Segments.HEADERS]: Joi.object({
    authorization: Joi.string().required()
  }).unknown() 
}), incident.create);

routes.delete('/incident/:id',  celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.number().required()
  }),
  [Segments.HEADERS]: Joi.object({
    authorization: Joi.string().required()
  }).unknown()  
}), incident.delete);

module.exports = routes;