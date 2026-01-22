import { ModeButton } from '@/features/mode'
import { ProfileDashboard } from '@/widgets/profile'

export function MainPage() {
  return (
    <>
      <ProfileDashboard />
      <ModeButton variant="levelup" />
    </>
  )
}
