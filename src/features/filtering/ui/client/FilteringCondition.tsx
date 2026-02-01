'use client'

import { ChevronRight, RotateCcw } from 'lucide-react'

import type { CategoryItemType } from '@/entities/category'
import type { KeywordItemType } from '@/entities/keyword'

type FilteringConditionProps = {
  selectedCategory: CategoryItemType | null
  selectedKeyword: KeywordItemType | null
  onReset?: () => void
  showResetButton?: boolean
}

const WRAPPER_CLASSNAME = 'flex min-h-5 items-center gap-1'
const RESET_BUTTON_CLASSNAME = 'ml-auto flex items-center gap-2'

export function FilteringCondition({
  selectedCategory,
  selectedKeyword,
  onReset,
  showResetButton = true,
}: FilteringConditionProps) {
  return (
    <div className={WRAPPER_CLASSNAME}>
      {selectedCategory ? selectedCategory.categoryName : ''}
      {selectedKeyword ? (
        <>
          <ChevronRight size={16} />
          {selectedKeyword.keywordName}
        </>
      ) : (
        ''
      )}
      {showResetButton ? (
        <div
          className={RESET_BUTTON_CLASSNAME}
          onClick={onReset}
        >
          필터 초기화
          <RotateCcw size={16} />
        </div>
      ) : null}
    </div>
  )
}
