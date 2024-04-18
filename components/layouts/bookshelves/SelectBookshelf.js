import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import axios from '@/lib/axios'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Checkbox } from '@/components/ui/checkbox'
import { useEffect, useState } from 'react'

const SelectBookshelf = ({
  csrf,
  setIsOpen,
  user,
  likeableType,
  articleId,
  bookshelves,
  setBookshelves,
  setAlertVisible,
}) => {
  const formSchema = z
    .object({
      checkNewBookshelf: z.boolean(),
      newBookshelfName: z
        .string()
        .min(1, {
          message: '※ 入力が必須です。',
        })
        .max(30, {
          message: '※ 30 文字以内で入力してください。',
        })
        .optional(),
      name: z.string().optional(),
    })
    .superRefine((data, ctx) => {
      const sameName = bookshelves.filter(
        bookshelf => bookshelf.name === data.newBookshelfName,
      )
      if (sameName.length > 0) {
        return ctx.addIssue({
          path: ['newBookshelfName'],
          message: '同じ名前の本棚があります。',
          code: z.ZodIssueCode.custom,
        })
      }
    })

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      checkNewBookshelf: false,
    },
    mode: 'onChange',
  })
  const watcher = form.watch()
  const [isOpenNewBookshelf, setIsOpenNewBookshelf] = useState(false)

  // console.log(bookshelves)
  // console.log(watcher)
  // console.log(form.errors)

  useEffect(() => {
    setIsOpenNewBookshelf(watcher.checkNewBookshelf)
  }, [watcher.checkNewBookshelf])

  async function storeArticle(values) {
    let request = {
      user_id: user.id,
      article_type: likeableType,
      bookshelf_id: values.id,
      article_id: articleId,
    }
    if (values.checkNewBookshelf) {
      const data = await createBookshelf(values)
      request = {
        user_id: user.id,
        article_type: likeableType,
        bookshelf_id: data.id,
        article_id: articleId,
      }
    } else {
      const selectedBookshelf = bookshelves.filter(
        bookshelf => bookshelf.name === values.name,
      )
      request = {
        user_id: user.id,
        article_type: likeableType,
        bookshelf_id: selectedBookshelf[0].id,
        article_id: articleId,
      }
    }

    await csrf()
    const res = await axios.post(`/api/bookshelves/store_article`, request)
    // console.log(res.data)
    setIsOpen(false)

    setAlertVisible(true)

    setBookshelves(prev => {
      if (prev) {
        return [...prev, { id: res.data.id, name: res.data.name }]
      } else {
        return [{ id: res.data.id, name: res.data.name }]
      }
    })
  }

  async function createBookshelf(values) {
    await csrf()
    const res = await axios.post(`/api/bookshelves/create/${user.id}`, {
      name: values.newBookshelfName,
    })
    setBookshelves(prev => {
      if (prev) {
        return [...prev, { id: res.data.id, name: res.data.name }]
      } else {
        return [{ id: res.data.id, name: res.data.name }]
      }
    })
    return res.data
  }

  return (
    <>
      {bookshelves && bookshelves.length > 0 ? (
        <>
          {/* <p className="text-center mb-8">保存する本棚を選択</p> */}
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(storeArticle)}
              className="space-y-6">
              <>
                {!isOpenNewBookshelf && (
                  <>
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="block text-md mb-4">
                            保存する本棚を選択
                          </FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="mt-6">
                            <FormControl>
                              <SelectTrigger className="focus:ring-0">
                                <SelectValue placeholder="本棚を選択" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {bookshelves.map(bookshelf => {
                                return (
                                  <SelectItem
                                    key={bookshelf.id}
                                    value={bookshelf.name}
                                    className="text-color ">
                                    {bookshelf.name}
                                  </SelectItem>
                                )
                              })}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </>
                )}
              </>
              <FormField
                control={form.control}
                name="checkNewBookshelf"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex mx-auto mb-2">
                      <div className="flex items-center">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            className="border-button-color"
                          />
                        </FormControl>
                      </div>
                      <FormLabel className="ml-2 leading-none text-md focus:ring-0">
                        新しい本棚を作成
                      </FormLabel>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {isOpenNewBookshelf && (
                <FormField
                  control={form.control}
                  name="newBookshelfName"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder="本棚名を入力" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
              <Button
                type="submit"
                className="block h-8 mx-auto leading-none	bg-button border-button-color text-xs mt-2 py-2">
                保存
              </Button>
            </form>
          </Form>
        </>
      ) : (
        <>
          {/* <p className="text-center mb-8">保存する本棚を作成</p> */}
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(storeArticle)}
              className="space-y-6">
              <FormField
                control={form.control}
                name="newBookshelfName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="block text-center py-2 text-md">
                      保存する本棚を作成
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="本棚名を入力" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="block h-8 mx-auto leading-none	bg-button border-button-color text-xs mt-2 py-2">
                保存
              </Button>
            </form>
          </Form>
        </>
      )}
    </>
  )
}

export default SelectBookshelf
