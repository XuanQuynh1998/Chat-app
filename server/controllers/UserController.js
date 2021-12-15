import User from "../models/User.js";
import passport from "passport";

class UserController {
  register(req, res, next) {
    try {
      const { email, username, password, retypePassword } = req.body;
      const mailFormat =
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (!username) {
        return res.json({ success: false, errorCode: 1 });
      }
      if (!mailFormat.test(email)) {
        return res.json({ success: false, errorCode: 2 });
      }
      if (!password) {
        return res.json({ success: false, errorCode: 3 });
      }
      if (password.length < 8) {
        return res.json({ success: false, errorCode: 4 });
      }
      if (retypePassword !== password) {
        return res.json({ success: false, errorCode: 5 });
      }

      User.findOne({ $or: [{ username: username }, { email: email }] }, (err, user) => {
        if (err) {
          return res.json({ success: false, err });
        }
        if (user) {
          return res.json({ success: false, errorCode: 6 });
        }

        User.register(
          new User({ username: username, email: email }),
          password,
          async (err, user) => {
            if (err) {
              return res.json({ success: false, err });
            }
            return res.json({ success: true, message: "Registered successfully" });
          }
        );
      });
    } catch (err) {
      console.log(err);
    }
  }

  async login(req, res, next) {
    try {
      const { username, password } = req.body;

      if (!username) {
        return res.json({ success: false, errorCode: 7 });
      }
      if (!password) {
        return res.json({ success: false, errorCode: 8 });
      }

      passport.authenticate("local", (err, user) => {
        if (err) {
          return res.json({ success: false, err });
        }
        if (!user) {
          return res.json({ success: false, errorCode: 9 });
        }
        return req.logIn(user, async (err) => {
          if (err) {
            return res.json({ success: false, err });
          } else {
            const userInfo = await User.findOne({ username: req.user.username });
            return res.json({
              authenticate: true,
              message: "Login successful",
              userInfo: userInfo,
            });
          }
        });
      })(req, res, next);
    } catch (err) {
      console.log(err);
    }
  }

  async checkLogin(req, res, next) {
    try {
      if (req.user) {
        const userInfo = await User.findOne({ username: req.user.username });
        return res.json({ authenticate: true, userInfo: userInfo });
      }
      return res.json({ authenticate: false });
    } catch (err) {
      console.log(err);
    }
  }

  async getUserInfo(req, res, next) {
    try {
      if (req.user) {
        const userInfo = await User.findOne({ username: req.user.username });
        return res.status(200).json(userInfo);
      }
      res.status(200);
      return res.json({});
    } catch (err) {
      console.log(err);
    }
  }

  logout(req, res, next) {
    req.logOut();
    req.session.destroy((err) => {
      if (err) {
        return res.json(err);
      }
      res.clearCookie("connect.sid");
      res.clearCookie("io");
      return res.json({ authenticate: false, success: true });
    });
  }
}

export default new UserController();
