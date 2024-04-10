import { z } from 'zod'
import { timeErrorMap } from '@/lib/zod/timeErrorMap'

const ACCEPTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
]

export const EditRecipeFormSchema = z
  .object({
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
    time: z.coerce
      .number({ errorMap: timeErrorMap })
      // 正の整数
      .positive()
      .int({
        invalid_type_error: '※ 調理目安時間は半角数字で入力してください',
      })
      .min(1, {
        message: '※ 調理目安時間は必須項目です。',
      })
      .max(999, {
        message: '※ 調理目安時間は半角数字 3 桁以内で入力してください',
      }),
    servings: z.string().min(1, {
      message: '※ 人数は必須項目です。',
    }),
    materials: z.array(
      z.object({
        name: z
          .string()
          .min(1, {
            message: '※ 材料名は必須項目です。',
          })
          .max(20, {
            message: '※ 材料名は 20 文字以内で入力してください。',
          }),
        quantity: z
          .string() // 「少々」とかあるから string にする
          .min(1, {
            message: '※ 分量は必須項目です。',
          })
          .max(10, {
            message: '※ 分量は 10 文字以内で入力してください。',
          }),
        unit: z.string().min(1),
      }),
    ),
    steps: z.array(
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
  .superRefine((data, ctx) => {
    if (!data.thumbnail_newFile) {
      if (data.thumbnail_newFile === '' && data.thumbnail_url === '') {
        ctx.addIssue({
          message:
            'peg, jpg, png, webp のいずれかの画像ファイルを選択してください。',
          path: ['thumbnail_url'],
          code: z.ZodIssueCode.custom,
        })
      }
    }
  })

export default EditRecipeFormSchema
