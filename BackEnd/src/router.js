import { Router } from "express";
import authRoutes from "./routes/auth.routes.js";
import Sentiment from "sentiment"
import adminRoutes from "./routes/admin.routes.js";
import passengerRoutes from "./routes/passenger.routes.js";
import driverRoutes from "./routes/passenger.routes.js";

import { request, response } from "express";

const sentiment = new Sentiment();

const router = Router();

router.use('/auth', authRoutes);

router.post('/ai', async (req, res) => {
    const { reviews } = req.body;
    if (!Array.isArray(reviews) || reviews.length === 0) {
      return res.status(400).json({ error: 'An array of texts is required' });
    }
  
    const results = reviews.map(text => {
      const result = sentiment.analyze(text);
      let sentimentLabel = 'Neutral';
      if (result.score > 0) sentimentLabel = 'Positive';
      else if (result.score < 0) sentimentLabel = 'Negative';
      return { score: result.score, sentiment: sentimentLabel };
    });
  
    const avgScore = results.reduce((sum, r) => sum + r.score, 0) / results.length;
    res.json({ averageScore: avgScore, results });
  });
// router.use('/admin', adminRoutes);
// router.use('/passenger', passengerRoutes);
// router.use('/driver', driverRoutes);
router.get('/', (req, res) => {
    res.send('api is working') });

export default router;