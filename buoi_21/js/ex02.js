Object.prototype.getField = function (key) {
  if (typeof key === "string") {
    var value = this[key];
    var valueSub = Object.values(value);
    console.log(valueSub[0]);
  }
};
function getError(field) {
  return errors.getField(field);
}

var errors = {
  name: {
    required: "Vui lòng nhập họ tên",
    min: "Họ tên phải từ 5 ký tự",
  },
  email: {
    email: "Định dạng email không hợp lệ",
    unique: "Email đã có người sử dụng",
    required: "Vui lòng nhập địa chỉ email",
  },
  password: {
    required: "Vui lòng nhập mật khẩu",
    same: "Mật khẩu phải khớp với mật khẩu nhập lại",
  },
};
getError("name");
getError("email");
getError("password");
//  Bai 2 :
function Customers(name, age, address) {
  this.name = name;
  this.age = age;
  this.address = address;
}
var customers = [
  new Customers("Nguyễn Văn A", 11, "Ha noi"),
  new Customers("Nguyễn Văn B", 2, "Hai Phong"),
  new Customers("Nguyễn Văn C", 12, "TP.HCM"),
];
console.log(customers);

function createCustomers(customers) {
  var newArr = customers
    .map(function (customer) {
      var subArr = new Customers(
        `${customer.name}`,
        customer.age,
        `${customer.address}`
      );
      subArr["shotName"] =
        customer["name"].slice(0, customer["name"].indexOf(" ")) +
        " " +
        customer["name"].slice(customer["name"].lastIndexOf(" ") + 1);
      return subArr;
    })
    .sort(function (a, b) {
      return a.age - b.age;
    });
  return newArr;
}
var result = createCustomers(customers);
console.log(result);
// Bài 3 :
function User(name, password, email) {
  this.name = name;
  this.password = password;
  this.email = email;
}
var data = [];
function handelRegister(name, password, email) {
  if (!name || !password || !email) {
    return console.log("Xin hãy nhập đủ thông tin");
  }
  if (Object.values(password).length < 6) {
    return console.log("Mật khẩu tối thiểu 6 kí tự");
  }
  var newData = new User(name, password, email);
  newData.role = "user";
  data.push(newData);
  return data;
}
var dataRegister = handelRegister(
  "Nguyen Van A",
  "123456",
  "nguyenvana@email.com"
);
var dataRegister = handelRegister(
  "Nguyen Van B",
  "123456",
  "nguyenvanb@email.com"
);
function handleLogin(email, password) {
  for (var element of data) {
    if (element["email"] === email && element["password"] === password)
      return element;
  }

  return "thông tin đăng nhập không hợp lệ";
}
console.log(data);
console.log(handleLogin("nguyenvana@email.com", "123456"));
console.log(handleLogin("nguyenvana@email.com", "12345678"));
