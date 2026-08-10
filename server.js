import express from 'express';
import cors from 'cors';

import { projectsData, aboutContent } from './data.js';
    

const app = express();
app.use(cors());

//-----------------------Routes---------------------------//

// All Project Route----//
app.get('/api/projects', (req, res) => {
    res.json(projectsData);
});

//Single-Project-byId--------//
app.get('/api/projects/:id', (req, res) => {
  const id = req.params.id; // ye string hoga, "1", "2" etc.
  const project = projectsData.find((p) => p.id === Number(id));
    if(!project) {
      return res.status(404).json({error: 'Project not found' })
    }else{
      res.json(project)
    }
});

//About------------//
app.get('/api/about', (req, res) => {
    res.json(aboutContent);
});

app.listen(5000, () => {
  console.log('Server running on port 5000');
});