import express from 'express';
import { projectsData } from '../data.js';

const router = express.Router();

// All Project Route----//
router.get('/', (req, res) => {
    res.json(projectsData);
});

//Single-Project-byId--------//
router.get('/:id', (req, res) => {
  const id = req.params.id; 
  const project = projectsData.find((p) => p.id === Number(id));
    if(!project) {
      return res.status(404).json({error: 'Project not found' })
    }else{
      res.json(project)
    }
});

export default router;