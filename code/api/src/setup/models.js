// This file loads database sequalize by calling the model data from modules

// Imports
import Sequelize from 'sequelize'

// App Imports
import databaseConnection from './database'

// model variable is set to a block
const models = {
  // the four models we have in our modules folder
  User: databaseConnection.import('../modules/user/model'),
  Product: databaseConnection.import('../modules/product/model'),
  Crate: databaseConnection.import('../modules/crate/model'),
  Subscription: databaseConnection.import('../modules/subscription/model')
}

// This makes our models into objects for use by the FE
Object.keys(models).forEach(modelName => {
  if (models[modelName].associate) {
    models[modelName].associate(models)
  }
})

models.sequelize = databaseConnection
models.Sequelize = Sequelize

export default models
