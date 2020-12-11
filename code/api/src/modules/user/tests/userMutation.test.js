// Test environment/assertions setup
const chai = require('chai');
const expect = chai.expect;
const should = chai.should();
// Database/Dummy data
import models from '../../../setup/models'
const User = require('../model');
const bcrypt = require('bcrypt');
const config = require('../../../config/server.json');
const params = require('../../../config/params.json');
// Connecting to the server
const request = require('supertest');
import express from 'express'
import graphqlHTTP from 'express-graphql'
import schema from '../../../setup/schema'
import connection from '../../../setup/database'

describe('User mutations', () => {
  let server;
  let dummy_user; // defined in the global scope so we can use inside the blocks of the test suite

  before(() => {
    server = express();
    server.use('/',
      graphqlHTTP({
        schema: schema,
        graphiql: false
      })
    );
    console.log("INFO - Server started.");
  })

  beforeEach(async () => {
    // Assigned the dummy_user global variable to model creation (allows use outside this block from ln 23)

    // FOUND OUT SOMETHING: This user is created in DEV, however, we are testing DEV
    dummy_user = await models.User.create({
      name: 'Dummy User',
      email: 'dummy@crate.com',
      password: bcrypt.hashSync('abcdefg', config.saltRounds),
      role: params.user.roles.user,
      image: 'https://www.liveabout.com/thmb/s6wcupyhjrstpTmxv_3K8kLIPYM=/768x0/filters:no_upscale():max_bytes(150000):strip_icc()/feet-face-599c412c22fa3a0011d92add.jpg',
      description: "It was the scarcity that fueled his creativity.",
      address_line1: '0998 Address', // address_line2 will be null
      city: 'Im a City',
      state: 'State',
      zipcode: 11111
    });
    console.log("INFO - Dummy user created.");
  })

  afterEach(async () => {
    await models.User.destroy({ where: {id: dummy_user.id} })
    console.log("INFO - Dummy user destroyed.");
  })

  after(async () => {
    await connection.close;
    console.log("INFO - Connection to server stopped.");
  })

  it('Update attributes for dummy user', async () => {
    const id =  dummy_user.id;
    const user_mutation = await request(server)
      .post('/')
      .send({
        query:
          `mutation { userUpdate(id: ${id}, image: "updated_img.png", description: "new day, new me", address_line1: "NEW ADDRESS LINE 1", address_line2: "NEW ADDRESS LINE 2", city: "NEW CITY", state: "AA", zipcode: 11111 ) { id image description address_line1 address_line2 city state zipcode } }`
      });
    user_mutation.body.data.userUpdate.should.have.property('image')
    expect(user_mutation.body.data.userUpdate.image).to.eq('updated_img.png')

    user_mutation.body.data.userUpdate.should.have.property('description')
    expect(user_mutation.body.data.userUpdate.description).to.eq('new day, new me')

    user_mutation.body.data.userUpdate.should.have.property('address_line1')
    expect(user_mutation.body.data.userUpdate.address_line1).to.eq('NEW ADDRESS LINE 1')

    user_mutation.body.data.userUpdate.should.have.property('address_line2')
    expect(user_mutation.body.data.userUpdate.address_line2).to.eq('NEW ADDRESS LINE 2')

    user_mutation.body.data.userUpdate.should.have.property('city')
    expect(user_mutation.body.data.userUpdate.city).to.eq('NEW CITY')

    user_mutation.body.data.userUpdate.should.have.property('state')
    expect(user_mutation.body.data.userUpdate.state).to.eq('AA')

    user_mutation.body.data.userUpdate.should.have.property('zipcode')
    expect(user_mutation.body.data.userUpdate.zipcode).to.eq(11111)

    // Tests that the database itself was updated
    const database_update = await models.User.findByPk(id) //findByPk = rails find (id) VS findOne = rails find_by (any attribute)
    expect(database_update.image).to.eq('updated_img.png')
    expect(database_update.description).to.eq('new day, new me')
    expect(database_update.address_line1).to.eq('NEW ADDRESS LINE 1')
    expect(database_update.address_line2).to.eq('NEW ADDRESS LINE 2')
    expect(database_update.city).to.eq('NEW CITY')
    expect(database_update.state).to.eq('AA')
    expect(database_update.zipcode).to.eq(11111);
  });

  it('attempts to update user without response request', async () => {
    const id =  dummy_user.id;
    const bad_mutation = await request(server)
      .post('/')
      .send({
        query:
          `mutation { userUpdate(id: ${id}, image: "updated_img.png", description: "new day, new me", address_line1: "NEW ADDRESS LINE 1") {} }`
      });
    expect(bad_mutation.status).to.eq(400);
    bad_mutation.body.should.have.property('errors')
    bad_mutation.body.errors[0].should.have.property('message')
    bad_mutation.body.errors[0].message.should.be.a('string');
    expect(bad_mutation.body.errors[0].message).to.eq('Syntax Error: Expected Name, found }');
  });
});
