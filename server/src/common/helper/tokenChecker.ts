import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

// Middleware to validate access token
export const tokenChecker = (req: Request, res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;


  if ((!authHeader || !authHeader.startsWith('Bearer ')) &&  req.body.accessToken==="") {
    res.status(401).json({ message: 'Access token missing or invalid' });
    return; // End the function after sending the response
  }

  const token = authHeader ? authHeader.split(' ')[1] : req.body.accessToken;

  try {
    // Verify the access token
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!);
    next(); // Call next if the token is valid
  } catch (error: any) {
    if (error.name === 'TokenExpiredError') {
      res.status(401).json({ message: 'Access token expired', error: 'token_expired' });
    } else {
   
      res.status(401).json({ message: 'Invalid token' });
    }
  }
};
