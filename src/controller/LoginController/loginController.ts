import { Request, Response } from "express";
import crypto from "crypto"; // to generate session ID
import {
  checkUserEmail,
  checkUserFromLogin,
  // checkUserget,
  storeLoginDetailsService,
} from "../../MongoDBModule/userCredentials/loginCredentials";
import {
  createSession,
  getusersByEmailService,
} from "../../MongoDBModule/sessionModal/sessioonService";
import {
  generateToken,
  refreshGenerateToken,
  Tokenload,
} from "../../tokens/jwt";

export const createLogin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await checkUserEmail(email);
    console.log("Login details:", user);
    const userpassword = await checkUserEmail(password);
    console.log("Login details:", userpassword);

    if (user && user.length > 0) {
      const checkExistingMail = await checkUserFromLogin(email);

      const userID = await getusersByEmailService(email);
      if (!userID) {
        res.status(404).json({ message: "User not found" });
        return;
      }

      if (checkExistingMail.length === 0) {
        // const sessionID = crypto.randomUUID();

        // console.log("this is the session",session)
        const userPayload: Tokenload = {
          email: user[0]?.email ?? "",
        };
        console.log("this is payload", userPayload);

        const token = generateToken(userPayload);
        console.log("this is token", token);
        const EXPIRY_TIME_IN_SECONDS = 100;
        res.cookie("authorization", token, {
          path: "/",
          httpOnly: true,
          expires: new Date(Date.now() + EXPIRY_TIME_IN_SECONDS * 1000),
          sameSite: "lax",
          // secure: process.env["ENVIRONMENT"] === "prod",
          secure: true,
        });

        // Refresh token cookies

        const refreshToken = refreshGenerateToken(userPayload);
        const session = await createSession(refreshToken, userID.toString());
        const REFRESH_EXPIRE_TOKEN = 7 * 24 * 60 * 60;
        res.cookie("refresh_token", refreshToken, {
          path: "/",
          httpOnly: true,
          expires: new Date(Date.now() + REFRESH_EXPIRE_TOKEN * 1000),
        });

        // res.json("Cookies");
        const saveLogindata = await storeLoginDetailsService(email, password);
        res.status(200).json({
          message: "New user login stored",
          token,
        });
        return;
      } else {
        //  res.status(200).json({
        //   message: "Old User Logged in",
        //   session,
        // });return
        res.status(401).json({ message: "Cannot login again" });
      }
    } else {
      res.status(401).json({ message: "Invalid credentials" });
      return;
    }
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Unable to login" });
    return;
  }
};
