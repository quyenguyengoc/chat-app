const { validationResult } = require('express-validator');

import userService from './../services/userService';
import { transMessages } from './../../locales/en';

let newUser = (req, res) => {
  return res.render('users/register', {
    result: req.flash('result')
  });
}

let insert = async (req, res) => {
  logger.info('Register>Validation>start');
  let userValidation = validationResult(req);
  let result = {
    flag: userValidation.isEmpty(),
    message: undefined,
    detail: {}
  };
  if (!result.flag) {
    logger.error('Register>Validation>fail');
    result.message = transMessages.register.failure;
    userValidation.array().forEach(error => {
      if (_.isUndefined(result['detail'][error.param])) { result['detail'][error.param] = []; }
      result['detail'][error.param].push(error.msg);
    });
  } else {
    logger.info('Register>Validation>success');
    try {
      let registerResult = await userService.register(req);
      logger.info('Register>insert>success');
      result.message = registerResult;
    } catch (error) {
      logger.error('Register>insert>fail');
      result.flag = false;
      result.message = error;
    }
  }
  req.flash('result', result);

  return res.redirect('/users/register');
}

let active = async (req, res) => {
  logger.info('Active>start');
  let token = req.params.token;
  let result = {
    flag: true,
    message: undefined,
    detail: {}
  };
  try {
    logger.info(`Active>start: ${token}`);
    await userService.active(token);
    result.message = transMessages.activation.success;
    logger.info(`Active>success: ${token}`);
  } catch(error) {
    result.message = transMessages.activation.failure;
    result.flag = false;
    logger.error(`Active>fail: ${token}, error: ${error}`);
  }
  req.flash('result', result);

  return res.redirect('/login');
}

export const userController = {
  newUser: newUser,
  insert: insert,
  active: active
};
