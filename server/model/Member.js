var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');

var MemberSchema = new Schema({
    id: { type: String, required: true, index:true, unique:true},
    password: { type: String, required: true},
    joindate: { type:Date, default: Date.now}
})

MemberSchema.pre('save', function(next) {
    var user = this;

    if(this.isModified('password') || this.isNwe){
        bcrypt.genSalt(10, (err, salt) => {
            if(err) return err;
            bcrypt.hash(user.password, salt, null, function(err, hash) {
                if(err) return err;
                user.password = hash;
                next();
            })
        })
    }
})

MemberSchema.method('comparePassword', function(pwd, callback) {
    bcrypt.compare(pwd, this.password, function(err, isMatch) {
        if(err) return callback(err,false);
        callback(null, isMatch);
    })
})

module.exports = mongoose.model('Member', MemberSchema);