var Controller = require('controllers/base/controller');
var CollectionPageView = require('views/performance/page-view');
var PerformanceCollection = require('models/performance-collection');

module.exports = Controller.extend({
  index: function() {
    var data = [];
    for (var i = 0; i < 10000; i++) {
      data.push({
        firstname: "Deepak " + i,
        lastname: "P" + i
      })
    }
    var performanceCollection = new PerformanceCollection(data);
    var collectionPageView = new CollectionPageView({
      collection: performanceCollection,
      container: ".outer-page-container",
      method: "html"
    });
  }
});
