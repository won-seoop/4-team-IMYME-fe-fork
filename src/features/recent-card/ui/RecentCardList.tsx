'use client'

import { useRouter } from 'next/navigation'

import { useUserId } from '@/entities/user/model/useUserStore'
import { useAccessToken } from '@/features/auth/model/client/useAuthStore'
import { MyCardItem } from '@/features/my-card/model/getMyCards'
import { useMyCardList } from '@/features/my-card/model/useMyCardList'
import { Card, formatDate } from '@/shared'

const LIST_CLASSNAME = 'mt-5 flex flex-col items-center gap-4'
const RECENT_LIMIT = 3

const getRecentCards = (items: MyCardItem[]) =>
  [...items]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, RECENT_LIMIT)

export function RecentCardList() {
  const router = useRouter()
  const accessToken = useAccessToken()
  const userId = useUserId()
  const { data = [], isLoading, error } = useMyCardList(accessToken, userId)

  if (isLoading) {
    return <p>카드를 불러오는 중입니다.</p>
  }

  if (error) {
    return <p>카드를 불러오지 못했습니다.</p>
  }

  const recentCards = getRecentCards(data)

  if (recentCards.length === 0) {
    return <p>최근 카드가 없습니다.</p>
  }

  return (
    <div className={LIST_CLASSNAME}>
      {recentCards.map((card) => (
        <Card
          key={card.id}
          title={card.title}
          date={formatDate(card.createdAt)}
          categoryName={card.categoryName}
          keywordName={card.keywordName}
          onClick={() => router.push('/mypage')}
        />
      ))}
    </div>
  )
}
