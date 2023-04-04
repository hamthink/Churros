require('dotenv').config();
const express = require('express');
const connect = require('../db/index');
const Log = require('../db/logSchema');
const NewsData = require('../db/dataSchema');

const router = express.Router();

const category = ['정치', '경제', '사회', '생활/문화', 'IT/과학', '연예'];
const sub_category = {
  '정치' : ['대통령실', '국회/정당', '북한', '행정', '국방/외교', '정치일반'],
  '경제' : ['금융', '증권', '산업/재계', '증기/벤처', '부동산', '글로벌 경제', '생활경제', '경제 일반'],
  '사회' : ['사건사고', '교육', '노동', '언론', '환경', '지역', '인물', '사회 일반'],
  '생활/문화' : ['생활문화 일반'],
  'IT/과학' : ['모바일', '인터넷/SNS', '통신/뉴미디어', 'IT 일반', '보안/해킹', '컴퓨터', '게임/리뷰', '과학 일반'],
  '연예' : ['연예가화제', '방송/TV', '드라마', '뮤직', '해외연예']
}

connect();

router.get('/success', async (req, res) => {
  try {
    // const logs = await Log.findOne({});
    const logs = await Log.find({ date: { $gte: new Date('2023-03-02') }, level: 'ERROR' });
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