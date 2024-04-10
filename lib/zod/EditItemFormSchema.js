import { z } from 'zod'

const ACCEPTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
]

export const EditItemFormSchema = z.object({
  thumbnail_newFile: z
    .union([
      z.string().url({
        message:
          'jpeg, jpg, png, webp のいずれかの画像ファイルを選択してください。',
      }),
      z.custom(
        file =>
          file instanceof File && ACCEPTED_IMAGE_TYPES.includes(file.type),
        {
          message:
            'jpeg, jpg, png, webp のいずれかの画像ファイルを選択してください。',
        },
      ),
    ])
    .optional()
    .or(z.literal('')),
  thumbnail_path: z.string(),
  thumbnail_url: z.string(),
  title: z
    .string()
    .min(2, {
      message: '※ タイトルは 2 文字以上で入力してください。',
    })
    .max(30, {
      message: '※ タイトルは 30 文字以内で入力してください。',
    }),
  tags: z.array(
    z.object({
      name: z
        .string()
        .max(10, {
          message: '※ タグは 10 文字以内で入力してください。',
        })
        .nullable(),
    }),
  ),
  items: z.array(
    z.object({
      name: z
        .string()
        .min(1, {
          message: '※ 材料名は必須項目です。',
        })
        .max(20, {
          message: '※ 材料名は 20 文字以内で入力してください。',
        }),
      where_to_buy: z
        .string()
        .min(1, {
          message: '※ 購入場所は必須項目です。',
        })
        .max(20, {
          message: '※ 購入場所は 20 文字以内で入力してください。',
        }),
      price: z
        .string() // 「何 kg でいくら」の場合もあるから string
        .min(1, {
          message: '※ 価格は必須項目です。',
        })
        .max(20, {
          message: '※ 価格は 20 文字以内で入力してください。',
        }),
    }),
  ),
  reports: z.array(
    z.object({
      order: z.coerce.number(),
      text: z
        .string()
        .min(2, {
          message: '※ 手順は 2 文字以上で入力してください。',
        })
        .max(225, {
          message: '※ 手順は 225 文字以内で入力してください。',
        }),
    }),
  ),
  vege_type: z.object({
    vegan: z.boolean(),
    oriental_vegetarian: z.boolean(),
    ovo_vegetarian: z.boolean(),
    pescatarian: z.boolean(),
    lacto_vegetarian: z.boolean(),
    pollo_vegetarian: z.boolean(),
    fruitarian: z.boolean(),
    other_vegetarian: z.boolean(),
  }),
})

export default EditItemFormSchema
