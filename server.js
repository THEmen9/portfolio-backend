import express from 'express';
import cors from 'cors';

import { projectsData, aboutContent } from './data.js';
    

const app = express();

// --------middlewares----------//
app.use(cors());
app.use(express.json())

//-----------------------Routes---------------------------//

// All Project Route----//
app.get('/api/projects', (req, res) => {
    res.json(projectsData);
});

//Single-Project-byId--------//
app.get('/api/projects/:id', (req, res) => {
  const id = req.params.id; 
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

// ---------------POST route----------------//
app.post('/api/contact', (req, res) => {
  const { name, email, message } = req.body;
  
  if (!name || !email || !message) { 
    return res.status(400).json({ 
      error: 'All fields required' 
    });
   } 

   res.status(200).json({
    message: 'Message received successfully'
  });

});

app.listen(5000, () => {
  console.log('Server running on port 5000');
});