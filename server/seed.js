const User = require('./models/user');
const bcrypt = require('bcrypt');

// ***********************************
// Force create table & seed the Admin
// ***********************************

// clear Table
User.destroy({
    where: {'username': 'Admin'}
});

// Create table and seed first Admin
User.sync({}).then(()=>{
    bcrypt.genSalt().then((s)=>{
        let hashedPassword = bcrypt.hashSync('123456', s)
        User.create({ username: 'Admin', password: hashedPassword, salt: s, isAdmin: true}).then((admin)=>{
            admin.save()
        })
        
    })
});

