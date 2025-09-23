import * as z from "zod";

export const CheckOutschema = z
  .object({
    
    city: z.string().nonempty("this input can't be empty").min(5,'min length 5 characters').max(30,'max length 5 characters'),
    details:z.string().nonempty("this input can't be empty").min(5,'min length 5 characters').max(30,'max length 5 characters'),
    phone: z
          .string()
          .nonempty("this input can't be empty")
          .regex(/^(01[0125][0-9]{8})$/,'Must be a valid Egyptian mobile number'),
    
  })
  
export type CheckOutschemaType=z.infer<typeof CheckOutschema>
