ITEM_COUNT = 0;
var template = require('./templates/item'),
  View = require('views/base/view');
module.exports = View.extend({
  template: template,
  tagName: 'tr',

  render: function(){
    ITEM_COUNT ++;
    console.log("Default -- " + ITEM_COUNT);
    View.prototype.render.apply(this, arguments);
  }

});
