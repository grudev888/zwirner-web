import {DzColumn, DzTitle, TITLE_SIZES, TITLE_TYPES} from '@zwirner/design-system'

export default function Custom404() {
  return (
    <DzColumn span={12}>
      <div className="flex h-screen w-full items-center justify-center bg-black-10">
        <DzTitle
          title="404 - Page Not Found"
          titleType={TITLE_TYPES.H1}
          titleSize={TITLE_SIZES.XL}
        />
      </div>
    </DzColumn>
  )
}
