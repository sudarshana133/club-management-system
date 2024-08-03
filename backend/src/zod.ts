import zod from "zod"


const signUpSchema = zod.object({
    email:zod.string().email(),
    password:zod.string().min(8).max(15),
    role:zod.enum(["ADMIN","STUDENT"])
})

export {signUpSchema}