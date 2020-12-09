import models from '../../../setup/models'

const chai = require('chai');

const expect = chai.expect;
const should = chai.should();
const url = `http://localhost:8000/`;
const request = require('supertest')(url);
const User = require('../model');

describe('User mutations', () => {
  beforeEach(function() {

  });
  afterEach(function() {
    request.post('/graphql')
    // To ensure that the address line 2 comes back as null:
        // Option 1: destroy user and recreate?
        // Option 2: unseed user and reseed user on test database

    .send({ query: 'mutation { userUpdate(id: 2, image: "https://en.pimg.jp/045/948/028/1/45948028.jpg", description: "Tattooed seitan waistcoat austin asymmetrical chambray hot chicken man bun poke", address_line1: "5678 Here Ave", address_line2: "", city: "Pueblo", state: "CO", zipcode: 85623 ) { id image description address_line1 address_line2 city state zipcode } }'})
    .send({ query: 'mutation { userRemove(id: 2) { id } }'})
    .send({ query: 'mutation { userSignup(name: "The User", email: "user@crate.com", password: "123456", image: "https://en.pimg.jp/045/948/028/1/45948028.jpg", description: "Tattooed seitan waistcoat austin asymmetrical chambray hot chicken man bun poke", address_line1: "5678 Here Ave", city: "Pueblo", state: "CO", zipcode: 85623 ) { name email password image description address_line1 address_line2 city state zipcode } }'})
    .send({ query: 'mutation { userUpdate(id: 2) { id } }'})
    .then(() => {
      done();
    });
  });

  it('Update attributes for user id = 2', (done) => {
    request.post('/graphql')
    .send({ query: 'mutation { userUpdate(id: 2, image: "updated_img.png", description: "new me" ) { id image description address_line1 address_line2 city state zipcode } }'})
    .expect(200)
    .end((err,res) => {
        if (err) return done(err);
        res.body.data.userUpdate.should.have.property('image')
        expect(res.body.data.userUpdate.image).to.eq('updated_img.png')

        res.body.data.userUpdate.should.have.property('description')
        expect(res.body.data.userUpdate.description).to.eq('new me')
        done();
    })
  });
});
