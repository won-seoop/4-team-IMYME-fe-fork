import { ProfileDashboard } from '@/widgets/profile'

export function MyPage() {
  return (
    <div className="relative">
      <ProfileDashboard
        navigateToMyPage={false}
        showBackButton={true}
      />
    </div>
  )
}
