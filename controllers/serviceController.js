const Service = require('../models/service');
const ServicePrice = require('../models/ServicePrice');
const Category = require('../models/category');

exports.createService = async (req, res) => {
  const { name, type, priceOptions } = req.body;
  const category = await Category.findByPk(req.params.categoryId);
  if (!category) return res.status(404).json({ message: 'Category not found' });

  const service = await Service.create({ name, type, CategoryId: category.id });

  if (priceOptions?.length) {
    for (let option of priceOptions) {
      await ServicePrice.create({ ...option, ServiceId: service.id });
    }
  }

  res.json(service);
};

exports.getServices = async (req, res) => {
  const services = await Service.findAll({
    where: { CategoryId: req.params.categoryId },
    include: ServicePrice
  });
  res.json(services);
};

exports.updateService = async (req, res) => {
  const service = await Service.findOne({ where: { id: req.params.serviceId, CategoryId: req.params.categoryId } });
  if (!service) return res.status(404).json({ message: 'Service not found' });

  const { name, type, priceOptions } = req.body;
  service.name = name;
  service.type = type;
  await service.save();

  await ServicePrice.destroy({ where: { ServiceId: service.id } });
  if (priceOptions?.length) {
    for (let option of priceOptions) {
      await ServicePrice.create({ ...option, ServiceId: service.id });
    }
  }

  res.json(service);
};

exports.deleteService = async (req, res) => {
  const service = await Service.findOne({ where: { id: req.params.serviceId, CategoryId: req.params.categoryId } });
  if (!service) return res.status(404).json({ message: 'Service not found' });

  await service.destroy();
  res.json({ message: 'Service deleted' });
};
