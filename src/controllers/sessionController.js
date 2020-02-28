const { validationResult } = require('express-validator');
import passport from 'passport';

import { transMessages } from '../../locales/en';

let login = (req, res) => {
  return res.render('session/login', {
    result: req.flash('result')
  });
}

let authen = (req, res) => {
  logger.info('Login>Validation>start');
  let authenValidation = validationResult(req);
  let result = {
    flag: authenValidation.isEmpty(),
    message: undefined,
    detail: {}
  };

  if (!result.flag) {
    logger.error('Login>Validation>error');
    result.message = transMessages.common.blank;
    _.forEach(authenValidation.array(), (error) => {
      if (_.isUndefined(result['detail'][error.param])) { result['detail'][error.param] = []; };
      result['detail'][error.param].push(error.msg);
    });
    req.flash('result', result);
    
    return res.redirect('/login')
  } else {
    logger.info('Login>Validation>success')
    passport.authenticate('local', {
      successRedirect: '/',
      failureRedirect: '/login',
      failureFlash: true,
      successFlash: true
    })(req, res);
  }
}

export const sessionController = {
  login: login,
  authen: authen
};
