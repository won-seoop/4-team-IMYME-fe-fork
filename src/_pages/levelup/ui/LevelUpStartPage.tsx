'use client'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

import { useAccessToken } from '@/features/auth/model/client/useAuthStore'
import { CategorySelectList, KeywordSelectList } from '@/features/filtering'

import { BackButton } from './BackButton'
import { ProgressField } from './ProgressField'

import type { KeywordItemType } from '@/entities/keyword'

const STEP_ONE_PROGRESS_VALUE = 33
const STEP_TWO_PROGRESS_VALUE = 66
const STEP_ONE_LABEL = '1/3'
const STEP_TWO_LABEL = '2/3'

export function LevelUpStartPage() {
  const router = useRouter()
  const accessToken = useAccessToken()
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null)
  const [selectedKeyword, setSelectedKeyword] = useState<KeywordItemType | null>(null)

  const hasSelectedCategory = selectedCategoryId !== null
  const progressValue = hasSelectedCategory ? STEP_TWO_PROGRESS_VALUE : STEP_ONE_PROGRESS_VALUE
  const progressLabel = hasSelectedCategory ? STEP_TWO_LABEL : STEP_ONE_LABEL

  const handleBack = () => {
    if (!selectedCategoryId) {
      router.back()
      return
    }

    setSelectedCategoryId(null)
    setSelectedKeyword(null)
  }

  return (
    <div className="h-full w-full">
      <div className="flex gap-3">
        <BackButton onClick={handleBack} />
        <div className="flex flex-col items-start">
          <p className="font-semibold">레벨업 모드</p>
          <p className="text-sm">카테고리 선택</p>
        </div>
      </div>
      <div className="px-6">
        <ProgressField
          value={progressValue}
          stepLabel={progressLabel}
        />
      </div>
      <div className="bg-secondary mx-4 mt-4 flex max-h-[80vh] max-w-350 flex-col items-center justify-center overflow-hidden rounded-2xl p-4">
        {hasSelectedCategory ? (
          <KeywordSelectList
            accessToken={accessToken}
            categoryId={selectedCategoryId}
            selectedKeywordId={selectedKeyword ? selectedKeyword.id : null}
            onKeywordSelect={setSelectedKeyword}
          />
        ) : (
          <CategorySelectList
            accessToken={accessToken}
            selectedCategoryId={selectedCategoryId}
            onCategorySelectId={setSelectedCategoryId}
            onClearKeyword={() => setSelectedKeyword(null)}
          />
        )}
      </div>
    </div>
  )
}
