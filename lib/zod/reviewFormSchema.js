import { z } from 'zod'

const ACCEPTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
]

export const reviewFormSchema = z.object({
  restaurant: z.object({
    name: z.string().min(1).max(100),
    place_id: z.string().min(1).max(100),
    latitude: z.string(),
    longitude: z.string(),
  }),
  thumbnail: z.union([
    z.string().url({
      message:
        'jpeg, jpg, png, webp のいずれかの画像ファイルを選択してください。',
    }),
    z.custom(
      file => file instanceof File && ACCEPTED_IMAGE_TYPES.includes(file.type),
      {
        message:
          'jpeg, jpg, png, webp のいずれかの画像ファイルを選択してください。',
      },
    ),
  ]),
  stars: z
    .number()
    .min(1, {
      message: '※ 評価を選択してください。',
    })
    .max(5),
  text: z
    .string()
    .min(2, {
      message: '※ コメントは 2 文字以上で入力してください。',
    })
    .max(255, {
      message: '※ コメントは 225 文字以内で入力してください。',
    }),
  menus: z.array(
    z.object({
      name: z
        .string()
        .min(1, {
          message: '※ メニュー名は必須項目です。',
        })
        .max(20, {
          message: '※ メニュー名は 30 文字以内で入力してください。',
        }),
      price: z
        .string() // 「何 kg でいくら」の場合もあるから string
        .min(1, {
          message: '※ 価格は必須項目です。',
        })
        .max(20, {
          message: '※ 価格は 20 文字以内で入力してください。',
        }),
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
    }),
  ),
})

export default reviewFormSchema
