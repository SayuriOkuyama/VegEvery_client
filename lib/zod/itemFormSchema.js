import { z } from 'zod'

export const itemFormSchema = z.object({
  thumbnail: z.string().min(1, {
    message: '※ メイン画像は必須項目です。',
  }),
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
      tag: z
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
      place: z
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
          message: '※価格は必須項目です。',
        })
        .max(10, {
          message: '※ 価格は 10 文字以内で入力してください。',
        }),
    }),
  ),
  reports: z.array(
    z.object({
      text: z.string().min(2, {
        message: '※ 手順は 2 文字以上で入力してください。',
      }),
    }),
  ),
})

export default itemFormSchema
