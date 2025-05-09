import express from "express";
import cors from 'cors';
import router from "./router.js";

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api', router);

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server Running at http://localhost:${PORT}`);
});

export default app;