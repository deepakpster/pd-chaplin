var template = require('./templates/page'),
  View = require('views/base/collection-view')
ItemView = require('views/performance/item-view');
var startAnimation, endAnimation, insertView;
COUNT = 0;

startAnimation = (function() {
  if ($) {
    return function(elem, useCssAnimation, cls) {
      if (useCssAnimation) {
        return addClass(elem, cls);
      } else {
        return elem.css('opacity', 0);
      }
    };
  } else {
    return function(elem, useCssAnimation, cls) {
      if (useCssAnimation) {
        return addClass(elem, cls);
      } else {
        return elem.style.opacity = 0;
      }
    };
  }
})();

endAnimation = (function() {
  if ($) {
    return function(elem, duration) {
      return elem.animate({
        opacity: 1
      }, duration);
    };
  } else {
    return function(elem, duration) {
      elem.style.transition = "opacity " + duration + "ms";
      return elem.style.opacity = 1;
    };
  }
})();

insertView = (function() {
  if ($) {
    return function(list, viewEl, position, length, itemSelector) {
      var children, childrenLength, insertInMiddle, isEnd, method;
      insertInMiddle = (0 < position && position < length);
      isEnd = function(length) {
        return length === 0 || position >= length;
      };
      if (insertInMiddle || itemSelector) {
        children = list.children(itemSelector);
        childrenLength = children.length;
        if (children[position] !== viewEl) {
          if (isEnd(childrenLength)) {
            setTimeout(function() {
              list.append(viewEl);
            }, 0);
            return true;
          } else {
            if (position === 0) {
              setTimeout(function() {
                children.eq(position).before(viewEl);
              }, 0);
              return true;
            } else {
              setTimeout(function() {
                children.eq(position - 1).after(viewEl);
              }, 0);
              return true;
            }
          }
        }
      } else {
        method = isEnd(length) ? 'append' : 'prepend';
        console.log(method);
        setTimeout(function() {
          list[method](viewEl);
        }, 0);
        return true;
      }
    };
  } else {
    return function(list, viewEl, position, length, itemSelector) {
      var children, childrenLength, insertInMiddle, isEnd, last;
      insertInMiddle = (0 < position && position < length);
      isEnd = function(length) {
        return length === 0 || position === length;
      };
      if (insertInMiddle || itemSelector) {
        children = filterChildren(list.children, itemSelector);
        childrenLength = children.length;
        if (children[position] !== viewEl) {
          if (isEnd(childrenLength)) {
            return list.appendChild(viewEl);
          } else if (position === 0) {
            return list.insertBefore(viewEl, children[position]);
          } else {
            last = children[position - 1];
            if (list.lastChild === last) {
              return list.appendChild(viewEl);
            } else {
              return list.insertBefore(viewEl, last.nextElementSibling);
            }
          }
        }
      } else if (isEnd(length)) {
        return list.appendChild(viewEl);
      } else {
        return list.insertBefore(viewEl, list.firstChild);
      }
    };
  }
})();

module.exports = View.extend({
  template: template,
  itemView: ItemView,
  listSelector: "tbody",
  autoRender: true,
  className: "collection-view",

  events: {
    "click button": "reRender"
  },

  initialize: function initialize(options) {
    _.extend(this, options);
    View.prototype.initialize.apply(this, arguments);
  },

  reRender: function() {
    console.log("clicked");
    var that = this;
    alert("I am Unblocked !!!");
    // setTimeout(function() {
    //   that.$el.empty();
    //   that.render();
    // }, 0);
  },

  renderItem: function(item) {
    var view;
    view = this.subview("itemView:" + item.cid);
    if (!view) {
      view = this.initItemView(item);
      this.subview("itemView:" + item.cid, view);
    }
    setTimeout(function() {
      view.render();
    }, 0);
    return view;
  },

  insertView: function(item, view, position, enableAnimation) {
    var elem, included, length, list, that = this;
    if (enableAnimation == null) {
      enableAnimation = true;
    }
    if (this.animationDuration === 0) {
      enableAnimation = false;
    }
    if (typeof position !== 'number') {
      position = this.collection.indexOf(item);
    }
    included = typeof this.filterer === 'function' ? this.filterer(item, position) : true;
    elem = $ ? view.$el : view.el;
    if (included && enableAnimation) {
      startAnimation(elem, this.useCssAnimation, this.animationStartClass);
    }
    if (this.filterer) {
      this.filterCallback(view, included);
    }
    length = this.collection.length;
    list = $ ? this.$list : this.list;
    if (included) {
      insertView(list, elem, position, length, that.itemSelector);
      view.trigger('addedToParent');
    }
    this.updateVisibleItems(item, included);
    if (included && enableAnimation) {
      if (this.useCssAnimation) {
        setTimeout((function(_this) {
          return function() {
            return addClass(elem, _this.animationEndClass);
          };
        })(this));
      } else {
        endAnimation(elem, this.animationDuration);
      }
    }
    return view;
  }

});
