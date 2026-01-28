'use client'
import { useRouter } from 'next/navigation'
import { type ReactNode, useState } from 'react'

import { useAccessToken } from '@/features/auth/model/client/useAuthStore'
import { CategorySelectList, KeywordSelectList, useKeywordList } from '@/features/filtering'

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

  const {
    data: keywords = [],
    isLoading: isKeywordLoading,
    isError: isKeywordError,
  } = useKeywordList({
    categoryId: selectedCategoryId,
    accessToken,
  })

  const hasSelectedCategory = selectedCategoryId !== null
  const progressValue = hasSelectedCategory ? STEP_TWO_PROGRESS_VALUE : STEP_ONE_PROGRESS_VALUE
  const progressLabel = hasSelectedCategory ? STEP_TWO_LABEL : STEP_ONE_LABEL

  let keywordContent: ReactNode = null
  if (hasSelectedCategory) {
    if (isKeywordLoading) {
      keywordContent = <p>키워드를 불러오는 중입니다.</p>
    } else if (isKeywordError) {
      keywordContent = <p>키워드를 불러오지 못했습니다.</p>
    } else if (keywords.length === 0) {
      keywordContent = <p>키워드 정보가 존재하지 않습니다.</p>
    } else {
      keywordContent = (
        <KeywordSelectList
          keywords={keywords}
          selectedKeywordId={selectedKeyword ? selectedKeyword.id : null}
          onKeywordSelect={setSelectedKeyword}
        />
      )
    }
  }

  const handleCategorySelect = (category: { id: number }) => {
    setSelectedCategoryId(category.id)
    if (selectedKeyword) setSelectedKeyword(null)
  }

  const handleBack = () => {
    if (!selectedCategoryId) {
      router.back()
      return
    }

    setSelectedCategoryId(null)
    setSelectedKeyword(null)
  }

  return (
    <>
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
      <div className="bg-secondary mx-4 mt-4 flex h-full max-w-350 flex-col items-center justify-center overflow-y-scroll rounded-2xl py-4">
        {hasSelectedCategory ? (
          keywordContent
        ) : (
          <CategorySelectList
            accessToken={accessToken}
            selectedCategoryId={selectedCategoryId}
            onCategorySelect={handleCategorySelect}
          />
        )}
      </div>
    </>
  )
}
