// Test environment/assertions setup
const chai = require('chai');
const expect = chai.expect;
const should = chai.should();
// Connecting to the server
const request = require('supertest');
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
    console.log("INFO - Server started.");
  })

  after(async () => {
    await connection.close;
    console.log("INFO - Connection to server stopped.");
  })

  it('gets information for specific user', async () => {
    const user_request = await request(server)
      .post('/')
      .send({ query: '{ user(id: 2) { image email description address_line1 address_line2 city state zipcode } }'});

    expect(user_request.statusCode).to.equal(200)

    user_request.body.data.user.should.have.property('image')
    expect(user_request.body.data.user.image).to.eq('https://en.pimg.jp/045/948/028/1/45948028.jpg')

    user_request.body.data.user.should.have.property('email')
    expect(user_request.body.data.user.email).to.eq('user@crate.com')

    user_request.body.data.user.should.have.property('description')
    expect(user_request.body.data.user.description).to.eq('Tattooed seitan waistcoat austin asymmetrical chambray hot chicken man bun poke')

    user_request.body.data.user.should.have.property('address_line1')
    expect(user_request.body.data.user.address_line1).to.eq('5678 Here Ave')

    user_request.body.data.user.should.have.property('address_line2')
    expect(user_request.body.data.user.address_line2).to.eq(null)

    user_request.body.data.user.should.have.property('city')
    expect(user_request.body.data.user.city).to.eq('Pueblo')

    user_request.body.data.user.should.have.property('state')
    expect(user_request.body.data.user.state).to.eq('CO')

    user_request.body.data.user.should.have.property('zipcode')
    expect(user_request.body.data.user.zipcode).to.eq(85623);
  });

  it('attempts a get request for specific user without response request', async () => {
    const bad_request = await request(server)
      .post('/')
      .send({ query: '{ user(id: 2) { } }' });
    expect(bad_request.status).to.eq(400);
    bad_request.body.should.have.property('errors')
    bad_request.body.errors[0].should.have.property('message')
    bad_request.body.errors[0].message.should.be.a('string');
    expect(bad_request.body.errors[0].message).to.eq('Syntax Error: Expected Name, found }');
  })

  it('attempts a get request for specific user without any field', async () => {
    const bad_request = await request(server)
      .post('/')
      .send({ query: '{ user(id: 2) }' });
    expect(bad_request.status).to.eq(400);
    bad_request.body.should.have.property('errors')
    bad_request.body.errors[0].should.have.property('message')
    bad_request.body.errors[0].message.should.be.a('string');
    expect(bad_request.body.errors[0].message).to.eq('Field "user" of type "user" must have a selection of subfields. Did you mean "user { ... }"?');
  })

  it('attempts a get request for specific user without incorrect field request (attribute does not exist)', async () => {
    const bad_request = await request(server)
      .post('/')
      .send({ query: '{ user(id: 2) { tacopizzacat } }' });
    expect(bad_request.status).to.eq(400);
    bad_request.body.should.have.property('errors')
    bad_request.body.errors[0].should.have.property('message')
    bad_request.body.errors[0].message.should.be.a('string');
    expect(bad_request.body.errors[0].message).to.eq('Cannot query field "tacopizzacat" on type "user".');
  })

  it('attempts a get request for specific user without specifying an id', async () => {
    const bad_request = await request(server)
      .post('/')
      .send({ query: '{ user {email} }' });
    expect(bad_request.status).to.eq(200);
    bad_request.body.should.have.property('errors')
    bad_request.body.errors[0].should.have.property('message')
    bad_request.body.errors[0].message.should.be.a('string');
    expect(bad_request.body.errors[0].message).to.eq('WHERE parameter "id" has invalid "undefined" value');
  })

  // Should we be fixing the response to send a "no such user"? Right now, the getById resolver doesn't have an error pathway
  it('attempts a get request for specific user with incorrect id', async () => {
    const bad_request = await request(server)
      .post('/')
      .send({ query: '{ user(id: 200) { email } }' });
    expect(bad_request.status).to.eq(200) //It is still a "successful" api request, it just returns nil body

    bad_request.body.data.should.have.property('user')
    bad_request.body.data.should.not.have.nested.property('email')
    expect(bad_request.body.data.user).to.eq(null);
  })

  it('gets information for all users', async () => {
    const all_users_request = await request(server)
      .post('/')
      .send({ query: '{ users { image email description address_line1 address_line2 city state zipcode } }'});

    expect(all_users_request.statusCode).to.equal(200)
    all_users_request.body.data.users.should.be.a('array')

    all_users_request.body.data.users[0].should.have.property('image')
    expect(all_users_request.body.data.users[0].image).to.eq('https://do.lolwot.com/wp-content/uploads/2015/06/18-hilarious-and-bizarre-stock-photos-15.jpg')

    all_users_request.body.data.users[0].should.have.property('email')
    expect(all_users_request.body.data.users[0].email).to.eq('admin@crate.com')

    all_users_request.body.data.users[0].should.have.property('description')
    expect(all_users_request.body.data.users[0].description).to.eq("I'm baby meggings church-key neutra, coloring book kitsch banh mi slow-carb pop-up irony snackwave")

    all_users_request.body.data.users[0].should.have.property('address_line1')
    expect(all_users_request.body.data.users[0].address_line1).to.eq('1234 There Blvd')

    all_users_request.body.data.users[0].should.have.property('address_line2')
    expect(all_users_request.body.data.users[0].address_line2).to.eq('PO BOX 801234')

    all_users_request.body.data.users[0].should.have.property('city')
    expect(all_users_request.body.data.users[0].city).to.eq('Denver')

    all_users_request.body.data.users[0].should.have.property('state')
    expect(all_users_request.body.data.users[0].state).to.eq('CO')

    all_users_request.body.data.users[0].should.have.property('zipcode')
    expect(all_users_request.body.data.users[0].zipcode).to.eq(36479);
  });

  it('attempts a get request for all users without response request', async () => {
    const bad_request = await request(server)
      .post('/')
      .send({ query: '{ users { } }' });
    expect(bad_request.status).to.eq(400);
    bad_request.body.should.have.property('errors')
    bad_request.body.errors[0].should.have.property('message')
    bad_request.body.errors[0].message.should.be.a('string');
    expect(bad_request.body.errors[0].message).to.eq('Syntax Error: Expected Name, found }');
  })

  it('attempts a get request for all users without any fields', async () => {
    const bad_request = await request(server)
      .post('/')
      .send({ query: '{ users }' });
    expect(bad_request.status).to.eq(400);
    bad_request.body.should.have.property('errors')
    bad_request.body.errors[0].should.have.property('message')
    bad_request.body.errors[0].message.should.be.a('string');
    expect(bad_request.body.errors[0].message).to.eq('Field "users" of type "[user]" must have a selection of subfields. Did you mean "users { ... }"?');
  })

  it('attempts a get request for all users with incorrect field request (attribute does not exist)', async () => {
    const bad_request = await request(server)
      .post('/')
      .send({ query: '{ users { birthday } }' });
    expect(bad_request.status).to.eq(400);
    bad_request.body.should.have.property('errors')
    bad_request.body.errors[0].should.have.property('message')
    bad_request.body.errors[0].message.should.be.a('string');
    expect(bad_request.body.errors[0].message).to.eq('Cannot query field "birthday" on type "user".');
  })

  // If you accidentally use 'user' instead of 'users'
  it('attempts a get request for all users with incorrect query', async () => {
    const bad_request = await request(server)
      .post('/')
      .send({ query: '{ user { email } }' });
    expect(bad_request.status).to.eq(200) //It is still a "successful" api request, it just returns nil body

    bad_request.body.errors.should.be.a('array')
    bad_request.body.errors[0].message.should.be.a('string')

    bad_request.body.data.should.not.have.property('users')
    bad_request.body.data.should.not.have.nested.property('email')

    expect(bad_request.body.data.user).to.eq(null);
  })

  it('logs in a user', async () => {
    const user_request = await request(server)
      .post('/')
      .send({ query: '{ userLogin(email: "user@crate.com", password: "123456", role: "USER") { user {id name email password role image address_line1 address_line2 city state zipcode description} token } }'});

    expect(user_request.statusCode).to.equal(200)

    user_request.body.data.userLogin.should.have.property('token')

    user_request.body.data.userLogin.user.should.have.property('id')
    expect(user_request.body.data.userLogin.user.id).to.eq(2)

    user_request.body.data.userLogin.user.should.have.property('name')
    expect(user_request.body.data.userLogin.user.name).to.eq('The User')

    user_request.body.data.userLogin.user.should.have.property('email')
    expect(user_request.body.data.userLogin.user.email).to.eq('user@crate.com')

    user_request.body.data.userLogin.user.should.have.property('password')
    expect(user_request.body.data.userLogin.user.password).to.eq('$2b$10$pTdwV6spenCVU/iga.o36Ox0.8tFyBcHFW59HSffEkN9TVcyE3H62')

    user_request.body.data.userLogin.user.should.have.property('role')
    expect(user_request.body.data.userLogin.user.role).to.eq('USER')

    user_request.body.data.userLogin.user.should.have.property('image')
    expect(user_request.body.data.userLogin.user.image).to.eq('https://en.pimg.jp/045/948/028/1/45948028.jpg')

    user_request.body.data.userLogin.user.should.have.property('address_line1')
    expect(user_request.body.data.userLogin.user.address_line1).to.eq('5678 Here Ave')

    user_request.body.data.userLogin.user.should.have.property('city')
    expect(user_request.body.data.userLogin.user.city).to.eq('Pueblo')

    user_request.body.data.userLogin.user.should.have.property('state')
    expect(user_request.body.data.userLogin.user.state).to.eq('CO')

    user_request.body.data.userLogin.user.should.have.property('zipcode')
    expect(user_request.body.data.userLogin.user.zipcode).to.eq(85623)

    user_request.body.data.userLogin.user.should.have.property('description')
    expect(user_request.body.data.userLogin.user.description).to.eq('Tattooed seitan waistcoat austin asymmetrical chambray hot chicken man bun poke')
  });

  it('attempts to log in user without passing any response requests', async () => {
    const bad_request = await request(server)
      .post('/')
      .send({ query: '{ userLogin { } }' });
    expect(bad_request.status).to.eq(400);
    bad_request.body.should.have.property('errors')
    bad_request.body.errors[0].should.have.property('message')
    bad_request.body.errors[0].message.should.be.a('string');
    expect(bad_request.body.errors[0].message).to.eq('Syntax Error: Expected Name, found }');
  });
});

