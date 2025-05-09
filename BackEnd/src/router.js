import { Router } from "express";
import authRoutes from "./routes/auth.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import passengerRoutes from "./routes/passenger.routes.js";
import driverRoutes from "./routes/passenger.routes.js";

import { request, response } from "express";

const router = Router();

router.use('/auth', authRoutes);
router.use('/admin', adminRoutes);
router.use('/passenger', passengerRoutes);
router.use('/driver', driverRoutes);
router.get('/', (req, res) => {
    res.send('api is working')
});

export default router;