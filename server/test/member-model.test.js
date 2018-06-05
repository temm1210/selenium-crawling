
var Member = require('../model/Member');
var chai = require('chai');
var expect = chai.expect;
var mongoose = require('mongoose');

describe('Membermodel', () => {
    beforeEach((done) => {
        mongoose.connect('mongodb://localhost/test-member-model');
        const db = mongoose.connection;
        db.once('open', () => {
            console.log(`test MongoDB is Open`)
            Member.remove({}, (err) => {
                if(err) return done(err);
                done();
            })
        })
    })

    describe("comparePassword test", () => {
        it('it should return true ', (done) => {
            let member = {
                id:"idtest",
                password:"pwdtest",
                joindate: new Date('5/31/2018')
            };

            Member.create(member, (err, data) => {
                data.comparePassword(member.password, (err,isMatch) => {
                    expect(isMatch).to.be.true;
                    done();
                })
            });
        })//it
    })//describe(comparePassword test)
})