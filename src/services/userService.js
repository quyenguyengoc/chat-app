import bcrypt from 'bcrypt';
import uuid4 from 'uuid/v4';

import userModel from './../models/userModel';
import { userMailer } from './../mailers/userMailer';
import { transMessages } from './../../locales/en';

let register = (req) => {
  return new Promise(async (resolve, reject) => {
    let userInfo = req.body;
    let user = {
      username: userInfo['username'],
      fullname: userInfo['fullname'],
      local: {
        email: userInfo['email'],
        password: bcrypt.hashSync(userInfo['pwd'], bcrypt.genSaltSync(10)),
        verifyToken: uuid4()
      }
    };

    await userModel.insert(user);
    let activeURL = `${req.protocol}://${req.get('host')}/users/active/${user['local']['verifyToken']}`;
    userMailer.sendActivationMail(user, activeURL)
      .then(result => {
        resolve(transMessages.register.success);
      })
      .catch(error => {
        reject(transMessages.register.failure);
      });
  })
}

let active = (token) => {
  return new Promise(async (resolve, reject) => {
    let user = await userModel.find( { 'local.verifyToken': token, 'local.isActived': false } );
    if (_.isNull(user)) {
      return reject(transMessages.activation.failure);
    } else {
      await userModel.active(token)
      resolve(transMessages.activation.success);
    }
  });
}

module.exports = {
  register: register,
  active: active
}
