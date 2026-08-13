import express from 'express';
import { aboutContent } from '../data.js';

const router = express.Router();

//About------------//
router.get('/', (req, res) => {
    res.json(aboutContent);
});

export default router;