import { useQuery } from '@tanstack/react-query'

import { getMyCards } from '../api/getMyCards'

import type { MyCardItem } from '../api/getMyCards'

export function useMyCardList(accessToken: string, userId: number) {
  return useQuery<MyCardItem[]>({
    queryKey: ['myCards', userId],
    queryFn: () => getMyCards(accessToken),
    enabled: Boolean(accessToken),
  })
}
