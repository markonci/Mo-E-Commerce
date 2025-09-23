import * as z from 'zod';
export const forgotPassword = z
  .object({
    
    email: z.email().nonempty("this input can't be empty")

  })
  
export type forgotpasswordType=z.infer<typeof forgotPassword>
