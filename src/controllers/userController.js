const { validationResult } = require('express-validator');

import userService from './../services/userService';
import { messages } from './../../locales/en';

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
    result.message = messages.register.failure;
    userValidation.array().forEach(error => {
      if (_.isUndefined(result['detail'][error.param])) { result['detail'][error.param] = []; }
      result['detail'][error.param].push(error.msg);
    });
  } else {
    try {
      result.message = messages.register.success;
      await userService.register(req.body);
    } catch (error) {
      result = {
        flag: false,
        message: messages.register.failure,
        detail: error
      }
    }
  }
  req.flash('result', result);

  return res.redirect('/register');
}

export const userController = {
  newUser: newUser,
  insert: insert
};
