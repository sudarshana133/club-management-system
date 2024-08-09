import { Request, Response } from "express";
import { registerForEventSchema, signinSchema, signUpSchema } from "../zod";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { CustomReq } from "./middleware";

const prisma = new PrismaClient();
const signin = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(403).json({ msg: "Missing email or password" });
  const resFromZod = signinSchema.safeParse({ email, password });
  if (!resFromZod.success) {
    return res.status(401).json({ msg: "zod error" });
  }
  try {
    const user = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });
    if (!user) {
      return res.status(401).json({ msg: "Email or password is incorrect." });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ msg: "Email or password is incorrect." });
    }
    const token = jwt.sign(
      { id: user.uId, email: user.email, role: user.role },
      process.env.JWT_SECRET as string
    );
    res.cookie("token", token, {
      // httpOnly: true,
      // secure: process.env.NODE_ENV === 'production',
      sameSite: "strict",
      maxAge: 3600 * 24 * 1000,
    }).status(200).json({
      msg: "Success!"
    });
  } catch (error: any) {
    res.status(500).json({ msg: "Error: " + error.message });
  }
};

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
  try {
    const response = await prisma.user.findFirst({
      where: {
        email: userDetails.email,
      },
    });
    if (response) {
      return res.status(400).json({
        msg: "user exists",
      });
    }
  } catch (err) {
    return res.status(400).json({
      msg: "couldnt search the database",
    });
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

const eventRegistration = async (req: CustomReq, res: Response) => {
  const { eventId } = req.body;
  const userId = (req.userId || "") as string;
  if (!eventId || !userId)
    return res.status(403).json({ msg: "Missing event id and user id" });
  const resFromZod = registerForEventSchema.safeParse({ eventId, userId });
  if (!resFromZod.success) return res.status(403).json({ msg: "zod error" });

  try {
    const user = await prisma.user.findFirst({ where: { uId: userId } });
    if (!user) return res.status(404).json({ msg: "user not found" });

    const event = await prisma.event.findFirst({ where: { uId: eventId } });
    if (!event) return res.status(404).json({ msg: "Event not found" });

    const response = await prisma.registeredEvent.create({
      data: {
        userId,
        eventId,
      },
    });
    return res.status(200).json({
      msg: "registered succesfully",
    });
  } catch (error: any) {
    res.status(500).json({ msg: "Error" + error.message });
  }
};
export { signin, signup, eventRegistration };
