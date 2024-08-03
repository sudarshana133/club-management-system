import { Request, Response } from "express";
import { signUpSchema } from "../zod";
import zod from "zod";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

const signin = (req: Request, res: Response) => {};
const signup = async (req: Request, res: Response) => {
  const body = req.body;
  const userDetails = {
    email: body.email,
    password: body.password,
    role: body.role,
  };
  const success = signUpSchema.safeParse(userDetails);
  if (!success.success) {
    return res.status(401).json({
      msg: "zod error",
    });
  }
  try{
    const response = await prisma.user.findFirst({
        where:{
            email:userDetails.email
        }
    });
    if(response){
        return res.status(400).json({
            msg:"user exists"
        })
    }
  }catch(err){
    return res.status(400).json({
        msg:"couldnt search the database"
    })
  }
  const hash = await bcrypt.hash(userDetails.password, 10);
  try {
    const response = await prisma.user.create({
      data: {
        email: userDetails.email,
        password: hash,
        role: userDetails.role,
      },
    });
  } catch (err) {
    return res.status(400).json({
      msg: "error while updating in the database",
    });
  }

  return res.status(200).json({
    msg: "user added",
  });
};
export { signin, signup };
