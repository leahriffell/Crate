// creates objects for each of the models using sequelize (node's ORM)
// turn them all into objects here vs. in the model file

// Imports
import Sequelize from 'sequelize'

// App Imports
import databaseConnection from './database'

// defines models (users, products, crates, subscriptions)
const models = {
  User: databaseConnection.import('../modules/user/model'),
  Product: databaseConnection.import('../modules/product/model'),
  Crate: databaseConnection.import('../modules/crate/model'),
  Subscription: databaseConnection.import('../modules/subscription/model')
}

// creates relationships / assocations
Object.keys(models).forEach(modelName => {
  if (models[modelName].associate) {
    models[modelName].associate(models)
  }
})

models.sequelize = databaseConnection
// runs sequelize on all 4 models defined above
models.Sequelize = Sequelize

// exportable 
export default models
