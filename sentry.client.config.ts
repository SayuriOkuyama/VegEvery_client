// このファイルは、クライアント上の Sentry の初期化を構成します。
// ここで追加した構成は、ユーザーがブラウザにページをロードするたびに使用されます。
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from '@sentry/nextjs'

Sentry.init({
  dsn: 'https://381d131a0e21ab21d8b08149043b0ab3@o4507242057629696.ingest.de.sentry.io/4507242080698448',

  // 運用環境でこの値を調整するか、tracesSampler を使用してより詳細に制御します
  tracesSampleRate: 1,

  // このオプションを true に設定すると、Sentry のセットアップ中に役立つ情報がコンソールに出力されます。
  debug: false,

  replaysOnErrorSampleRate: 1.0,

  // これにより、サンプル レートが 10% に設定されます。
  // 開発中はこれを 100% にし、本番環境ではより低いレートでサンプリングすることもできます。
  replaysSessionSampleRate: 0.1,

  // Sentry セッション リプレイ機能を使用する予定がない場合は、このオプションを削除できます。
  integrations: [
    Sentry.replayIntegration({
      // 追加の再生設定をここに入力します。例:
      maskAllText: true,
      blockAllMedia: true,
    }),
  ],
})
