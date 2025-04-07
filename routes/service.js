const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const {
  createService, getServices, updateService, deleteService
} = require('../controllers/serviceController');

router.get('/category/:categoryId/services', auth, getServices);
router.post('/category/:categoryId/service', auth, createService);
router.put('/category/:categoryId/service/:serviceId', auth, updateService);
router.delete('/category/:categoryId/service/:serviceId', auth, deleteService);

module.exports = router;
