import express from 'express'

import GQLServer from '~api/services/gql'
import MongoDB from '~api/services/mongodb';
import OpenSearch from '~api/services/opensearch';

const router = express.Router();

router.use('/graphql', GQLServer);

router.get('/all', async (req, res) => {
  try {
    const results = await MongoDB.all();
    return res.json(results).status(200);
  } catch(err) {
    res.json({ Error: 'error during search' }).status(500).end();
  }
});

router.get('/search', async (req, res) => {
  console.log('search catalog.ts:21', '/search');
  try {
    const results = await LocalOpenSearch.search({keywords: req.query.keyword as string});
    return res.json(results).status(200);
  } catch(err) {
    res.json({ Error: 'error during search' }).status(500).end();
  }
});

// router.post('/find', async (req, res) => {
//   try {
//     const results = await MongoDB.select(req.body?.criteria);
//     return res.json(results).status(200);
//   } catch(err) {
//     res.json({ Error: 'error finding document' }).status(500).end();
//   }
// });


// router.get('/index', async (req, res) => {
//   try {
//     const allChips = await MongoDB.all({ searchable: true });
//     console.log('allChips.length', allChips.length);
//     await LocalOpenSearch.createIndex();
//     const result = await LocalOpenSearch.updateIndex(allChips);
//     res.json(result).status(200).end();
//   } catch(err) {
//     res.json({ Error: 'error during data indexing' }).status(500).end();
//   }
// });


export default router;
