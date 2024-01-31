const GithubStrategy = require("passport-github2").Strategy;
const passport = require("passport");
const { User, Provider } = require("../models/index");
const { Op } = require("sequelize");

module.exports = new GithubStrategy(
  {
    clientID: "0bf7c13a316ad2539e09",
    clientSecret: "9cfcb030f8b155a165188a7447ca8ac1245e2b01",
    callbackURL: "https://auth-passport.vercel.app/api/auth/github/callback",
    scope: ["profile", "email"],
  },
  async (accessToken, refreshToken, profile, cb) => {
    //logic lấy thông tin user từ db
    console.log(profile);
    const [provider, created] = await Provider.findOrCreate({
      where: { name: profile.provider },
      defaults: {
        name: profile.provider,
      },
    });

    const [user, createUser] = await User.findOrCreate({
      where: {
        [Op.and]: [
          { email: profile.emails[0].value },
          { provider_id: provider.id },
        ],
      },
      defaults: {
        name: profile.displayName,
        password: null,
        email: profile.emails[0].value,
        provider_id: provider.id,
        avatar: profile.photos[0].value,
        access_token: accessToken,
      },
    });
    user.update({ access_token: accessToken });
    cb(null, user);
  }
);
