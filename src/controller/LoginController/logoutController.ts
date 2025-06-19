import { Request, Response } from "express";

import {
  checkUserFromLogin,
  storeLoginDetailsService,
} from "../../MongoDBModule/userCredentials/loginCredentials";
import { getusersByEmailService } from "../../MongoDBModule/sessionModal/sessioonService";
import {
  logoutUserLogin,
  logoutUserSession,
} from "../../MongoDBModule/userCredentials/logoutCredentials";
import { clear } from "console";
export async function logoutController(req: Request, res: Response) {
  try {
    const { email } = req.body;
    const checkExistingMail = await checkUserFromLogin(email);
    if (checkExistingMail.length !== 0) {
      console.log("user exist in login table");
        const userID = await getusersByEmailService(email);
    console.log(userID);

    if (!userID) {
      res.status(404).json("User not found");
      return;
    }
    const deleteDataAsLogout = await logoutUserLogin(email);
    const deleteSession = await logoutUserSession(userID.toString());
    res.clearCookie("authorization")
    res.clearCookie("refresh_token")
    res.json("Logout Successfuly.....");
    }else{
        res.status(400).json("No user found ")
    }
  
  } catch (err) {
    res.status(404).json("The logut error");
  }
}
