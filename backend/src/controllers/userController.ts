import { Request, Response } from "express";
import { signinSchema,signUpSchema } from "../zod";
import { PrismaClient } from '@prisma/client'
import bcrypt from "bcrypt";

const prisma = new PrismaClient();
const signin = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    if(!email || !password) return res.status(403).json({ msg:"Missing email or password"});
    const resFromZod = signinSchema.safeParse({ email, password });
    if (!resFromZod.success) {
        return res.status(401).json({ msg: "zod error" });
    }
    try {
        const user = await prisma.user.findFirst({
            where: {
                email: email,
            }
        });
        if (!user) {
            return res.status(401).json({ msg: "Email or password is incorrect." });
        }
        
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ msg: "Email or password is incorrect." });
        }

        res.status(200).json({ msg: "Success!" });
    } catch (error: any) {
        res.status(500).json({ msg: "Error: " + error.message });
    }
}

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
