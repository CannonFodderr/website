const bcrypt = require('bcrypt');

module.exports = {
    hashed: function (dataString){
        let data = null
        bcrypt.genSalt().then((s)=>{
            let hashedPassword = bcrypt.hashSync(dataString, s);
            data = { hashedPassword: hashedPassword, salt: s };
            return data
        })
    }
}