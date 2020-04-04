import { Router } from 'express';
import { Guest, validateGuest } from './guest';
import _ from 'lodash';

const router = Router();

router.get('/', async (req, res) => {
  const guests = await Guest.find().sort('name');

  res.send(guests);
});

router.get('/stats', async (req, res) => {
  const guest = await Guest.findStats();

  res.send(guest);
});

router.get('/:id', async (req, res) => {
  const guest = await Guest.findById(req.params.id);
  if (!guest) return res.status(404).send('Invalid ID');

  res.send(guest);
});

router.post('/', async (req, res) => {
  const { error } = validateGuest(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const guest = new Guest(
    _.pick(req.body, 'name', 'email', 'phone', 'goingWith')
  );

  const result = await guest.save();

  res.send(result);
});

router.put('/:id', async (req, res) => {
  const { error } = validateGuest(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const guest = await Guest.findById(req.params.id);
  if (!guest) return res.status(404).send('Invalid ID');

  const { body } = req;

  guest.name = body.name;
  guest.email = body.email;
  guest.phone = body.phone;
  guest.goingWith = body.goingWith;

  const result = await guest.save();

  res.send(result);
});

export default router;
