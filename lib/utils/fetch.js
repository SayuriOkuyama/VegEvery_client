import axios from '@/lib/axios'

const getArticles = async url => {
  try {
    const response = await axios.get(`/${url}`)
    // const response = await axios.get(`/${path}/${articleId}`)

    // if (path === 'recipes') {
    const data = await response.data
    return data
    // } else {
    //   const data = await response.data.article
    //   return data
    // }
  } catch (err) {
    console.log(err)
  }
}

const fetch = ({ params }) => {
  const id = params.id

  return <div>fetch</div>
}

export { getArticles }
