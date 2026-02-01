'use client'

import { useMutation } from '@tanstack/react-query'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

import { useAccessToken } from '@/features/auth/model/client/useAuthStore'
import { FeedbackTab, useCardDetails } from '@/features/levelup-feedback'
import { deleteAttempt } from '@/features/levelup-feedback/api/deleteAttempt'
import { getAttemptDetails } from '@/features/levelup-feedback/api/getAttemptDetails'
import { FeedbackLoader } from '@/features/levelup-feedback/ui/FeedbackLoader'
import {
  FeedbackStatus,
  FeedbackProcessingStep,
} from '@/features/levelup-feedback/ui/FeedbackLoader'
import { FeedbackItem } from '@/features/levelup-feedback/ui/FeedbackTab'
import { AlertModal, LevelUpHeader } from '@/shared'
import { SubjectHeader } from '@/shared'
import { Button } from '@/shared/ui/button'

const POLL_INTERVAL_MS = 3000
const DEFAULT_FEEDBACK_STATUS: FeedbackStatus = 'PROCESSING'
const PROCESSING_STEPS = ['AUDIO_ANALYSIS', 'FEEDBACK_GENERATION'] as const
const FEEDBACK_TIMEOUT_MS = 5 * 60 * 1000

export function LevelUpFeedbackPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const accessToken = useAccessToken()
  const [status, setStatus] = useState<FeedbackStatus>(DEFAULT_FEEDBACK_STATUS)
  const [processingStep, setProcessingStep] = useState<FeedbackProcessingStep | null>(null)
  const [feedbackData, setFeedbackData] = useState<FeedbackItem | null>(null)
  const [isExitAlertOpen, setIsExitAlertOpen] = useState(false)
  const cardId = Number(searchParams.get('cardId') ?? '')
  const attemptId = Number(searchParams.get('attemptId') ?? '')
  const { data } = useCardDetails(accessToken, cardId)

  const remainingAttempts = feedbackData ? Math.max(0, 5 - feedbackData.attemptNo) : 0

  const deleteAttemptMutation = useMutation({
    mutationFn: async () => {
      if (!accessToken || !cardId || !attemptId) {
        throw new Error('missing_params')
      }
      const result = await deleteAttempt(accessToken, cardId, attemptId)
      if (!result.ok) {
        throw new Error('delete_failed')
      }
    },
    retry: 1,
  })

  useEffect(() => {
    const hasCompletedFeedback = status === 'COMPLETED' && feedbackData
    if (!accessToken || !cardId || !attemptId || hasCompletedFeedback) return

    let isActive = true
    let intervalId: number | null = null
    let timeoutId: number | null = null

    const stopPolling = () => {
      isActive = false
      if (intervalId) {
        window.clearInterval(intervalId)
      }
      if (timeoutId) {
        window.clearTimeout(timeoutId)
      }
    }

    const pollAttemptDetails = async () => {
      if (!isActive) return
      const details = await getAttemptDetails(accessToken, cardId, attemptId)
      if (!details?.status) return
      if (isValidStatus(details.status)) {
        setStatus(details.status)
        if (details.status === 'PROCESSING' && isProcessingStep(details.step)) {
          setProcessingStep(details.step)
        } else {
          setProcessingStep(null)
        }
        // 피드백이 완성되어 feedback 필드가 존재하면 폴링을 중지하고 결과를 보여준다.
        if (details.status === 'COMPLETED' && details.feedback) {
          setFeedbackData({
            id: details.attemptId,
            attemptNo: details.attemptNo,
            summary: details.feedback.summary,
            keywords: details.feedback.keywords,
            facts: details.feedback.facts,
            understanding: details.feedback.understanding,
            socraticFeedback: details.feedback.socraticFeedback,
            createdAt: new Date(details.createdAt),
          })
          stopPolling()
        }
        if (details.status === 'FAILED') {
          toast.error('피드백 생성에 실패했습니다. 다시 시도해주세요.')
          stopPolling()
        }
      }
    }

    const handleTimeout = async () => {
      toast.error('피드백 생성 시간이 초과되었습니다.')
      try {
        await deleteAttemptMutation.mutateAsync()
      } catch {
        toast.error('삭제에 실패했습니다. 다시 시도해주세요.')
      }
      router.push('/main')
    }

    // 3초마다 상태 업데이트를 위해 서버를 폴링한다.
    void pollAttemptDetails()
    intervalId = window.setInterval(pollAttemptDetails, POLL_INTERVAL_MS)
    timeoutId = window.setTimeout(handleTimeout, FEEDBACK_TIMEOUT_MS)

    return () => {
      stopPolling()
    }
  }, [accessToken, attemptId, cardId, deleteAttemptMutation, feedbackData, router, status])

  const handleBack = () => {
    setIsExitAlertOpen(true)
  }

  const handleExitConfirm = async () => {
    if (!feedbackData) {
      try {
        await deleteAttemptMutation.mutateAsync()
      } catch {
        toast.error('삭제에 실패했습니다. 다시 시도해주세요.')
        return
      }
    }
    router.push('/main')
  }

  const handleExitCancel = () => {
    setIsExitAlertOpen(false)
  }
  return (
    <div className="flex h-full w-full flex-1 flex-col">
      <LevelUpHeader
        variant="feedback"
        onBack={handleBack}
        title=""
        progressValue={100}
        stepLabel="3/3"
      />
      <SubjectHeader
        variant="in_progress"
        categoryValue={data?.categoryName ?? ''}
        keywordValue={data?.keywordName ?? ''}
      />
      <div className="min-h-0 flex-1">
        {status === 'COMPLETED' && feedbackData ? (
          <FeedbackTab
            feedbackData={[feedbackData]}
            showButtons={false}
          />
        ) : (
          <FeedbackLoader
            status={status}
            step={processingStep}
          />
        )}
      </div>
      <div className="mt-auto flex w-full flex-col items-center justify-center gap-4">
        <p className="mb-3 text-sm">남은 학습 횟수: {remainingAttempts}</p>
        <div className="flex w-full items-center justify-center gap-4 pb-6">
          <Button
            variant="levelup_feedback_btn"
            onClick={() => {
              if (!cardId) return
              router.push(`/levelup/record?cardId=${cardId}`)
            }}
            disabled={remainingAttempts === 0}
          >
            이어서 학습하기
          </Button>
          <Button
            variant="levelup_feedback_btn"
            onClick={() => {
              router.push('/main')
            }}
          >
            학습 종료하기
          </Button>
        </div>
      </div>
      <AlertModal
        open={isExitAlertOpen}
        onOpenChange={setIsExitAlertOpen}
        title="학습을 종료할까요?"
        description="진행 중인 피드백이 삭제될 수 있습니다."
        action="나가기"
        cancel="계속하기"
        onAction={handleExitConfirm}
        onCancel={handleExitCancel}
      />
    </div>
  )
}

const isValidStatus = (value: string): value is FeedbackStatus =>
  value === 'PROCESSING' || value === 'COMPLETED' || value === 'FAILED' || value === 'EXPIRED'

const isProcessingStep = (value?: string | null): value is FeedbackProcessingStep =>
  Boolean(value) && PROCESSING_STEPS.includes(value as FeedbackProcessingStep)
