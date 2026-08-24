import express from 'express';

import verifyAdmin from '../middlewares/verifyAdmin.js'
import upload from "../middlewares/upload.js";
import uploadToCloudinary from "../utils/uploadToCloudinary.js";
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

  //---------------featured-project-----------//
  router.get("/featured", async (req, res) => {
    try {
    const featured = await Project.find({ featured: true });
    res.json(featured);
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
  router.post('/',verifyAdmin, upload.array("images", 5), async (req, res) => {
    try {
      const uploadPromises = req.files.map((file) => uploadToCloudinary(file.buffer));
      const imageUrls = await Promise.all(uploadPromises);
      
      const newProject = await Project.create(
        {...req.body, images: imageUrls}
    );
      res.status(201).json(newProject);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });

  //---------------PUT(update)route---------------//
  router.put('/:id', verifyAdmin, upload.array("images", 5), async (req, res) => {
    try {
      const updateData = { ...req.body };

      if (req.files.length > 0) {
      const uploadPromises = req.files.map((file) => uploadToCloudinary(file.buffer));
      updateData.images = await Promise.all(uploadPromises);
    }

      const updated = await Project.findByIdAndUpdate(
      req.params.id, 
      updateData,
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
  });

  //-----------Featured-Route--------------
  router.patch("/:id/featured", verifyAdmin, async (req, res) => {
    try {
      if (typeof req.body.featured !== "boolean") {
      return res.status(400).json({ error: "featured must be a boolean" });
      }
      const updated = await Project.findByIdAndUpdate(
      req.params.id, 
      { featured: req.body.featured },
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

export default router;