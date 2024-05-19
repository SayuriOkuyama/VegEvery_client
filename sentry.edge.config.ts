// このファイルは、エッジ機能 (ミドルウェア、エッジ ルートなど) の Sentry の初期化を構成します。
// ここで追加した構成は、エッジ機能の 1 つが読み込まれるたびに使用されます。
// この構成は Vercel Edge ランタイムとは無関係であり、ローカルで実行する場合にも必要であることに注意してください。
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from '@sentry/nextjs'

Sentry.init({
  dsn: 'https://381d131a0e21ab21d8b08149043b0ab3@o4507242057629696.ingest.de.sentry.io/4507242080698448',

  // 運用環境でこの値を調整するか、tracesSampler を使用してより詳細に制御します
  tracesSampleRate: 1,

  // このオプションを true に設定すると、Sentry のセットアップ中に役立つ情報がコンソールに出力されます。
  debug: false,
})
