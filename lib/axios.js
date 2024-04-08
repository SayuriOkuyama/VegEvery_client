import Axios from 'axios'
import Cookie from 'js-cookie'

// // クッキーからトークンを取得
// const token = Cookie.get('sanctum_token')
// console.log(token)
const axios = Axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    // Authorization: `Bearer ${token}`,
  },
  withCredentials: true,
  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',
  withXSRFToken: true,
})

// リクエストインターセプターの追加
axios.interceptors.request.use(
  config => {
    // クッキーからトークンを取得
    const token = Cookie.get('sanctum_token')

    // トークンが存在する場合、ヘッダーに追加
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }

    return config
  },
  error => {
    return Promise.reject(error)
  },
)

export default axios
