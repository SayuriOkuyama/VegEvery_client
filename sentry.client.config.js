import * as Sentry from '@sentry/nextjs'

Sentry.init({
  dsn: 'https://examplePublicKey@o0.ingest.sentry.io/0',
  //再生はクライアント側でのみ有効にすることができます
  integrations: [Sentry.replayIntegration()],

  // パフォーマンス監視のためにトランザクションを 100% キャプチャするには、
  // tracesSampleRate を 1.0 に設定します。
  // 運用環境ではこの値を調整することをお勧めします
  tracesSampleRate: 1.0,

  // すべてのセッションの 10% でリプレイをキャプチャし、
  // さらにエラーのあるセッションの 100% でリプレイをキャプチャします。
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,

  // ...

  // 注: 自動リリース値をオーバーライドしたい場合は、ここで `release` 値を設定しないでください。
  // 環境変数 `SENTRY_RELEASE` を使用してください。
  // これにより、ソース マップにもアタッチされます。
})
