import express from 'express';
import Contact from './../models/Contact.js';
import sendEmail from '../utils/sendEmail.js';

const router = express.Router();

// ---------------POST route----------------//
router.post('/', async(req, res) => {
  try{
  const { name, email, message } = req.body;
  
  if (!name || !email || !message) { 
    return res.status(400).json({ 
      error: 'All fields required' 
    });
   } 
   const newContact = await Contact.create({ name, email, message });
   sendEmail({
      to: process.env.EMAIL_USER,
      subject: 'New Contact Form Submission',
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
    }).catch(err =>
       console.error('Email failed:', err)
      );
    res.status(201).json(newContact);

  } catch (err) {
    res.status(500).json({ err: 'Internal server error' });
}
});
export default router;