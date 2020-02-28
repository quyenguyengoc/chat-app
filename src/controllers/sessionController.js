let login = (req, res) => {
  return res.render('session/login', {
    result: req.flash('result')
  });
}

export const sessionController = {
  login: login
};
