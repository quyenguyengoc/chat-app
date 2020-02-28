const { check } = require('express-validator');

import { transMessages } from './../../locales/en';

let authenValidation = [
  check('loginid', transMessages.login.validation.loginid.blank)
    .notEmpty().trim(),
  check('pwd', transMessages.login.validation.pwd.blank)
    .notEmpty().trim()
];

module.exports = {
  authenValidation: authenValidation
}
