import {createApp} from './app'

export default context => {
  // 描画する前に非同期処理の完了を待つため、promiseを返す
  return new Promise((resolve, reject) => {
    const {app, router} = createApp()

    // contextに指定されているurlをrouterのurlに設定
    router.push(context.url)

    // 非同期待機 routerに紐づいているコンポーネント内で呼ばれる非同期処理と思われる
    router.onReady(() => {
      // pushしたurlに一致するコンポーネントを取得
      const matchedComponents = router.getMatchedComponents()
      if (!matchedComponents.length) {
        reject(new Error('some error!'))
      }

      resolve(app)
    }, reject)
  })
}
