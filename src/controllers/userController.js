const { validationResult } = require('express-validator');

import userService from './../services/userService';
import { transMessages } from './../../locales/en';

let newUser = (req, res) => {
  return res.render('users/register', {
    result: req.flash('result')
  });
}

let insert = async (req, res) => {
  let userValidation = validationResult(req);
  let result = {
    flag: userValidation.isEmpty(),
    message: '',
    detail: {}
  };
  if (!result.flag) {
    result.message = transMessages.register.failure;
    userValidation.array().forEach(error => {
      if (_.isUndefined(result['detail'][error.param])) { result['detail'][error.param] = []; }
      result['detail'][error.param].push(error.msg);
    });
  } else {
    try {
      let registerResult = await userService.register(req);
      result.message = registerResult;
    } catch (error) {
      result.flag = false;
      result.message = error;
    }
  }
  req.flash('result', result);

  return res.redirect('/users/register');
}

let active = async (req, res) => {
  let result;
  try {
    console.log(`Active with token ${req.params.token}`);
    result = await userService.active(req.params.token);
    console.log(`Active with token successfully: ${req.params.token}`);
  } catch(error) {
    result = error;
    console.log(`Active fail with token: ${req.params.token}, reason: ${result}`);
  }
  req.flash('result', result);

  return res.redirect('/login');
}

export const userController = {
  newUser: newUser,
  insert: insert,
  active: active
};
