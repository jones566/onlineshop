
 const loginRouter = (req, res) => {
  res.render("login");
};

const registerRouter = (req, res) => {
  res.render("register");
};

const addUserRouter = (req, res) => {
  res.render("admin/adduser");
};
export default loginRouter;
export {registerRouter, addUserRouter};
  

