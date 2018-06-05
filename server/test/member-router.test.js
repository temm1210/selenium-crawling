
var Member = require('../model/Member');
var chai = require('chai');
var chaiHttp = require('chai-http');
var sinon = require('sinon');
var jwtSign = require('../passport-jwt/jwt');
var server = require('../micro-server/member-micro');
var should = chai.should();
var expect = chai.expect

chai.use(chaiHttp);

describe('it is member-micro test', () => {
    beforeEach((done) => {
        Member.remove({}, (err) => {
            if(err) return done(err);
            else done();
        })
    }); //beforeEach

    describe('/member GET test ', () => {
        it('it shoud GET one member', (done) => {
            let member = {
                id:"idtest",
                password:"pwdtest",
                joindate: new Date('5/31/2018')
            }

            Member.create(member, (err, data) => {     
                chai.request(server)
                    .get(`/member/${member.id}`)
                    .end((err, res) => {
                        if(err) return done(err);
                        expect(res.body.message).to.be.equal("GET MEMBER success");
                        expect(res.body.result).to.be.true;
                        done();
                    })
            })
        })//it
    })//describe(GET member)

    describe('/member/sign POST test', () => {
        it('it should return token, result, singin member', (done) => {
            let member = {
                id:"idtest",
                password:"pwdtest"
            }

            Member.create(member, (err, data) => {
                chai.request(server)
                    .post('/member/singin')
                    .send(member)
                    .end((err, res) => {
                        let comparePasswordStub = sinon.stub(data, "comparePassword").returns(true);
                        let jwtSignStub = sinon.stub(jwtSign)
                        done();
                    })
            })
        })
    })
})