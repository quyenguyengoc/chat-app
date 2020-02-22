import bcrypt from 'bcrypt';
import uuid4 from 'uuid/v4';

import userModel from './../models/userModel';

let register = async (userInfo) => {
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
}

module.exports = {
  register: register
}
