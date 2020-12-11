const chai = require('chai');

const expect = chai.expect;
const should = chai.should();
const url = `http://localhost:8000/`;
const request = require('supertest')(url);

describe('User queries', () => {
  it('gets information for specific user', (done) => {
    request.post('/graphql')
    .send({ query: '{ user(id: 2) { image email description } }'})
    .expect(200)
    .end((err,res) => {
        if (err) return done(err);
        res.body.data.user.should.have.property('image')
        expect(res.body.data.user.image).to.eq('https://en.pimg.jp/045/948/028/1/45948028.jpg')

        res.body.data.user.should.have.property('email')
        expect(res.body.data.user.email).to.eq('user@crate.com')

        res.body.data.user.should.have.property('description')
        expect(res.body.data.user.description).to.eq('Tattooed seitan waistcoat austin asymmetrical chambray hot chicken man bun poke')
        done();
    })
  });

  it('gets information for all users', (done) => {
    request.post('/graphql')
    .send({ query: '{ users { id image email description} }'})
    .expect(200)
    .end((err,res) => {
        if (err) return done(err);
        res.body.data.users.should.be.a('array')

        const admin = res.body.data.users.find(user => {return user.id === 1});
  
        admin.should.have.property('image')
        expect(admin.image).to.eq('https://do.lolwot.com/wp-content/uploads/2015/06/18-hilarious-and-bizarre-stock-photos-15.jpg')

        admin.should.have.property('email')
        expect(admin.email).to.eq('admin@crate.com')

        admin.should.have.property('email')
        expect(admin.description).to.eq("I'm baby meggings church-key neutra, coloring book kitsch banh mi slow-carb pop-up irony snackwave")
        done();
    })
  });
});
