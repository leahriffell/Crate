const chai = require('chai');

const expect = chai.expect;
const should = chai.should();
const url = `http://localhost:8000/`;
const request = require('supertest')(url);

describe('User mutations', () => {
  afterEach(function() {
    request.post('/graphql')
    .send({ query: 'mutation { userUpdate(id: 2, image: "https://en.pimg.jp/045/948/028/1/45948028.jpg") { id image } }'})
    .then(() => {
      done();
    });
  });

  it('Update image url for user with id = 2', (done) => {
    request.post('/graphql')
    .send({ query: 'mutation { userUpdate(id: 2, image: "updated_img.png") { id image } }'})
    .expect(200)
    .end((err,res) => {
        if (err) return done(err);
        res.body.data.userUpdate.should.have.property('image')
        expect(res.body.data.userUpdate.image).to.eq('updated_img.png')
        done();
    })
  });
});
