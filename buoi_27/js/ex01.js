var productList = [
  { product_id: 1, product_name: "Sản Phẩm 1", product_price: 1000 },
  { product_id: 2, product_name: "Sản Phẩm 2", product_price: 2000 },
  { product_id: 3, product_name: "Sản Phẩm 3", product_price: 3000 },
  { product_id: 4, product_name: "Sản Phẩm 4", product_price: 4000 },
];

var productTable = document.querySelector("#product_table");

// Tạo thông tin sản phẩm
var generateProductList = function () {
  productList.forEach(function (element) {
    var addProduct = document.createElement("tr");
    addProduct.innerHTML = `
    <td>${element.product_id}</td>
    <td>${element.product_name}</td>
    <td>${element.product_price}</td>
    <td>
    <input type="number" id="quantity_${element.product_id}" value="1" style="width: 90%; display: block; margin: 0 auto;">
    <button type="button" style="width: 100%;" id="add_to_cart_${element.product_id}">Thêm vào giỏ</button>
    </td>
    `;
    productTable.append(addProduct);
  });
};
generateProductList();

var btnListAdd = productTable.querySelectorAll("button");
var carts = localStorage.getItem("carts")
  ? JSON.parse(localStorage.getItem("carts"))
  : [];
var saveLocalStorage = function () {
  localStorage.setItem("carts", JSON.stringify(carts));
};
var addToCast = function () {
  btnListAdd.forEach(function (btn) {
    btn.addEventListener("click", function () {
      var inputAdd = this.parentElement.querySelector("input");
      var quantityId = inputAdd.id;
      var productId = quantityId.replace("quantity_", "");

      productId = parseInt(productId);

      var quantityValue = inputAdd.value;

      if (quantityValue < 1) {
        return alert("Vui lòng nhập lại số lượng sản phẩm");
      }
      if (carts.length == 0) {
        var cartOject = {
          product_id: productId,
          quantity: quantityValue,
        };
        carts.push(cartOject);
        console.log(carts);
      } else {
        var check = false;
        carts.forEach(function (cartElement, cartIndex) {
          if (productId == cartIndex.product_id) {
            var currentQuantity = parseInt(cartElement.quantity);
            currentQuantity += parseInt(quantityValue);
            carts[cartIndex] = {
              product_id: productId,
              quantity: currentQuantity,
            };
            check = true;
          }
        });

        if (check == false) {
          var cartsOject = {
            product_id: productId,
            quantity: currentQuantity,
          };
          carts.push(cartsOject);
        }
      }
      saveLocalStorage();
      renderCart();
    });
  });
};
addToCast();

function get_product(id) {
  var result;
  productList.forEach(function (data) {
    if (data.product_id == id) {
      result = data;
    }
  });
  return result;
}
var cartData = document.querySelector("#cart_data");
var renderCart = function () {
  if (carts.length === 0) {
    return (cartData.innerText = `Giỏ hàng Trống`);
  }
  var headerCart = `
  <table cellpadding="0" cellspacing="0" width="100%" border="1" id="cart_table">
  <thead>
      <tr>
          <th width="5%">STT</th>
          <th>Tên sản phẩm</th>
          <th width="20%">Giá</th>
          <th width="20%">Số lượng</th>
          <th width="20%">Thành tiền</th>
          <th width="5%">Xoá</th>
      </tr>
     
  </thead>
  </table>`;
  cartData.innerHTML = headerCart;
  var count = 0;
  var totalQuantity = 0;
  var totalAmount = 0;
  carts.forEach(function (cart) {
    var productItem = get_product(cart.product_id);
    count++;
    var amount = parseInt(productItem.product_price) * parseInt(cart.quantity);
    totalAmount += parseInt(amount);
    totalQuantity += parseInt(cart.quantity);
    var tr_html = `<tbody><tr>
    <td>${count}</td>
    <td>${productItem.product_name}</td>
    <td>${productItem.product_price}</td>
    <td><input type="number" class="quantity" data-id="${cart.productId}" value="${cart.quantity}"></td>
    <td>${amount}</td>
    <td><button type="button" class="delete-item">Xoá</button></td>
</tr></tbody>`;
    var cartTable = document.querySelector("#cart_table");
    cartTable.innerHTML += tr_html;
  });
};
renderCart();
// localStorage.clear();
// var generateCartList = function () {
//   var cartList = document.querySelector("#cart_data");
//   if (carts.length === 0) {
//     console.log(carts.length);
//   }
// };
// generateCartList();
