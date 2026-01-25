'use client'

import { useEffect, useState } from 'react'

import { getKeywords } from './getKeywords'

import type { KeywordItemType } from '@/entities/keyword'

type UseKeywordListOptions = {
  categoryId: number | null
  accessToken: string
}

export function useKeywordList({ categoryId, accessToken }: UseKeywordListOptions) {
  const [keywords, setKeywords] = useState<KeywordItemType[]>([])

  useEffect(() => {
    let cancelled = false

    const run = async () => {
      if (!accessToken || categoryId === null) {
        setKeywords([])
        return
      }

      try {
        const data = await getKeywords(accessToken, categoryId)
        console.log(data)
        if (!cancelled) setKeywords(data)
      } catch (error) {
        if (!cancelled) setKeywords([])
        console.error('Failed to load keywords', error)
      }
    }

    void run()

    return () => {
      cancelled = true
    }
  }, [accessToken, categoryId])

  return keywords
}
