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
  });

  after(async () => {
    await connection.close;
    console.log("INFO - Connection to server stopped.");
  });

  it('gets information for specific user', async () => {
    const user_request = await request(server)
      .post('/')
      .send({ query: '{ user(id: 2) { id name email password image description address_line1 address_line2 city state zipcode } }'});

    expect(user_request.status).to.equal(200)

    const user = user_request.body.data.user;

    user.should.have.property('id')
    expect(user.id).to.eq(2)

    user.should.have.property('name')
    expect(user.name).to.eq('The User')

    user.should.have.property('email')
    expect(user.email).to.eq('user@crate.com')

    user.should.have.property('password')
    expect(user.password).to.eq('$2b$10$wJdtPJOi4TV/9rgWcE4TUuNwrZ6Iyy1/ez78Itis2nmSYNTIEO7zm')

    user.should.have.property('image')
    expect(user.image).to.eq('https://en.pimg.jp/045/948/028/1/45948028.jpg')

    user.should.have.property('description')
    expect(user.description).to.eq('Tattooed seitan waistcoat austin asymmetrical chambray hot chicken man bun poke')

    user.should.have.property('address_line1')
    expect(user.address_line1).to.eq('5678 Here Ave')

    user.should.have.property('address_line2')
    expect(user.address_line2).to.eq(null)

    user.should.have.property('city')
    expect(user.city).to.eq('Pueblo')

    user.should.have.property('state')
    expect(user.state).to.eq('CO')

    user.should.have.property('zipcode')
    expect(user.zipcode).to.eq(85623);
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
  });

  it('attempts a get request for specific user without any field', async () => {
    const bad_request = await request(server)
      .post('/')
      .send({ query: '{ user(id: 2) }' });
    expect(bad_request.status).to.eq(400);
    bad_request.body.should.have.property('errors')
    bad_request.body.errors[0].should.have.property('message')
    bad_request.body.errors[0].message.should.be.a('string');
    expect(bad_request.body.errors[0].message).to.eq('Field "user" of type "user" must have a selection of subfields. Did you mean "user { ... }"?');
  });

  it('attempts a get request for specific user without incorrect field request (attribute does not exist)', async () => {
    const bad_request = await request(server)
      .post('/')
      .send({ query: '{ user(id: 2) { tacopizzacat } }' });
    expect(bad_request.status).to.eq(400);
    bad_request.body.should.have.property('errors')
    bad_request.body.errors[0].should.have.property('message')
    bad_request.body.errors[0].message.should.be.a('string');
    expect(bad_request.body.errors[0].message).to.eq('Cannot query field "tacopizzacat" on type "user".');
  });

  it('attempts a get request for specific user without specifying an id', async () => {
    const bad_request = await request(server)
      .post('/')
      .send({ query: '{ user {email} }' });
    expect(bad_request.status).to.eq(200);
    bad_request.body.should.have.property('errors')
    bad_request.body.errors[0].should.have.property('message')
    bad_request.body.errors[0].message.should.be.a('string');
    expect(bad_request.body.errors[0].message).to.eq('WHERE parameter "id" has invalid "undefined" value');
  });

  // Should we be fixing the response to send a "no such user"? Right now, the getById resolver doesn't have an error pathway
  it('attempts a get request for specific user with incorrect id', async () => {
    const bad_request = await request(server)
      .post('/')
      .send({ query: '{ user(id: 200) { email } }' });
    expect(bad_request.status).to.eq(200) //It is still a "successful" api request, it just returns nil body

    bad_request.body.data.should.have.property('user')
    bad_request.body.data.should.not.have.nested.property('email')
    expect(bad_request.body.data.user).to.eq(null);
  });

  it('gets information for all users', async () => {
    const all_users_request = await request(server)
      .post('/')
      .send({ query: '{ users { id name email password image description address_line1 address_line2 city state zipcode } }'});

    expect(all_users_request.status).to.equal(200)
    all_users_request.body.data.users.should.be.a('array')

    const admin = all_users_request.body.data.users.find(user => {return user.id === 1});

    admin.should.have.property('id')
    expect(admin.id).to.eq(1)

    admin.should.have.property('name')
    expect(admin.name).to.eq('The Admin')

    admin.should.have.property('email')
    expect(admin.email).to.eq('admin@crate.com')

    admin.should.have.property('password')
    expect(admin.password).to.eq('$2b$10$ETqxtrm6FpBsxMcET.Qor.pw9X.5FPj6/1QF9jRY3EJ4G7kNNFz1e')

    admin.should.have.property('image')
    expect(admin.image).to.eq('https://do.lolwot.com/wp-content/uploads/2015/06/18-hilarious-and-bizarre-stock-photos-15.jpg')

    admin.should.have.property('description')
    expect(admin.description).to.eq("I'm baby meggings church-key neutra, coloring book kitsch banh mi slow-carb pop-up irony snackwave")

    admin.should.have.property('address_line1')
    expect(admin.address_line1).to.eq('1234 There Blvd')

    admin.should.have.property('address_line2')
    expect(admin.address_line2).to.eq('PO BOX 801234')

    admin.should.have.property('city')
    expect(admin.city).to.eq('Denver')

    admin.should.have.property('state')
    expect(admin.state).to.eq('CO')

    admin.should.have.property('zipcode')
    expect(admin.zipcode).to.eq(36479);
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
  });

  it('attempts a get request for all users without any fields', async () => {
    const bad_request = await request(server)
      .post('/')
      .send({ query: '{ users }' });
    expect(bad_request.status).to.eq(400);
    bad_request.body.should.have.property('errors')
    bad_request.body.errors[0].should.have.property('message')
    bad_request.body.errors[0].message.should.be.a('string');
    expect(bad_request.body.errors[0].message).to.eq('Field "users" of type "[user]" must have a selection of subfields. Did you mean "users { ... }"?');
  });

  it('attempts a get request for all users with incorrect field request (attribute does not exist)', async () => {
    const bad_request = await request(server)
      .post('/')
      .send({ query: '{ users { birthday } }' });
    expect(bad_request.status).to.eq(400);
    bad_request.body.should.have.property('errors')
    bad_request.body.errors[0].should.have.property('message')
    bad_request.body.errors[0].message.should.be.a('string');
    expect(bad_request.body.errors[0].message).to.eq('Cannot query field "birthday" on type "user".');
  });

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
  });

  it('gets information on genders', async () => {
    const gender_request = await request(server)
      .post('/')
      .send({ query: '{ userGenders { id name } }' });
    expect(gender_request.status).to.eq(200);

    const male = gender_request.body.data.userGenders.find(gender => {return gender.id === 1});
    expect(male.id).to.eq(1)
    expect(male.name).to.eq('Male')
    const female = gender_request.body.data.userGenders.find(gender => {return gender.id === 2});
    expect(female.id).to.eq(2)
    expect(female.name).to.eq('Female');
  });

  it('attempts query for genders without response request', async () => {
    const bad_request = await request(server)
      .post('/')
      .send({ query: '{ userGenders { } }' });
    expect(bad_request.status).to.eq(400);
    bad_request.body.should.have.property('errors')
    bad_request.body.errors[0].should.have.property('message')
    bad_request.body.errors[0].message.should.be.a('string');
    expect(bad_request.body.errors[0].message).to.eq('Syntax Error: Expected Name, found }');
  });

  it('attempts query for genders typo in query function', async () => {
    const bad_request = await request(server)
      .post('/')
      .send({ query: '{ userGender { id name } }' });
    expect(bad_request.status).to.eq(400);
    bad_request.body.should.have.property('errors')
    bad_request.body.errors[0].should.have.property('message')
    bad_request.body.errors[0].message.should.be.a('string');
    expect(bad_request.body.errors[0].message).to.eq('Cannot query field "userGender" on type "query". Did you mean "userGenders"?');
  });

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
    expect(user_request.body.data.userLogin.user.password).to.eq('$2b$10$wJdtPJOi4TV/9rgWcE4TUuNwrZ6Iyy1/ez78Itis2nmSYNTIEO7zm') // Does this hash change everytime locals change? If so, what is a better way to test this?

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

  it('attempts to log in user without passing in login information', async () => {
    const bad_request = await request(server)
      .post('/')
      .send({ query: '{ userLogin { } }' });
    expect(bad_request.status).to.eq(400);
    bad_request.body.should.have.property('errors')
    bad_request.body.errors[0].should.have.property('message')
    bad_request.body.errors[0].message.should.be.a('string');
    expect(bad_request.body.errors[0].message).to.eq('Syntax Error: Expected Name, found }');
  });

  it('attempts to log in user with incorrect password', async () => {
    const bad_request = await request(server)
      .post('/')
      .send({ query: '{ userLogin(email: "user@crate.com", password: "111111", role: "USER") { user {id} token } }'});
    expect(bad_request.status).to.eq(200);
    bad_request.body.should.have.property('errors')
    bad_request.body.errors[0].should.have.property('message')
    bad_request.body.errors[0].message.should.be.a('string');
    expect(bad_request.body.errors[0].message).to.eq('Sorry, the password you entered is incorrect. Please try again.');
  });

  it('attempts to log in user with incorrect email', async () => {
    const bad_request = await request(server)
      .post('/')
      .send({ query: '{ userLogin(email: "baduser@crate.com", password: "123456", role: "USER") { user {id} token } }'});
    expect(bad_request.status).to.eq(200);
    bad_request.body.should.have.property('errors')
    bad_request.body.errors[0].should.have.property('message')
    bad_request.body.errors[0].message.should.be.a('string');
    expect(bad_request.body.errors[0].message).to.eq('We do not have any user registered with baduser@crate.com email address. Please signup.');
  });
});
