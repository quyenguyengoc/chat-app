import session from 'express-session';
import connectMongo from 'connect-mongo';

let mongoStore = connectMongo(session);

let ENV = process.env;
let sessionStore = new mongoStore( {
  url: `${ENV.DB_CONN}://${ENV.DB_HOST}:${ENV.DB_PORT}/${ENV.DB_NAME}`,
  autoReconnect: true
} );

let configSession = (app) => {
  app.use(session( {
    key: 'express.sid',
    secret: 'mysecret',
    store: sessionStore,
    resave: true,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 // ms * s * m * h
    }
  } ))
};

module.exports = configSession;
