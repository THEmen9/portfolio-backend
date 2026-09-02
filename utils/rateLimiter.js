import rateLimit from 'express-rate-limit';

export const createLimiter = (windowMs, max, message) => 
  rateLimit({
     windowMs, max, message: { error: message } 
    });


