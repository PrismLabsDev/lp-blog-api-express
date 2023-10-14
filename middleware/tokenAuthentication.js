const jwt = require('jsonwebtoken');

const User = require('../models/User');

const auth = async (req, res, next) => {
  const authHeader = req.get("Authorization")

  if(!authHeader){
    return res.status(401).json({
			message: 'You are not authenticated.',
		});
  }

  const token = authHeader.split(" ")[1];
  const decoded = jwt.verify(token, process.env.AUTH_TOKEN);

  if(!decoded){
    return res.status(401).json({
			message: 'You are not authenticated.',
		});
  }

  if(!decoded.user){
    return res.status(401).json({
			message: 'You are not authenticated.',
		});
  }

  const user = await User.findById(decoded.user);

  if(!user.verified){
    return res.status(401).json({
			message: 'You are not verified.',
		});
  }

  req.user = user;

  next();
}

module.exports = auth;