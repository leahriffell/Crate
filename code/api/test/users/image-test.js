const chai = require('chai');

const expect = chai.expect;
const should = chai.should();
const url = `http://localhost:8000/`;
const request = require('supertest')(url);

describe('GraphQL', () => {
  it('Returns image url for user with id = 2', (done) => {
    request.post('/graphql')
    .send({ query: '{ user(id: 2) { image } }'})
    .expect(200)
    .end((err,res) => {
        if (err) return done(err); // Let's research and understand this. Is it a mocha built in?
        res.body.data.user.should.have.property('image')
        expect(res.body.data.user.image).to.eq('https://en.pimg.jp/045/948/028/1/45948028.jpg')
        done();
    })
  })

  it('Returns an image url for each user in an All Users request', (done) => {
    request.post('/graphql')
    .send({ query: '{ users { image } }'})
    .expect(200)
    .end((err,res) => {
        if (err) return done(err);
        res.body.data.users.should.be.a('array')
        // write a length test? - like since we know we only have 2 users?
        res.body.data.users[0].should.have.property('image')
        expect(res.body.data.users[0].image).to.eq('https://do.lolwot.com/wp-content/uploads/2015/06/18-hilarious-and-bizarre-stock-photos-15.jpg')
        done();
    })
  })
});
