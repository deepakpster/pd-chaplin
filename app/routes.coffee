# Application routes.
module.exports = (match) ->
  match '', 'home#index'
  match 'collection', 'collection#index'
  match 'performance', 'performance#index'
