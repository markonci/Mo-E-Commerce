import * as z from "zod";
export const UpdateLoggedUser=z.object({
    name: z
      .string()
      .nonempty("this input can't be empty")
      .min(2, " must min length 2")
      .max(10, "max length 10 my friend 🖤"),
    email: z.email().nonempty("this input can't be empty"),
 phone: z
      .string()
      .nonempty("this input can't be empty")
      .regex(/^(01[0125][0-9]{8})$/,'Must be a valid Egyptian mobile number'),
 })
export type UpdateLoggedUserSchemaType=z.infer<typeof UpdateLoggedUser>
