import * as z from 'zod';
export const verfyCode = z
  .object({
    
    resetCode: z.string().min(1,'min one number')

  })
  
export type verfyCodeType=z.infer<typeof verfyCode>
