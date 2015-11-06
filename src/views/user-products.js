var $ = require('jquery');
var Backbone = require('backbone');
var listProductsTmpl = require('../templates/user-products.hbs')


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
      products.forEach(function (product) {
        console.log(product.userId)
        console.log(userId)
        console.log(typeof userId)
        if(parseInt(userId) === product.userId) {
          _this.$el.html(listProductsTmpl(product))
          console.log(product)
        } else {
          console.log('fail')
        }
      })
    });
  }
});

module.exports = ListUserProducts;