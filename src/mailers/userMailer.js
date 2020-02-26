import nodeMailer from 'nodemailer';
import ejs from 'ejs';
require('dotenv').config();

import { transMailers } from './../../locales/en';

const ENV = process.env;

let EMAIL_ADDR = ENV.EMAIL_ADDR;
let EMAIL_PWD = ENV.EMAIL_PWD;
let MAIL_HOST = ENV.MAIL_HOST;
let MAIL_PORT = ENV.MAIL_PORT;
let MAIL_SSL = ENV.MAIL_SSL;

let sendActivationMail = async (user, activeURL) => {
  let transporter = nodeMailer.createTransport({
    host: MAIL_HOST,
    port: MAIL_PORT,
    secure: MAIL_SSL == 'true',
    auth: {
      user: EMAIL_ADDR,
      pass: EMAIL_PWD
    }
  });

  let options = {
    from: EMAIL_ADDR,
    to: user.local.email,
    subject: transMailers.activation.subject,
  };

  options['html'] = await ejs.renderFile('src/views/mailers/userMailer/activationMailer.ejs', { user: user, activeURL: activeURL });

  return transporter.sendMail(options);
};

export const userMailer = {
  sendActivationMail: sendActivationMail
};
