const GoogleStrategy = require("passport-google-oauth2").Strategy;
const { User, Provider } = require("../models/index");
const { Op } = require("sequelize");

module.exports = new GoogleStrategy(
  {
    clientID:
      "925806848349-nrhhvv0mqfpfevojm63q9hc343njtiqv.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL: "https://auth-passport.vercel.app/auth/google/callback",
    scope: ["profile", "email"],
    state: true,
  },
  async (accessToken, refreshToken, profile, cb) => {
    //logic lấy thông tin user từ db
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
      },
    });
    cb(null, user);
  }
);
