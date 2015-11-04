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

// App Router
App.Router = Backbone.Router.extend({

  // Route definitions
  routes: {
    '': 'index',
    'user/add(/)': 'addUser',
    'user/:id/edit(/)': 'addUser',
    'user/:id/delete(/)': 'deleteUser',
    'product/add': 'addProduct',
    '*actions': 'defaultRoute'
  },

  // Route handlers

  index: function() {
    App.Views.ListUsers.render();
    App.Views.ProductList.render();
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

  addProduct: function(id) {
    App.Views.ProductForm.render(id)
  },

  defaultRoute: function(actions) {
    console.log('404');
  }
});

// Initiate the router
App.router = new App.Router;

Backbone.history.start();
