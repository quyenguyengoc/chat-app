let getHome = (req, res) => {
  return res.render('main/home', {
    result: req.flash('result')
  });
}

export const homeController = {
  getHome: getHome
};
