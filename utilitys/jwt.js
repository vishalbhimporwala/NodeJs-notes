const jwt = require('jsonwebtoken')
function generateJwtToken(user){
    const payload = {
        _id : user._id,
        userName : user.userName,
        email : user.email
    };

    const option ={
      expiresIn : '1h',
      issuer : user.email,
      audience : "root"
    };
    return jwt.sign(payload,process.env.JWT_SECRET,option);
}

function getPayloadFromToken(accessToken){
  const payload = jwt.verify(accessToken,process.env.JWT_SECRET);
  return payload;
}

module.exports = {generateJwtToken,getPayloadFromToken};