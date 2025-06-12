import { Request, Response } from "express";
import {
  checkUserFromLogin,
  checkUserget,
  storeLoginDetailsService,
} from "../../MongoDBModule/userCredentials/loginCredentials";

export const createLogin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const getLogindetails = await checkUserget(email, password);
    console.log(getLogindetails);

    if (getLogindetails && getLogindetails.length > 0) {
      const checkExistingMail = await checkUserFromLogin(email);
      if (checkExistingMail.length === 0) {
        const saveLogindata = await storeLoginDetailsService(email, password);
        res.status(200).json(saveLogindata);
      } else {
        res.status(200).json("You are old user Welcome Back")
        console.log("old user logged in");
      }

      res.status(200).json("Logged in");
    } else {
      res.status(401).json("Invalid credentials");
    }
  } catch {
    res.json("Unable to login");
  }
};
