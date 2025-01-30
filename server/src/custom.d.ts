declare namespace Express {
    export interface Request {
      user?: { id: string }; // Type for the user attached to the request
    }
  }
  