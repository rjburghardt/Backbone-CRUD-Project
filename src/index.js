var Backbone = require('backbone');

// App
var App = require('./app');
var userCollection = require('./collections/user');
var productsCollection = require('./collections/products');

// View: User Form
var UserFormView = require('./views/user-form');
App.Views.UserForm = new UserFormView;

// View: List Users
var ListUsersView = require('./views/list-users');
App.Views.ListUsers  = new ListUsersView;

//View: Product Form
var ProductFormView = require('./views/product-form');
App.Views.ProductForm = new ProductFormView;

//View: Product List
var ListProducts = require('./views/list-products');
App.Views.ProductList = new ListProducts;

//View: User-Product List
var ListUserProducts = require('./views/user-products');
App.Views.UserProducts = new ListUserProducts

// App Router
App.Router = Backbone.Router.extend({

  // Route definitions
  routes: {
    '': 'index',
    'user/add(/)': 'addUser',
    'user/:id/edit(/)': 'addUser',
    'user/:id/delete(/)': 'deleteUser',
    'products(/)': 'showProducts',
    'user/:userId/products/:id/edit(/)': 'addProduct',
    'products/:id/delete(/)': 'deleteProduct',
    'users/:id/products(/)': 'showUserProducts',
    'user/:id/products/add': 'addProduct',
    '*actions': 'defaultRoute'
  },

  // Route handlers

  index: function() {
    App.Views.ListUsers.render();
  },

  addUser: function(id) {
    App.Views.UserForm.render(id);
  },

  deleteUser: function(id) {
    var user = userCollection.get(id);

    user.destroy().done(function (user) {
      App.router.navigate('/', { trigger: true })
    });
  },

  showProducts: function() {
    App.Views.ProductList.render()
  },

  addProduct: function(userId, productId) {
    App.Views.ProductForm.render(userId, productId)
  },

  deleteProduct: function(id) {
    var product = productsCollection.get(id);

    console.log(product);

    product.destroy().done(function (product) {
      App.router.navigate('/', { trigger: true })
    })
  },

  showUserProducts: function(userId) {
    App.Views.UserProducts.render(userId);
  },

  defaultRoute: function(actions) {
    console.log('404');
  }
});

// Initiate the router
App.router = new App.Router;

Backbone.history.start();
