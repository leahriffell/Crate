// Test environment/assertions setup
const chai = require('chai');
const expect = chai.expect;
const should = chai.should();
// Making requests in your test setup
// const url = `http://localhost:8000/`;
const request = require('supertest');
// pulled this from resolver file where they also talk to the database
import models from '../../../setup/models'
const User = require('../model');
// pulled these from the seeders file where we know they are talking to the database
const bcrypt = require('bcrypt');
const config = require('../../../config/server.json');
const params = require('../../../config/params.json');
// Adding in connection to database/graphql/server
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
  })

  beforeEach(async () => {
    // Assigned the dummy_user global variable to model creation (allows use outside this block from ln 23)
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

    console.log(dummy_user.name);
  })

  afterEach(async () => {
    await models.User.destroy({ where: {id: dummy_user.id} })
  })

  after(async () => {
    await connection.close;
  })

  it('Update attributes for dummy user', async (done) => {
    const id =  dummy_user.id;
    const response = await request(server)
    .post('/')
    .send({
      query:
        `mutation { userUpdate(id: ${id}, image: "updated_img.png", description: "new day, new me", address_line1: "NEW ADDRESS LINE 1", address_line2: "NEW ADDRESS LINE 2", city: "NEW CITY", state: "AA", zipcode: 00000 ) { id image description address_line1 address_line2 city state zipcode } }`
    })
    .expect(200)
    .end((err,res) => {
      // Tests the graphql response
        if (err) return done(err);
        res.body.data.userUpdate.should.have.property('image')
        expect(res.body.data.userUpdate.image).to.eq('updated_img.png')

        res.body.data.userUpdate.should.have.property('description')
        expect(res.body.data.userUpdate.description).to.eq('new day, new me')

        res.body.data.userUpdate.should.have.property('address_line1')
        expect(res.body.data.userUpdate.address_line1).to.eq('NEW ADDRESS LINE 1')
        done();
    })
    // Tests that the database itself was updated
    //findByPk = rails find (id) VS findOne = rails find_by (any attribute)
    const database_update = await models.User.findByPk(id)
    expect(database_update.image).to.eq('updated_img.png')
    expect(database_update.description).to.eq('new day, new me')
    expect(database_update.address_line1).to.eq('NEW ADDRESS LINE 1')
  });
});
