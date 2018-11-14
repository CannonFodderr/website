const bcrypt = require('bcrypt');

module.exports = {
    hashed: async function (dataString){
        
        let x = await bcrypt.genSalt()
        .then((s)=>{
            let data = null;
            let hashedPassword = bcrypt.hashSync(dataString, s);
            data = { hashedPassword: hashedPassword, salt: s };
            return data
        })
        .catch( e => { console.error(e)});
        return x;
        
    }
}