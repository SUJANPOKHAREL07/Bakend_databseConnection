import { Request, Response } from "express";
import crypto from "crypto"; // to generate session ID
import {
  checkUserFromLogin,
  checkUserget,
  storeLoginDetailsService,
} from "../../MongoDBModule/userCredentials/loginCredentials";
import {
  createSession,
  getusersByEmailService,
} from "../../MongoDBModule/sessionModal/sessioonService";

export const createLogin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const getLogindetails = await checkUserget(email, password);
    console.log("Login details:", getLogindetails);

    if (getLogindetails && getLogindetails.length > 0) {
      const checkExistingMail = await checkUserFromLogin(email);

      const userID = await getusersByEmailService(email);
      if (!userID) {
         res.status(404).json({ message: "User not found" });
         return
      }

     

      if (checkExistingMail.length === 0) {
         const sessionID = crypto.randomUUID();

      const session = await createSession(sessionID, userID.toString());
      const EXPIRY_TIME_IN_SECONDS = 500;
      res.cookie("authorization", sessionID, {
        path: "/",
        httpOnly: true,
        expires: new Date(Date.now() + EXPIRY_TIME_IN_SECONDS * 1000),
        sameSite: "lax",
        // secure: process.env["ENVIRONMENT"] === "prod",
        secure:true
      });
      // res.json("Cookies"); 
        const saveLogindata = await storeLoginDetailsService(email, password);
         res.status(200).json({
          message: "New user login stored",
          session,
        });return
      } else {
        //  res.status(200).json({
        //   message: "Old User Logged in",
        //   session,
        // });return
        res.status(401).json({ message: "Cannot login again" });
      }
    } else {
       res.status(401).json({ message: "Invalid credentials" });
       return
    }
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Unable to login" });
    return
  }
};
