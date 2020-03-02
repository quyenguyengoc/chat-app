import { transMessages } from "../../locales/en";

export const loggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    let result = {
      flag: true,
      message: transMessages.common.loggedIn,
      type: 'warning'
    }
    req.flash('result', result);

    return res.redirect('/');
  }
  next();
}
export const notLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }

  let result = {
    flag: true,
    message: transMessages.common.requireLogin,
    type: 'error'
  }
  req.flash('result', result);
  res.redirect('/login');
}
