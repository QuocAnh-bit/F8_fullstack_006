module.exports = {
  isPermission: (role, value) => {
    const result = role.permissions.find((role) => role.value === value);
    console.log(result);
    return result ? true : false;
  },
};
