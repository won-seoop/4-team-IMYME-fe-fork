import { useQuery } from '@tanstack/react-query'

import { getMyCards } from './getMyCards'

import type { MyCardItem } from './getMyCards'

export function useMyCardList(accessToken: string) {
  return useQuery<MyCardItem[]>({
    queryKey: ['myCards', accessToken],
    queryFn: () => getMyCards(accessToken),
    enabled: Boolean(accessToken),
  })
}
