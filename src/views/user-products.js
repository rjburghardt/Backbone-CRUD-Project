var $ = require('jquery');
var Backbone = require('backbone');
var listProductsTmpl = require('../templates/list-products.hbs')


//App
var App = require('../app');

//view for list-products
var ListUserProducts = Backbone.View.extend({
  el: $('main'),

  collection: App.Collections.products,

  render: function (userId) {
    var _this = this;
    var productCollection = this.collection;
    console.log(App.Collections.products);

    //Get the products from the server
    productCollection.fetch().done(function (products) {
      var productArr = [];
      products.forEach(function (product) {
        if(parseInt(userId) === product.userId) {
          productArr.push(product)
          console.log(productArr)
        } else {
          console.log('fail')
        }
      })
      _this.$el.html(listProductsTmpl(productArr))
    });
  }
});

module.exports = ListUserProducts;