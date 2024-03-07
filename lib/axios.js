import Axios from 'axios'

const axios = Axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
  },
  // 異なるオリジンに対して Cookie を送りたい
  withCredentials: true,
  withXSRFToken: true,
})

export default axios
