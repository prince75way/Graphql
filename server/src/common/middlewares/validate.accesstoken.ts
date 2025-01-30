import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const validateAccessToken = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.headers.authorization?.split(' ')[1]; // Assuming the token is in the format "Bearer <token>"
  
  if (!token) {
     res.status(401).json({ message: 'Access token required' });
     return;
  }
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { id: string };
    req.user = { id: decoded.id };  // Attach userId to req.user
    next(); // Proceed to the next middleware/controller
  } catch (err) {
     res.status(401).json({ message: 'Invalid or expired token' });
     return;
  }
};

export default validateAccessToken;
