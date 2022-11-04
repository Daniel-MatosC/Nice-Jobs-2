import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const ensureIsOffering = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    jwt.verify(
      String(token),
      String(process.env.SECRET_KEY),
      (err: any, decoded: any) => {
        if (!decoded) {
          return res.status(401).json({ message: "Token Invalid" });
        }

        if (!decoded.isOffering) {
          return res.status(403).json({ message: "user not has Offering" });
        }

        req.user = {
          isOffering: decoded.isOffering,
        };

        next();
      }
    );
  } catch (error) {
    return res.status(403).json({ message: "Token Invalid" });
  }
};
