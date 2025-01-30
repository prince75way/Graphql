// tokenHelper.ts
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';    
dotenv.config();


export const validateToken = (token: string) => {
  return new Promise<any>((resolve, reject) => {
    jwt.verify(token, process.env.REFRESH_TOKEN_SECRET||"", (err:any, decoded:any) => {
      if (err) {
        reject('Invalid token');
      } else {
        resolve(decoded);
      }
    });
  });
};
