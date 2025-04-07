const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
require('dotenv').config();

exports.login = async (req, res) => {
  const { email, password } = req.body;

  if (email !== 'admin@codesfortomorrow.com' || password !== 'Admin123!@#') {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  let user = await User.findOne({ where: { email } });
  if (!user) {
    const hash = await bcrypt.hash(password, 10);
    user = await User.create({ email, password: hash });
  }

  const token = jwt.sign({ id: user.id, email }, process.env.JWT_SECRET, { expiresIn: '1d' });
  res.json({ token });
};
