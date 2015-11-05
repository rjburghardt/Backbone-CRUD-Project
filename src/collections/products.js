var Backbone = require('backbone');

/****************************************
  App
*****************************************/

var App = require('../app');
var Product = require('../models/product');

/****************************************
  Collection: User
*****************************************/

var ProductCollection = Backbone.Collection.extend({
  url: App.Settings.apiRoot + '/products',
  model: Product
});


App.Collections.products = new ProductCollection;

module.exports = App.Collections.products;
