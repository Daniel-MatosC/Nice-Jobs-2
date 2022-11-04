import * as express from "express";

declare global {
  namespace Express {
    interface Request {
      user: {
        userId?: string;
        email?: string;
        isActive?: boolean;
        isPremium?: boolean;
        isOffering?: boolean;
      };
    }
  }
}
