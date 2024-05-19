import useSWR from 'swr'
import axios from '@/lib/axios'
import { useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Cookie from 'js-cookie'

export const useAuth = ({ middleware, redirectIfAuthenticated } = {}) => {
  const router = useRouter()
  const params = useParams()

  const {
    data: user,
    error,
    mutate,
  } = useSWR('/api/user', () =>
    axios
      .get('/api/user')
      .then(res => {
        // console.log(res.data)
        return res.data
      })
      .catch(error => {
        if (error.response.status !== 401) throw new Error('Fetch User Error')
      }),
  )
  // revalidateOnFocus: false, // フォーカス時に再検証しない
  // shouldRetryOnError: false, // エラー時に再試行しない
  // refreshInterval: 0, // 自動更新を無効にする

  // csrf の初期化
  const csrf = () => axios.get('/sanctum/csrf-cookie')

  // データを渡して register ルートに post
  const authRegister = async ({ setErrors, formData }) => {
    await csrf()

    setErrors([])

    axios
      .post('api/user/register', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(res => {
        // トークンをクッキーに保存
        Cookie.set('sanctum_token', res.data.token, {
          expires: 7,
          secure: false,
          sameSite: 'lax',
        })
        // キャッシュの更新
        mutate()
      })
      .catch(error => {
        if (error.response.status !== 422) throw error

        setErrors(error.response.data.errors)
      })
  }

  const login = async ({ setErrors, setStatus, ...props }) => {
    await csrf()

    setErrors([])
    setStatus(null)

    axios
      .post('api/user/login', props)
      .then(res => {
        // console.log(res.data.token)
        // トークンをクッキーに保存
        Cookie.set('sanctum_token', res.data.token, {
          expires: 7,
          secure: false,
          sameSite: 'lax',
        })
        mutate()
      })
      .catch(error => {
        if (error.response.status !== 422) throw error

        setErrors(error.response.data.errors)
      })
  }

  const forgotPassword = async ({ setErrors, setStatus, email }) => {
    await csrf()

    setErrors([])
    setStatus(null)

    axios
      .post('/forgot-password', { email })
      .then(response => setStatus(response.data.status))
      .catch(error => {
        if (error.response.status !== 422) throw error

        setErrors(error.response.data.errors)
      })
  }

  const resetPassword = async ({ setErrors, setStatus, ...props }) => {
    await csrf()

    setErrors([])
    setStatus(null)

    axios
      .post('/reset-password', { token: params.token, ...props })
      .then(response =>
        router.push('/login?reset=' + btoa(response.data.status)),
      )
      .catch(error => {
        if (error.response.status !== 422) throw error

        setErrors(error.response.data.errors)
      })
  }

  const logout = async () => {
    if (!error) {
      await axios.post('api/user/logout').then(() => mutate())
    }

    window.location.pathname = '/login'
  }

  // guest の場合、ログイン状態になったらリダイレクトするページを指定
  useEffect(() => {
    if (middleware === 'guest' && redirectIfAuthenticated && user)
      router.push(redirectIfAuthenticated)
    // if (window.location.pathname === '/verify-email' && user?.email_verified_at)
    //   router.push(redirectIfAuthenticated)
    if (middleware === 'auth' && error) logout()
    // if (middleware === 'auth' && error && error.response.status !== 401)
    //   console.log(error)
    // router.push('/login')
  }, [user, error])

  return {
    user,
    authRegister,
    login,
    forgotPassword,
    resetPassword,
    // resendEmailVerification,
    logout,
    csrf,
    error,
  }
}
