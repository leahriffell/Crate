const chai = require('chai');

const expect = chai.expect;
const should = chai.should();
const url = `http://localhost:8000/`;
const request = require('supertest')(url);

describe('User mutations', () => {
  afterEach(function() {
    request.post('/graphql')
    .send({ query: 'mutation { userUpdate(id: 2, image: "https://en.pimg.jp/045/948/028/1/45948028.jpg", description: "Tattooed seitan waistcoat austin asymmetrical chambray hot chicken man bun poke", email: "user@crate.com" ) { id image description email} }'})
    .then(() => {
      done();
    });
  });

  it('Update attributes for user id = 2', (done) => {
    request.post('/graphql')
    .send({ query: 'mutation { userUpdate(id: 2, image: "updated_img.png", description: "new me", email: "updatedemail@crate.com" ) { id image description email } }'})
    .expect(200)
    .end((err,res) => {
        if (err) return done(err);
        res.body.data.userUpdate.should.have.property('image')
        expect(res.body.data.userUpdate.image).to.eq('updated_img.png')

        res.body.data.userUpdate.should.have.property('description')
        expect(res.body.data.userUpdate.description).to.eq('new me')

        res.body.data.userUpdate.should.have.property('email')
        expect(res.body.data.userUpdate.email).to.eq('updatedemail@crate.com')
        done();
    })
  });
});
