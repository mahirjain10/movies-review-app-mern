const crypto = require('crypto')
exports.generateOtp=()=>{
    return Math.floor(Math.random()*999999).toString();;
}

exports.generateRandomByte = () => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(30, (err, buff) => {
        if (err) reject(err);
        const buffString = buff.toString("hex");
  
        console.log(buffString);
        resolve(buffString);
      });
    });
  };