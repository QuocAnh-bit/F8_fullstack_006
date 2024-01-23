module.exports = {
  isRole: (user, roleId) => {
    const result = user.roles.find((user) => +user.id === +roleId);
    console.log(result);
    return result ? true : false;
  },
};
