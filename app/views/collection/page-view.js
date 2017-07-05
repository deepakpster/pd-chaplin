var template = require('./templates/page'),
  View = require('views/base/collection-view')
ItemView = require('views/collection/item-view');

module.exports = View.extend({
  template: template,
  itemView: ItemView,
  listSelector: "tbody",
  autoRender: true,
  className: "collection-view",

  initialize: function initialize(options) {
    _.extend(this, options);
    View.prototype.initialize.apply(this, arguments);
  },

  events: {
    "click button": "reRender"
  },

  reRender: function() {
    console.log("clicked");
    var that = this;
    that.$el.empty();
    that.render();
  }

});
