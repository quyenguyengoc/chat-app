let getHome = (req, res) => {
  return res.render('main/home');
}

export const homeController = {
  getHome: getHome
};
