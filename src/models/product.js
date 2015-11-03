var Backbone = require('backbone');


/****************************************
  App
*****************************************/

var App = require('../app');

/****************************************
  Model: User
*****************************************/

App.Models.Product = Backbone.Model.extend({
  url: function() {
    var base = App.Settings.apiRoot + '/products';
    if (this.isNew()) return base;
    return base + '/' + this.id
  }
});

<<<<<<< HEAD

module.exports = App.Models.User;
=======
module.exports = App.Models.product;
>>>>>>> fdec27c34f98a63980fec9c75cc5fc8f50301c70



