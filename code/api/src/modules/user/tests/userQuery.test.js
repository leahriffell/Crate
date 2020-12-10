// Test environment/assertions setup
const chai = require('chai');
const expect = chai.expect;
const should = chai.should();
// Making requests in your test setup
// const url = `http://localhost:8000/`;
const request = require('supertest');
// Adding in connection to database/graphql/server
import express from 'express'
import graphqlHTTP from 'express-graphql'
import schema from '../../../setup/schema'
import connection from '../../../setup/database'

describe('User queries', () => {
  let server;

  before(() => {
    server = express();
    server.use('/',
      graphqlHTTP({
        schema: schema,
        graphiql: false
      })
    );
  })

  after(async () => {
    connection.close;
  })

  it('gets information for specific user', async (done) => {
    await request(server)
    .post('/')
    .send({ query: '{ user(id: 2) { image email description address_line1 address_line2 city state zipcode } }'})
    .expect(200)
    .end((err,res) => {
        if (err) return done(err);
        console.log(res.body, "Query test - connects to dev, calls user 2")
        res.body.data.user.should.have.property('image')
        expect(res.body.data.user.image).to.eq('https://en.pimg.jp/045/948/028/1/45948028.jpg')

        res.body.data.user.should.have.property('email')
        expect(res.body.data.user.email).to.eq('user@crate.com')

        res.body.data.user.should.have.property('description')
        expect(res.body.data.user.description).to.eq('Tattooed seitan waistcoat austin asymmetrical chambray hot chicken man bun poke')

        res.body.data.user.should.have.property('address_line1')
        expect(res.body.data.user.address_line1).to.eq('5678 Here Ave')

        res.body.data.user.should.have.property('address_line2')
        expect(res.body.data.user.address_line2).to.eq(null)

        res.body.data.user.should.have.property('city')
        expect(res.body.data.user.city).to.eq('Pueblo')

        res.body.data.user.should.have.property('state')
        expect(res.body.data.user.state).to.eq('CO')

        res.body.data.user.should.have.property('zipcode')
        expect(res.body.data.user.zipcode).to.eq(85623)

        done();
    })
  });

  it('gets information for all users', async (done) => {
    await request(server)
    .post('/')
    .send({ query: '{ users { image email description address_line1 address_line2 city state zipcode } }'})
    .expect(200)
    .end((err,res) => {
        if (err) return done(err);
        res.body.data.users.should.be.a('array')
        res.body.data.users[0].should.have.property('image')
        expect(res.body.data.users[0].image).to.eq('https://do.lolwot.com/wp-content/uploads/2015/06/18-hilarious-and-bizarre-stock-photos-15.jpg')

        res.body.data.users[0].should.have.property('email')
        expect(res.body.data.users[0].email).to.eq('admin@crate.com')

        res.body.data.users[0].should.have.property('description')
        expect(res.body.data.users[0].description).to.eq("I'm baby meggings church-key neutra, coloring book kitsch banh mi slow-carb pop-up irony snackwave")

        res.body.data.users[0].should.have.property('address_line1')
        expect(res.body.data.users[0].address_line1).to.eq('1234 There Blvd')

        res.body.data.users[0].should.have.property('address_line2')
        expect(res.body.data.users[0].address_line2).to.eq('PO BOX 801234')

        res.body.data.users[0].should.have.property('city')
        expect(res.body.data.users[0].city).to.eq('Denver')

        res.body.data.users[0].should.have.property('state')
        expect(res.body.data.users[0].state).to.eq('CO')

        res.body.data.users[0].should.have.property('zipcode')
        expect(res.body.data.users[0].zipcode).to.eq(36479)

        done();
    })
  });
});
