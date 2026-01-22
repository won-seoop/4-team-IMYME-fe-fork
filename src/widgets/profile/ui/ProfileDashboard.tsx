'use client'

import { useRouter } from 'next/navigation'

import { Avatar, Nickname, StatCards } from '@/entities/user'
import { DefaultAvatar } from '@/shared'

const userData = {
  nickname: 'User',
  avatar: DefaultAvatar,
  cardCount: 0,
  dates: 1,
  levelCount: 0,
}

const AVATAR_SIZE_PX = 60

interface ProfileDashboardProps {
  navigateToMyPage?: boolean
}

export function ProfileDashboard({ navigateToMyPage = true }: ProfileDashboardProps) {
  const router = useRouter()

  const handleNavigateToMyPage = () => {
    if (!navigateToMyPage) {
      return
    }

    router.push('/mypage')
  }

  return (
    <div
      className="w-full"
      onClick={handleNavigateToMyPage}
    >
      <div className="grid w-full auto-cols-max grid-flow-col items-start gap-4">
        <div
          className="ml-6 overflow-hidden rounded-full"
          style={{ width: AVATAR_SIZE_PX, height: AVATAR_SIZE_PX }}
        >
          <Avatar
            avatar_src={DefaultAvatar}
            size={AVATAR_SIZE_PX}
          />
        </div>
        <Nickname nickname={userData.nickname} />
      </div>
      <StatCards
        cardCount={userData.cardCount}
        dates={userData.dates}
        levelCount={userData.levelCount}
      />
    </div>
  )
}
