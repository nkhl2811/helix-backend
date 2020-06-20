const db = require('../models');
const users = db.users;
const jwt = require('jsonwebtoken');

module.exports.showFlag = (req, res) => {

    jwt.verify(req.token, 'SECRET_KEY', (err, authData) => {
        if (err) {
            res.status(403).json({ message: 'Token Verification Failed' });
        } else {
            users.findAll({ where : {userid : authData['userid']}, attributes:['notification_flag'] }).then(record => {
                return res.status(200).json(record);
            }).catch(err => {
                console.log(err);
                return res.status(500).json({ success: false, message: 'Server error' });
            })
        }
    })


}