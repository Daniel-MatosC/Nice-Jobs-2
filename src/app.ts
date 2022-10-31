import { handleErrorMiddleware } from './middlewares/erro.middleware';
import "reflect-metadata";
import express from "express";

const app = express();
app.use(express.json());
app.use('/testando', (req, res) => {
    
    res.send('Hello World');
});

app.use(handleErrorMiddleware)
export default app;
