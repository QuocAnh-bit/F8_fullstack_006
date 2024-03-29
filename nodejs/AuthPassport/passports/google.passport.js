const GoogleStrategy = require("passport-google-oauth2").Strategy;
const { User, Provider } = require("../models/index");
const { Op } = require("sequelize");

module.exports = new GoogleStrategy(
  {
    clientID:
      "925806848349-ne5kthn12if8jtler80pfd3dp05fuplg.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL: "https://auth-passport.vercel.app/google/callback",
    scope: ["profile", "email"],
    state: true,
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
        [Op.and]: [{ email: profile.email }, { provider_id: provider.id }],
      },
      defaults: {
        name: profile.displayName,
        password: null,
        email: profile.email,
        provider_id: provider.id,
        avatar: profile.photos[0].value,
        access_token: accessToken,
      },
    });
    user.update({ access_token: accessToken });
    cb(null, user);
  }
);
