import * as z from 'zod'

export const changePasswordSChema=z.object({
    currentPassword:z.string().nonempty().min(6,"min length 6 characters"),
    password:z.string().nonempty().min(6,"min length 6 characters"),
    rePassword:z.string().nonempty().min(6,"min length 6 characters"),
}).refine((x) => x.password === x.rePassword, {
      error: "password and rePassword not matched 😢!!",
      path: ["rePassword"],
    });

    export type changePasswordSChemaType=z.infer<typeof changePasswordSChema>