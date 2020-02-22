const { check } = require('express-validator');

import { transModels } from './../../locales/en';
import userModel from './../models/userModel';

let userValidation = [
  check('fullname', transModels.users.validation.fullname.blank)
    .not().isEmpty()
    .trim(),
  check('username').not().isEmpty().withMessage(transModels.users.validation.username.blank).trim()
  .custom((value) => {
    userModel.find( { username: value } )
      .then(user => {
        return _.isUndefined(user);
      })
  }).withMessage(transModels.users.validation.username.uniq),
  check('email')
    .not().isEmpty().withMessage(transModels.users.validation.local.email.blank).trim()
    .isEmail().withMessage(transModels.users.validation.local.email.incorrect)
    .custom((value) => {
      userModel.find( { local: { email: value } } )
        .then(user => {
          return _.isUndefined(user);
        })
    }).withMessage(transModels.users.validation.local.email.uniq),
  check('pwd')
    .not().isEmpty().withMessage(transModels.users.validation.password.blank).trim()
    .matches(/^.*(?=.{6,})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/).withMessage(transModels.users.validation.password.incorrect),
  check('pwdConfirm', transModels.users.validation.passwordConfirmation.notMatch)
    .custom((value, { req } ) => {
      return _.isEmpty(req.body.pwd) || value === req.body.pwd;
    })
];

module.exports = {
  userValidation: userValidation
}
