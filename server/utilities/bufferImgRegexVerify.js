const testUploads = (buffer) => {
    return new Promise((resolve, reject)=>{
        let bufferStart = new Buffer.alloc(10)
        for(let i = 0; i <= 10; i++){
            bufferStart[i] += buffer[i]
        }
        let fileString = bufferStart.toString('utf8')
        let imgRegex = new RegExp(/JFIF|PNG|JPEG/)
        let regIndex = imgRegex.exec(fileString);
        if(!regIndex){
            return reject(false)
        } else {
            return resolve(true)
        }
    }).catch(e => {console.error(e)});
}

module.exports = testUploads;