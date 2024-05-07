import { Button } from '@/components/ui/button'

const SettingSecret = ({ register, errors, watcher, setSettingPage }) => {
  console.log(errors.length)
  console.log(errors)
  return (
    <>
      <div className="text-center space-y-8">
        <p className="text-center my-8">秘密の質問を設定</p>
        <div>
          <label htmlFor="secretQuestion" className="block text-start">
            秘密の質問
          </label>
          <input
            id="secretQuestion"
            type="text"
            placeholder="初めての海外旅行で行った場所は？"
            className="border w-full text-sm pl-1 h-8"
            {...register(`secretQuestion`)}
          />
          {errors.secretQuestion && (
            <div className="text-red-400 w-full text-start text-sm">
              {errors.secretQuestion.message}
            </div>
          )}
        </div>
        <div>
          <label htmlFor="secretAnswer" className="block text-start">
            秘密の質問の答え
          </label>
          <input
            id="secretAnswer"
            type="text"
            placeholder="フランスのルーヴル美術館"
            className="border w-full text-sm pl-1 h-8"
            {...register(`secretAnswer`)}
          />
          {errors.secretAnswer && (
            <div className="text-red-400 w-full text-start text-sm">
              {errors.secretAnswer.message}
            </div>
          )}
        </div>
      </div>
      {!errors.secretQuestion &&
      !errors.secretAnswer &&
      watcher.secretQuestion &&
      watcher.secretAnswer ? (
        <Button
          onClick={() => setSettingPage('password')}
          className="border flex items-center py-3 px-20 mt-8 sm:mt-16 mx-auto bg-button border-button-color">
          <p className="leading-none">次へ</p>
        </Button>
      ) : (
        <Button className="border flex items-center py-3 px-20 mt-8 sm:mt-16 mx-auto bg-button border-button-color disabled-text-color">
          <p className="leading-none">次へ</p>
        </Button>
      )}
    </>
  )
}

export default SettingSecret
