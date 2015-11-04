var $ = require('jquery');
var Backbone = require('backbone');
var listUsersTemplate = require('../templates/list-users.hbs');

// App

var App = require('../app');

// View: List Users

var ListUsers = Backbone.View.extend({
  el: $('main'),

  collection: App.Collections.user,

  events: {
    "click #user": "getUserId"
  },

  getUserId: function () {
    var _this = this;
    console.log(this.id)
  },

  render: function () {
    var _this = this;
    var userCollection = this.collection;

    // Fetch Collection from Server
    userCollection.fetch().done(function (users) {
      _this.$el.html(listUsersTemplate(users));
    });
  }
});

module.exports = ListUsers;
