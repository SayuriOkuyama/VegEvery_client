// このファイルはサーバー上の Sentry の初期化を構成します。
// ここで追加した構成は、サーバーがリクエストを処理するたびに使用されます。
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from '@sentry/nextjs'

Sentry.init({
  dsn: 'https://381d131a0e21ab21d8b08149043b0ab3@o4507242057629696.ingest.de.sentry.io/4507242080698448',

  // 運用環境でこの値を調整するか、tracesSampler を使用してより詳細に制御します
  tracesSampleRate: 1,

  // このオプションを true に設定すると、Sentry のセットアップ中に役立つ情報がコンソールに出力されます。
  debug: false,

  // Spotlight (https://spotlightjs.com) を有効にするには、以下の行のコメントを解除します。
  // spotlight: process.env.NODE_ENV === 'development',
})
