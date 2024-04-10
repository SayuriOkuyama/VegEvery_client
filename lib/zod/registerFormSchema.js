import { z } from 'zod'

const ACCEPTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
]

export const registerFormSchema = z
  .object({
    account_id: z.string().optional(),
    // .refine(value => /^[A-Za-z0-9]+$/.test(value), {
    //   message: 'アカウント ID は 半角英数字で入力してください。',
    // }),
    // .optional()
    // .or(z.literal('')),
    name: z
      .string()
      .min(2, {
        message: '※ ユーザー名は 2 文字以上で入力してください。',
      })
      .max(30, {
        message: '※ ユーザー名は 30 文字以内で入力してください。',
      }),
    password: z.string().optional(),
    // .min(8, {
    //   message:
    //     '※ パスワードは半角英字、数字、記号を含めた 8 文字以上で入力してください。',
    // })
    // .max(225, {
    //   message: '※ 225 文字以内で入力してください。',
    // })
    // .refine(
    //   value =>
    //     /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+={}[\]:;"'<>,.?/~`-]).{8,}$/.test(
    //       value,
    //     ),
    //   {
    //     message:
    //       'パスワードは半角英字、数字、記号を含めた 8 文字以上で入力してください。',
    //   },
    // ),
    passwordConfirmation: z.string().optional(),
    //   .min(1, { message: 'パスワードを再入力して下さい。' })
    //   .max(255, { message: 'パスワードは 255 文字以内で入力して下さい。' }),
    // iconUrl: z
    //   .string()
    //   .url({
    //     message:
    //       'jpeg, jpg, png, webp のいずれかの画像ファイルを選択してください。',
    //   })
    //   .optional()
    //   .or(z.literal('')),
    iconFile: z
      .custom(
        file =>
          file instanceof File && ACCEPTED_IMAGE_TYPES.includes(file.type),
        {
          message:
            'jpeg, jpg, png, webp のいずれかの画像ファイルを選択してください。',
        },
      )
      .optional()
      .or(z.literal('')),
    vegeType: z.string(),
    provider: z.string().optional().or(z.literal('')),
    providerId: z.string().optional(),
    secretQuestion: z.string(),
    secretAnswer: z.string(),
  })
  .superRefine((data, ctx) => {
    if (!data.provider) {
      if (
        !data.account_id ||
        data.account_id.length < 8 ||
        data.account_id.length > 225 ||
        !/^[A-Za-z0-9]+$/.test(data.account_id)
      ) {
        ctx.addIssue({
          path: ['account_id'],
          message: 'アカウント ID は 半角英数字で入力してください。',
          code: z.ZodIssueCode.custom,
        })
      }
      if (
        !data.password ||
        data.password.length < 8 ||
        data.password.length > 225 ||
        !/^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+={}[\]:;"'<>,.?/~`-]).{8,}$/.test(
          data.password,
        )
      ) {
        ctx.addIssue({
          path: ['password'],
          message:
            'パスワードは半角英字、数字、記号を含めた 8 文字以上で入力してください。',
          code: z.ZodIssueCode.custom,
        })
      }
      if (data.password !== data.passwordConfirmation) {
        ctx.addIssue({
          message: 'パスワードが異なります。',
          path: ['passwordConfirmation'],
          code: z.ZodIssueCode.custom,
        })
      }
    }
  })
