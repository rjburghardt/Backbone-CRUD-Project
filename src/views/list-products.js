var $ = require('jquery');
var Backbone = require('backbone');
var listProductsTmpl = require('../templates/list-products.hbs')


//App
var App = require('../app');

//view for list-products
var ListProducts = Backbone.View.extend({
  el: $('main'),

  collection: App.Collections.products,

  render: function () {
    var _this = this;
    var productCollection = this.collection;
    console.log(App.Collections.products);

    //Get the products from the server
    productCollection.fetch().done(function (products) {
      _this.$el.html(listProductsTmpl(products))
    });
  }
});

module.exports = ListProducts;