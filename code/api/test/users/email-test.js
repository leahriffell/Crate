const chai = require('chai');

const expect = chai.expect;
const should = chai.should();
const url = `http://localhost:8000/`;
const request = require('supertest')(url);

describe('GraphQL', () => {
  it('Returns email address for user with id = 1', (done) => {
    request.post('/graphql')
    .send({ query: '{ user(id: 1) { email } }'})
    .expect(200)
    .end((err,res) => {
        if (err) return done(err);
        res.body.data.user.should.have.property('email')
        expect(res.body.data.user.email).to.eq('admin@crate.com')
        done();
    })
  })

  it('Returns an email address for each user in an All Users request', (done) => {
    request.post('/graphql')
    .send({ query: '{ users { email } }'})
    .expect(200)
    .end((err,res) => {
        if (err) return done(err);
        res.body.data.users.should.be.a('array')
        res.body.data.users[1].should.have.property('email')
        expect(res.body.data.users[1].email).to.eq('user@crate.com')
        done();
    })
  })
});
