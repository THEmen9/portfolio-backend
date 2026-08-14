import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
const router = express.Router();

//--------login route----------------//

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  //------Email check -----------//
  if (email !== process.env.ADMIN_EMAIL) {
    return res.status(401).json({
     message: 'Invalid email or password'
    });
  }

  //------- Password compare (only valid email )-----//
  const isMatch = await bcrypt.compare(password, process.env.ADMIN_PASSWORD_HASH);
  if (!isMatch) {
    return res.status(401).json({
     message: 'Invalid email or password'
    });
  }

  //----- Token sign (only after match)-------//
  const token = jwt.sign({
     email 
    }, process.env.JWT_SECRET, {
        expiresIn: '1d' 
    }
    );

  // -------- Cookie set (not in token JSON )-------//
  res.cookie('token', token, {
     httpOnly: true, maxAge: 24*60*60*1000 
    });
  res.status(200).json({
     message: 'Login successful' 
    });
});

export default router;