import express from 'express';

import verifyAdmin from '../middlewares/verifyAdmin.js'
import Project from '../models/Project.js'

const router = express.Router();

// -----------All Project Route-------------//
router.get('/', async (req, res) => {
  try {
    const projects = await Project.find({});
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//-----------Single-Project-byId-------------//
router.get('/:id', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if(!project) {
      return res.status(404).json({error: 'Project not found' })
    }
      res.json(project)
  
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


//----------------POST new project_admin-------------//

router.post('/',verifyAdmin, async (req, res) => {
  try {
    const newProject = await Project.create(req.body);
    res.status(201).json(newProject);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//---------------PUT(update)route---------------//

router.put('/:id', verifyAdmin, async (req, res) => {
  try {
    const updated = await Project.findByIdAndUpdate(
    req.params.id, 
    req.body, 
    { new: true, runValidators: true }
  );
    if(!updated) {
      return res.status(404).json({error: 'Project not found' });
  };
    res.json(updated);
  } catch (err){
    res.status(400).json({ message: err.message });
  }
});

//---------------DELETE-Route--------------//
router.delete('/:id', verifyAdmin, async(req, res) =>{
    try{
      const deleted = await Project.findByIdAndDelete(req.params.id);
      if(!deleted) {
        return res.status(404).json({error: 'Project not found' });
    };
    res.json(deleted);
    } catch (err) {
       res.status(400).json({ message: err.message });
    }
})

export default router;