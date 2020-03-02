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
    detail: {},
    type: 'success'
  };

  if (!result.flag) {
    result.type = 'error';
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

let logout = (req, res) => {
  logger.info('Logout>start');
  let result = {
    flag: true,
    message: transMessages.logout.success(req.user.fullname),
    type: 'success'
  };
  req.logout();
  req.flash('result', result);
  logger.info('Logout>success');

  return res.redirect('/login')
}



export const sessionController = {
  login: login,
  authen: authen,
  logout: logout
};
