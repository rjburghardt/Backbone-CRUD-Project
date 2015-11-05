var $ = require('jquery');
var Backbone = require('backbone');
var formTemplate = require('../templates/product-form.hbs');


/****************************************
  App
*****************************************/

var App = require('../app');
var Product = require('../models/product');

/****************************************
  View: Product Form
*****************************************/

var ProductFormView = Backbone.View.extend({
  el: $("main"),
  editMode: false,

  render: function (userId, productId) {
    var _this = this;
    this.editMode = !!productId;

    // Display form in Create Mode
    if (!this.editMode) {
      var output = formTemplate();
      this.$el.html(output);

    // Display form in Update Mode
    } else {
      var product = this.product = new Product({ id: productId, userId: userId });

      product.fetch().done(function () {
        var output = formTemplate(product.toJSON());
        _this.$el.html(output);
      });
    }
  },

  events: {
    "submit form.product": "submitForm"
  },

  submitForm: function () {
    // Collect Form Data
    var formData = {
      title: $('form.product input[name="title"]').val(),
      description: $('form.product input[name="description"]').val(),
      userId: $('form.product input[name="userId"]').val()
    };

    // Add Mode (Create Product)
    if (!this.editMode) {

      // Only set the image on add mode
      formData.img = 'http://robohash.org/'+ Date.now().toString(16) + '.png'

      App.Collections.products.create(formData, {
        success: function (product) {
          App.router.navigate('/user/:id/products', { trigger: true });
        }
      });

    // Edit Mode (Update User)
    } else {
      this.product.set(formData);
      this.product.save().done(function () {
        App.router.navigate('/products', { trigger: true });
      });
    }

    // Prevent Default
    return false;
  }
});

module.exports = ProductFormView;
