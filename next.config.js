/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
      },
      {
        protocol: 'https',
        hostname: 'dz6c1hmcx20gt.cloudfront.net',
      },
      {
        protocol: 'https',
        hostname: 'maps.googleapis.com',
      },
      {
        protocol: 'https',
        hostname: 'static.vegevery.my-raga-bhakti.com',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
    ],
  },
}

module.exports = nextConfig

// Injected content via Sentry wizard below

const { withSentryConfig } = require('@sentry/nextjs')

module.exports = withSentryConfig(
  module.exports,
  {
    // 利用可能なすべてのオプションについては、以下を参照してください。
    // https://github.com/getsentry/sentry-webpack-plugin#options

    // ビルド中にソースマップのアップロードログを抑制します
    silent: true,
    org: 'dae2a2a51efb',
    project: 'vegevery-client',
  },
  {
    // 利用可能なすべてのオプションについては、以下を参照してください。:
    // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

    // よりきれいなスタック トレースを得るために、より大きなソース マップのセットをアップロードします (ビルド時間が増加します)。
    widenClientFileUpload: true,

    // IE11 と互換性を持たせるために SDK をトランスパイルします (バンドル サイズが増加します)。
    transpileClientSDK: true,

    // 広告ブロッカーを回避するために Next.js の書き換えを通じてブラウザーのリクエストを Sentry にルーティングするには、コメントを解除します。
    // これにより、サーバーの負荷だけでなくホスティング料金も増加する可能性があります。
    // 注: 構成されたルートが Next.js ミドルウェアと一致しないことを確認してください。
    // 一致しない場合、クライアント側エラーのレポートが失敗します。
    // tunnelRoute: "/monitoring",

    // 生成されたクライアント バンドルからソース マップを非表示にします
    hideSourceMaps: true,

    // Sentry ロガー ステートメントを自動的にツリーシェイクしてバンドルサイズを削減します
    disableLogger: true,

    // Vercel Cron モニターの自動インストルメンテーションを有効にします。
    // 詳細については、以下を参照してください。
    // https://docs.sentry.io/product/crons/
    // https://vercel.com/docs/cron-jobs
    automaticVercelMonitors: true,
  },
)
