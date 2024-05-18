import Axios from 'axios'
import Cookie from 'js-cookie'

const axios = Axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  headers: {
    // リクエストがAjaxを介して行われたことをサーバーに伝える
    'X-Requested-With': 'XMLHttpRequest',
  },
  // リクエストに資格情報（クッキーや HTTP 認証データなど）を含める
  withCredentials: true,
  // リクエストに XSRFトークンをを含める
  withXSRFToken: true,
  // XSRFトークンのクッキー名を指定
  xsrfCookieName: 'XSRF-TOKEN',
  // XSRFトークンのヘッダー名を指定
  xsrfHeaderName: 'X-XSRF-TOKEN',
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
// axios.interceptors.response.use(
//   response => {
//     // 正常なレスポンスを返す
//     return response
//   },
//   error => {
//     // 特定のエンドポイントでの401エラーを無視する
//     if (
//       error.config &&
//       error.config.url === '/api/user' &&
//       error.response &&
//       error.response.status === 401
//     ) {
//       // ログイン状態の確認で401エラーが発生した場合の処理
//       console.log('ユーザーはログインしていません。')
//       // エラーをスローしない
//       return Promise.resolve(null)
//     }
//     // その他のエラーはそのままスロー
//     return Promise.reject(error)
//   },
// )

export default axios
