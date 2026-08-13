import express from 'express';
const router = express.Router();


// ---------------POST route----------------//
router.post('/', (req, res) => {
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
export default router;