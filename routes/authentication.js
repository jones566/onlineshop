import Security from "../models/securityModel.js";
const loginRouter = (req, res) => {
  res.render("login");
};

const registerRouter = (req, res) => {
  res.render("register");
};

const registerAuthRouter = (req, res) => {
  Security.register(
    { username: req.body.username },
    req.body.password,
    (err, user) => {
      if (err) {
        console.log(err);
        res.redirect("/register");
      } else {
        passport.authenticate("local")(req, res, () => {
          res.redirect("/add_news_blog");
        });
      }
    }
  );
};

const loginAuthRouter = (req, res) => {
  const user = new Security({
    username: req.body.username,
    password: req.body.password,
  });

  req.login(user, (err) => {
    if (err) {
      console.log(err);
    } else {
      passport.authenticate("local")(req, res, () => {
        res.redirect("/add_news_blog");
      });
    }
  });
};

const logoutRouter = (req, res) => {
  req.logout((err) => {
    if (!err) {
      res.redirect("/login");
    }
  });
};

export {
  loginRouter as default,
  registerRouter,
  registerAuthRouter,
  loginAuthRouter,
  logoutRouter,
};
