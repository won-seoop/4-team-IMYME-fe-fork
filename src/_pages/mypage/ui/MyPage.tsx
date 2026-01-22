import { SlidersVertical } from 'lucide-react'

import { ProfileDashboard } from '@/widgets/profile'

export function MyPage() {
  return (
    <div>
      <ProfileDashboard
        navigateToMyPage={false}
        showBackButton={true}
      />
      <div className="mt-5 grid w-full auto-cols-max grid-cols-2 items-center">
        <p className="mr-auto ml-10 text-base">내 카드</p>
      </div>
      <div className="flex items-center gap-1">
        <SlidersVertical
          size={18}
          className="ml-auto"
        />
        <p className="mr-5 text-sm">필터</p>
      </div>
    </div>
  )
}
