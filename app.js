const express = require('express');
const app = express();
const sequelize = require('./config/db');
// const User = require('./models/User');
// const Category = require('./models/category');
// const Service = require('./models/service');
// const ServicePrice = require('./models/ServicePrice');

app.use(express.json());

// Routes
app.use('/api', require('./routes/auth'));
app.use('/api', require('./routes/category'));
app.use('/api', require('./routes/service'));

app.get('/', (req, res) => {
  res.send('API is running...');
});
// Sync and start
sequelize.sync().then(() => {
  app.listen(process.env.PORT || 5000, () => console.log(`Server running on port ${process.env.PORT}`));
});
 