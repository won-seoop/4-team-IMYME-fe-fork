'use client'

import { useMemo } from 'react'

import { useAccessToken } from '@/features/auth/model/client/useAuthStore'
import { useAttemptDetailsList } from '@/features/levelup-feedback'

import type { CardDetails } from '@/features/levelup-feedback'
import type { FeedbackItem } from '@/features/levelup-feedback/ui/FeedbackTab'

type UseFeedbackDataResult = {
  feedbackData: FeedbackItem[]
  isLoading: boolean
}

export function useFeedbackData(cardDetails: CardDetails | null): UseFeedbackDataResult {
  const accessToken = useAccessToken()

  const attemptParams = useMemo(
    () =>
      cardDetails?.attempts
        ?.slice()
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        .map((attempt) => ({
          cardId: cardDetails.id,
          attemptId: attempt.id,
        })) ?? [],
    [cardDetails],
  )

  const attemptQueries = useAttemptDetailsList(accessToken, attemptParams)
  const isLoading = attemptQueries.some((query) => query.isLoading)

  const feedbackData: FeedbackItem[] = attemptQueries
    .map((query) => query.data)
    .filter((attempt): attempt is NonNullable<typeof attempt> => Boolean(attempt))
    .map((attempt) => ({
      id: attempt.attemptId,
      attemptNo: attempt.attemptNo,
      summary: attempt.feedback.summary,
      keywords: attempt.feedback.keywords,
      facts: attempt.feedback.facts,
      understanding: attempt.feedback.understanding,
      socraticFeedback: attempt.feedback.socraticFeedback,
      createdAt: attempt.feedback.createdAt,
    }))

  return { feedbackData, isLoading }
}
