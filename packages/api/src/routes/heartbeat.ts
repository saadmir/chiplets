import express from 'express'

const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).end();
});

router.head('/', (req, res) => {
  res.status(200).end();
});

export default router;
