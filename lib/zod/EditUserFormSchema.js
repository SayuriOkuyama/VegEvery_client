import { z } from 'zod'

const ACCEPTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
]

export const EditUserFormSchema = z.object({
  account_id: z.string(),
  name: z
    .string()
    .min(1, {
      message: '※ 入力が必須です。',
    })
    .max(30, {
      message: '※ 30 文字以内で入力してください。',
    }),
  icon_path: z.string(),
  icon_url: z.string(),
  icon_file: z
    .custom(
      file => file instanceof File && ACCEPTED_IMAGE_TYPES.includes(file.type),
      {
        message:
          'jpeg, jpg, png, webp のいずれかの画像ファイルを選択してください。',
      },
    )
    .optional()
    .or(z.literal('')),
  vegetarian_type: z.string(),
  introduction: z.string().max(30, {
    message: '※ 30 文字以内で入力してください。',
  }),
})

export default EditUserFormSchema
