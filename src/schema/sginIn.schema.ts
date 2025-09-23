import * as z from "zod";

export const sgininschema = z
  .object({
    
    email: z.email().nonempty("this input can't be empty"),
    password: z
      .string()
      .min(6, "must be at least 6 chars my friend 🖤")
      .nonempty("this input can't be empty"),
    
  })
  
export type sgininSchemaType=z.infer<typeof sgininschema>
