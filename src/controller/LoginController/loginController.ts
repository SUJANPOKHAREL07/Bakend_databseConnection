
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
        return res.status(404).json({ message: "User not found" });
      }

      
      const sessionID = crypto.randomUUID();

  
      const session = await createSession(sessionID, userID.toString());

      if (checkExistingMail.length === 0) {
        const saveLogindata = await storeLoginDetailsService(email, password);
        return res.status(200).json({
          message: "New user login stored",
          session,
        });
      } else {
        return res.status(200).json({
          message: "Welcome back",
          session,
        });
      }
    } else {
      return res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ message: "Unable to login" });
  }
};
