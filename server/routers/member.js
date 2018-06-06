var express = require('express');
var router = express.Router();
var Member = require('../model/Member');
var passport = require('passport');
var jwt = require('jsonwebtoken');
var secret = require('../passport-jwt/passport-secret');
require('../passport-jwt/passport')(passport);

router.get('/', (req, res, next) => {
    Member.find((err, members) => {
        console.log('GOOOD')
        res.json(members);
    })
})

router.get('/:id', (req, res, next) => {
    Member.findOne({id:req.params.id}, (err, member) => {   
        if(member) {
            res.json({result: true, msg: member.id});
        }
        else {
            res.json({result: false, msg: null});
        }
    })
})

router.post('/signin', (req,res,next) => {
    Member.findOne({id:req.body.id}, (err, member) => {
        if(!member) res.json({result:false, msg:'User not exist with match info'})
        else { 
            member.comparePassword(req.body.password, (err, isMatch) => {
                if(isMatch && !err){
                    let token = jwt.sign(member.toJSON(), secret );
                    res.json({result: true, msg:'JWT ' + token});
                }else {
                    res.json({result:false, msg:'Password not match'});
                }

            })
        }
    })
})

router.post('/signup', (req, res, next) => {
    Member.create(req.body, (err, member) => {
        if(err) return res.json({result: false, msg: 'User save error'})
        res.json({result: true, msg: `환영합니다 ${member.id}님　회원가입에　성공하였습니다`});
    })
})

module.exports = router;