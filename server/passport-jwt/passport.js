var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var Member = require('../model/Member');
var secret = require('./passport-secret');

module.exports = function(passport) {
   
    var opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("jwt");
    opts.secretOrKey = secret;
   
    passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
        Member.findOne({id: jwt_payload.id}, (err, user) => {
            if(err) return done(err, false);
            if(user) done(null,user);
            else done(null,false);
        });    
    }));
}
