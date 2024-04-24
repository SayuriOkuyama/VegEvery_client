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
    name: z
      .string()
      .min(2, {
        message: '※ ユーザー名は 2 文字以上で入力してください。',
      })
      .max(30, {
        message: '※ ユーザー名は 30 文字以内で入力してください。',
      }),
    password: z.string().optional(),
    passwordConfirmation: z.string().optional(),
    secretQuestion: z.string(),
    secretAnswer: z.string(),
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
      if (
        !data.secretQuestion ||
        data.secretQuestion.length < 2 ||
        data.secretQuestion.length > 100
      ) {
        if (!data.secretQuestion || data.secretQuestion.length < 2) {
          ctx.addIssue({
            message: '2 文字以上で入力してください。',
            path: ['secretQuestion'],
            code: z.ZodIssueCode.custom,
          })
        }
        if (data.secretQuestion.length > 100) {
          ctx.addIssue({
            message: '100 文字以内で入力してください。',
            path: ['secretQuestion'],
            code: z.ZodIssueCode.custom,
          })
        }
      }
      if (
        !data.secretAnswer ||
        data.secretAnswer.length < 1 ||
        data.secretAnswer.length > 100
      ) {
        if (!data.secretAnswer || data.secretAnswer.length < 1) {
          ctx.addIssue({
            message: '入力が必須です。',
            path: ['secretAnswer'],
            code: z.ZodIssueCode.custom,
          })
        }
        if (data.secretAnswer.length > 100) {
          ctx.addIssue({
            message: '100 文字以内で入力してください。',
            path: ['secretAnswer'],
            code: z.ZodIssueCode.custom,
          })
        }
      }
    }
  })
