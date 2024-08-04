import zod from "zod";
const signinSchema = zod.object({
    email: zod.string().email(),
    password: zod.string().min(8).max(15)
});

const signUpSchema = zod.object({
    email: zod.string().email(),
    password: zod.string().min(8).max(15),
    role: zod.enum(["ADMIN", "STUDENT"])
})
const registerForEventSchema = zod.object({
    eventId: zod.string(),
    userId: zod.string()
});
const addEventSchema = zod.object({
    title:zod.string(),
    description:zod.string(),
    venue:zod.string(),
    date:zod.string(),
    clubId:zod.string()
})
export { signUpSchema, signinSchema, registerForEventSchema, addEventSchema}