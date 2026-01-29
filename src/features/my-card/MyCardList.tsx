'use client'

import { useRouter } from 'next/navigation'

import { Card } from '@/entities/card'
import { useUserId } from '@/entities/user/model/useUserStore'
import { useAccessToken } from '@/features/auth/model/client/useAuthStore'
import { useMyCardList } from '@/features/my-card/model/useMyCardList'
import { formatDate } from '@/shared'

const LIST_CLASSNAME = `mt-4 flex min-h-0 flex-col items-center gap-4 overflow-y-auto max-h-[60vh]`

export function MyCardList() {
  const router = useRouter()
  const accessToken = useAccessToken()
  const userId = useUserId()
  const { data, isLoading, error } = useMyCardList(accessToken, userId)

  if (isLoading) {
    return <p>카드를 불러오는 중입니다.</p>
  }

  if (error) {
    return <p>카드를 불러오지 못했습니다.</p>
  }

  if (data?.length === 0) {
    return <p>카드가 없습니다.</p>
  }

  return (
    <div className={LIST_CLASSNAME}>
      {data?.map((card) => (
        <Card
          key={card.id}
          title={card.title}
          date={formatDate(card.createdAt)}
          categoryName={card.categoryName}
          keywordName={card.keywordName}
          onClick={() => router.push(`/mypage/cards/${card.id}`)}
        />
      ))}
    </div>
  )
}
