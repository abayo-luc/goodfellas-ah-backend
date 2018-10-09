import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import { app } from '../server';
import { resetDB } from './resetTestDB';

chai.use(chaiHttp);

let jwtToken;

describe('Social Login Authentication', () => {
  after((done) => {
    resetDB();

    done();
  });

  // GOOGLE SOCIAL AUTHENTICATION
  describe('Should sign up user', () => {
    it('should sign up and authorize a new user with a google account', (done) => {
      chai
        .request(app)
        .post('/api/auth/google')
        .send({ access_token: 'googleauthtoken' })
        .end((err, res) => {
          jwtToken = res.body.token;
          expect(res.status).to.equal(201);
          expect(res.body.message).to.equal('Successfully created your account');
          expect(res.body.token).to.be.a('string');
          done();
        });
    });

    it('should sign not sign up a user with a wrong or expired access token', (done) => {
      chai
        .request(app)
        .post('/api/auth/google')
        .send({ access_token: 'wronggoogleauthtoken' })
        .end((err, res) => {
          expect(res.error.status).to.equal(401);
          expect(res.error.text).to.equal('Unauthorized');
          expect(res.error.text).to.be.a('string');
          done();
        });
    });

    it('should allow authenticated user access protected route', (done) => {
      chai
        .request(app)
        .get('/api/articles')
        .set({ authorization: jwtToken, Accept: 'application/json' })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.message).to.equal('All Articles Retrieved Successfully');
          done();
        });
    });
  });

  describe('Should sign in user', () => {
    it('should sign in and authorize an existing user with a google account', (done) => {
      chai
        .request(app)
        .post('/api/auth/google')
        .send({ access_token: 'googleauthtoken' })
        .end((err, res) => {
          jwtToken = res.body.token;
          expect(res.status).to.equal(200);
          expect(res.body.message).to.equal('Successfully signed in');
          expect(res.body.token).to.be.a('string');
          done();
        });
    });

    it('should sign not sign in a user with a wrong or expired access token', (done) => {
      chai
        .request(app)
        .post('/api/auth/google')
        .send({ access_token: 'notfacebookauthtoken' })
        .end((err, res) => {
          expect(res.error.status).to.equal(401);
          expect(res.error.text).to.equal('Unauthorized');
          expect(res.error.text).to.be.a('string');
          done();
        });
    });

    it('should allow authenticated user access protected route', (done) => {
      chai
        .request(app)
        .get('/api/articles')
        .set({ authorization: jwtToken, Accept: 'application/json' })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.message).to.equal('All Articles Retrieved Successfully');
          done();
        });
    });

    it('should not sign in a user with an email registered with another platform other than a google account', (done) => {
      chai
        .request(app)
        .post('/api/auth/google')
        .send({ access_token: 'googleauthtoken' })
        .end((err, res) => {
          jwtToken = res.body.token;
          expect(res.status).to.equal(400);
          expect(res.body.message).to.equal('You can\'t login through this platform');
          expect(res.body.message).to.be.a('string');
          done();
        });
    });
  });


  // FACEBOOK SOCIAL AUTHENTICATION
  describe('Should sign up user', () => {
    it('should sign up and authorize a new user with a facebook account', (done) => {
      chai
        .request(app)
        .post('/api/auth/facebook')
        .send({ access_token: 'facebookauthtoken' })
        .end((err, res) => {
          jwtToken = res.body.token;
          expect(res.status).to.equal(201);
          expect(res.body.message).to.equal('Successfully created your account');
          expect(res.body.token).to.be.a('string');
          done();
        });
    });

    it('should sign not sign up a user with a wrong or expired access token', (done) => {
      chai
        .request(app)
        .post('/api/auth/facebook')
        .send({ access_token: 'wrongfacebookauthtoken' })
        .end((err, res) => {
          expect(res.error.status).to.equal(401);
          expect(res.error.text).to.equal('Unauthorized');
          expect(res.error.text).to.be.a('string');
          done();
        });
    });

    it('should allow authenticated user access protected route', (done) => {
      chai
        .request(app)
        .get('/api/articles')
        .set({ authorization: jwtToken, Accept: 'application/json' })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.message).to.equal('All Articles Retrieved Successfully');
          done();
        });
    });
  });

  describe('Should sign in user', () => {
    it('should sign in and authorize an existing user with a facebook account', (done) => {
      chai
        .request(app)
        .post('/api/auth/facebook')
        .send({ access_token: 'facebookauthtoken' })
        .end((err, res) => {
          jwtToken = res.body.token;
          expect(res.status).to.equal(200);
          expect(res.body.message).to.equal('Successfully signed in');
          expect(res.body.token).to.be.a('string');
          done();
        });
    });

    it('should sign not sign in a user with a wrong or expired access token', (done) => {
      chai
        .request(app)
        .post('/api/auth/facebook')
        .send({ access_token: 'notfacebookauthtoken' })
        .end((err, res) => {
          expect(res.error.status).to.equal(401);
          expect(res.error.text).to.equal('Unauthorized');
          expect(res.error.text).to.be.a('string');
          done();
        });
    });

    it('should allow authenticated user access protected route', (done) => {
      chai
        .request(app)
        .get('/api/articles')
        .set({ authorization: jwtToken, Accept: 'application/json' })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.message).to.equal('All Articles Retrieved Successfully');
          done();
        });
    });

    it('should not sign in a user with an email registered with another platform other than a facebook account', (done) => {
      chai
        .request(app)
        .post('/api/auth/facebook')
        .send({ access_token: 'facebookauthtoken' })
        .end((err, res) => {
          jwtToken = res.body.token;
          expect(res.status).to.equal(400);
          expect(res.body.message).to.equal('You can\'t login through this platform');
          expect(res.body.message).to.be.a('string');
          done();
        });
    });
  });
});