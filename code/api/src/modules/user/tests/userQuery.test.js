const chai = require('chai');

const expect = chai.expect;
const should = chai.should();
const url = `http://localhost:8000/`;
const request = require('supertest')(url);

describe('User queries', () => {
  it('gets information for specific user', (done) => {
    request.post('/graphql')
    .send({ query: '{ user(id: 2) { image email } }'})
    .expect(200)
    .end((err,res) => {
        if (err) return done(err);
        res.body.data.user.should.have.property('image')
        expect(res.body.data.user.image).to.eq('https://en.pimg.jp/045/948/028/1/45948028.jpg')

        res.body.data.user.should.have.property('email')
        expect(res.body.data.user.email).to.eq('user@crate.com')
        done();
    })
  });

  it('gets information for all users', (done) => {
    request.post('/graphql')
    .send({ query: '{ users { image email } }'})
    .expect(200)
    .end((err,res) => {
        if (err) return done(err);
        res.body.data.users.should.be.a('array')
        res.body.data.users[0].should.have.property('image')
        expect(res.body.data.users[0].image).to.eq('https://do.lolwot.com/wp-content/uploads/2015/06/18-hilarious-and-bizarre-stock-photos-15.jpg')

        res.body.data.users[0].should.have.property('email')
        expect(res.body.data.users[0].email).to.eq('admin@crate.com')
        done();
    })
  });
});
