require('dotenv').config();
const express = require('express');
const connect = require('../db/index');
const Log = require('../db/logSchema');
const NewsData = require('../db/dataSchema');

const router = express.Router();

connect();

router.get('/success', async (req, res) => {
  try {
    // const logs = await Log.findOne({});
    const logs = await Log.find({ date: { $gte: new Date('2023-04-02') }, level: 'ERROR' });
    // const logs = await db.collection('crawlingLog').find({ date: { $gte: new Date('2023-04-03') } }).toArray();
    // const logs = await Log.find({ date: { $gte: new Date('2023-04-03') } });
    res.json(logs);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

router.get('/fail', async (req, res) => {
  try {
    // const logs = await Log.findOne({});
    const news = await NewsData.find({ publish_date: { $gte: new Date('2023-03-28') }, cat1: '연예' });
    // const logs = await db.collection('crawlingLog').find({ date: { $gte: new Date('2023-04-03') } }).toArray();
    // const logs = await Log.find({ date: { $gte: new Date('2023-04-03') } });
    res.json(news);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});


module.exports = router;