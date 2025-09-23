import * as z from 'zod';
export const restpassword = z
  .object({
    
    email: z.email().nonempty("this input can't be empty"),
    newPassword: z
          .string()
          .min(6, "must be at least 6 chars my friend 🖤")
          .nonempty("this input can't be empty"),

  })
  
export type restpasswordType=z.infer<typeof restpassword>
