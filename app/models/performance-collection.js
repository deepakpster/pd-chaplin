var Model = require("models/base/model"),
	Collection = require("models/base/collection");
var models = {};

// Our base model is "person"
models.Person = Model.extend({
  // Example of how to do a validation in a model
  validate: function(attributes) {
    if (typeof attributes.firstname !== 'string') {
      // Return a failed validation
      return 'Firstname is mandatory';
    }
    if (typeof attributes.lastname !== 'string') {
      // Return a failed validation
      return 'Lastname is mandatory';
    }
    // All validations passed, don't return anything
  }

});
// People collection
module.exports = Collection.extend({
  model: models.Person,
  url: '/performace.json'
});