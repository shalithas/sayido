import { Router } from 'express';
import { Payment, validate } from './payment.model';
import auth from '../../middlewares/auth';
import _ from 'lodash';
import { Service } from '../service/service.model';
import { Vendor } from '../vendor/vendor.model';

const router = Router();

router.get('/', auth, async (req, res) => {
  const payments = await Payment.find({
    userId: req.user._id,
  }).select('-userId');

  res.send(payments);
});

router.get('/stats', auth, async (req, res) => {
  const stats = await Payment.findStats(req.user._id);

  res.send(stats);
});

router.post('/', auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const { user } = req;

  const service = await Service.findById(req.body.serviceId);
  if (!service) return res.status(422).send('Service not found');

  const vendor = await Vendor.findById(req.body.vendorId);
  if (!vendor) return res.status(422).send('Vendor not found');

  const payment = new Payment({
    ..._.pick(req.body, 'amount'),
    userId: user._id,
    service,
    vendor,
  });

  const result = await payment.save();

  res.send(result);
});

router.put('/:id', auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const { user } = req;
  const { amount, serviceId, vendorId } = req.body;

  const service = await Service.findById(serviceId);
  if (!service) return res.status(422).send('Service not found');

  const vendor = await Vendor.findById(vendorId);
  if (!vendor) return res.status(422).send('Vendor not found');

  const payment = await Payment.findById(req.params.id);
  if (!payment) return res.status(422).send('Payment not found');

  if (user._id !== payment.userId)
    return res.status(401).send('Not authorized to update');

  payment.amount = amount;
  payment.service = service;
  payment.vendor = vendor;

  const result = await payment.save();

  res.send(result);
});

router.delete('/:id', auth, async (req, res) => {
  const payment = await Payment.findById(req.params.id);
  if (!payment) return res.status(422).send('Payment not found');

  const { user } = req;
  if (user._id !== payment.userId)
    return res.status(401).send('Not authorized to delete');

  const response = await Payment.deleteOne({ _id: req.params.id });
  if (response.deletedCount < 1) return res.status(404).send('Invalid IDs');

  res.send({
    success: true,
  });
});

export default router;
