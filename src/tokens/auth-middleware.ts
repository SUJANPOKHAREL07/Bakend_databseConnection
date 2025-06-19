import { Request, Response, NextFunction } from "express";
import {  generateToken, verifyToken, veriRefreshToken } from "./jwt";
import sessionModal from "../MongoDBModule/sessionModal/sessionMoongoDB";
import { getToken } from "../MongoDBModule/sessionModal/sessioonService";

declare module "express-serve-static-core" {
  interface Request {
    user?: any; // You can replace `any` with a specific type if you have one
  }
}

export async function authmMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    console.log("entered middleware")
    const authoHeaader =
    req.headers.authorization || req.cookies["refresh_token"];
    //  `Bearer eyldjkjaghhfkna.fhjakhfja.fhaj`;

    if (!authoHeaader) {
      res.status(401).json({
        message: "Token not found in header",
      });
      return;
    }

    if (typeof authoHeaader !== "string") {
      res.status(401).json({
        message: "Token is not a string",
      });
      return;
    }
    const token = authoHeaader;
    // const token = authoHeaader?.split(" ")[1] || "";

    // if (!token) {
    //   res.status(401).json({
    //     message: "Token not found",
    //   });
    //   return;
    // }
    const payload = veriRefreshToken(token);

    const checkInTable = await getToken({ token: authoHeaader });
    if (!checkInTable) {
      res.status(401).json({
        message: "Cannot find the token",
      });
      return;
    }
    const newAccessToekn = generateToken({email:payload.email})
    res.cookie("authorization",newAccessToekn,{
      httpOnly: true,
      sameSite:'lax',
      secure:true,
      expires:new Date(Date.now()+100*1000)
    })

    req.user = payload;

    next();
  } catch (error) {
    console.error(error);
    if ((error as any).name === "TokenExpiredError") {
      next({
        status: 400,
        message: "Token expired",
      });
      return;
    }
    if ((error as any).name === "JsonWebTokenError") {
      next({
        status: 400,
        message: "Invalid token",
      });
      return;
    }

    next({ message: "Internal server error", status: 500 });
  }
}
