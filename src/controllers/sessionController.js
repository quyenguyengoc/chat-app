let login = (req, res) => {
  return res.render('session/login');
}

export const sessionController = {
  login: login
};
