import Script from 'next/script'

const TwitterScript = () => {
  return (
    <Script
      src="https://platform.twitter.com/widgets.js"
      strategy="lazyOnload"
    />
  )
}

export default TwitterScript
