import bcrypt from 'bcrypt';
import uuid4 from 'uuid/v4';

import userModel from './../models/userModel';
import { userMailer } from './../mailers/userMailer';
import { transMessages } from './../../locales/en';

let register = (req) => {
  return new Promise(async (resolve, reject) => {
    logger.info('Register>insert>init>start');
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

    try {
      await userModel.insert(user);
      logger.info('Register>insert>success');
      let activeURL = `${req.protocol}://${req.get('host')}/users/active/${user['local']['verifyToken']}`;
      logger.info('Register>send-active-mail>start');
      await userMailer.sendActivationMail(user, activeURL);
      logger.info('Register>send-active-mail>success');
      resolve(transMessages.register.success);
    } catch (error) {
      logger.error(`Register>insert>init>fail: ${error}`);
      reject(transMessages.register.failure);
    }
  })
}

let active = (token) => {
  logger.info('Active>init');
  return new Promise(async (resolve, reject) => {
    logger.info('Active>check_token>start');
    let user = await userModel.find( { 'local.verifyToken': token, 'local.isActived': false } );
    if (_.isNull(user)) {
      logger.error('Active>check_token>fail');
      return reject(transMessages.activation.failure);
    }

    logger.info('Active>success');
    await userModel.active(token)
    resolve(transMessages.activation.success);
  });
}

let authen = (loginid, pwd) => {
  logger.info('Authentication>start');
  return new Promise(async (resolve, reject) => {
    logger.info(`Authentication>findLoginid: ${loginid}>start`);
    let condition = {
      $or: [ { 'username': loginid }, { 'local.email': loginid } ]
    }
    userModel.find(condition)
      .then(user => {
        logger.info(`Authentication>findLoginid: ${loginid}>success`);
        logger.info(`Authentication>authenticate: ${loginid}>start`);
        if (user.authenticate(pwd)) {
          if (user.local.isActived) {
            logger.info(`Authentication>authenticate: ${loginid}>success`);
            return resolve(user);
          }
          logger.error(`Authentication>authenticate: ${loginid}>fail`);
          return reject(transMessages.login.failure.notActived);
        }
        logger.error(`Authentication>authenticate: ${loginid}>fail`);
        reject(transMessages.login.failure.invalid);
      })
      .catch(error => {
        logger.error(`Authentication>findLoginid: ${loginid}>fail`);
        reject(error);
      });
  })
}

module.exports = {
  register: register,
  active: active,
  authen: authen
}
