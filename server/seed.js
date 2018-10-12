const User = require('./models/user');
const bcrypt = require('bcrypt');

// ***********************************
// Force create table & seed the Admin
// ***********************************

User.sync({force: true, alter: true}).then(()=>{
    bcrypt.genSalt().then((s)=>{
        let hashedPassword = bcrypt.hashSync('password', s)
        User.create({ username: 'Admin', password: hashedPassword, salt: s, isAdmin: true});
        
    })
});

