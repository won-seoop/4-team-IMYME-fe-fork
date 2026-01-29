'use client'

import { SlidersVertical } from 'lucide-react'
import { useState } from 'react'

import { FilteringCondition } from '@/features/filtering'
import { MyCardList } from '@/features/my-card/MyCardList'
import { Drawer, DrawerTrigger } from '@/shared/ui/drawer'
import { FilteringTab } from '@/widgets/filtering'
import { ProfileDashboard } from '@/widgets/profile'

import type { CategoryItemType } from '@/entities/category'
import type { KeywordItemType } from '@/entities/keyword'

export function MyPage() {
  const [selectedCategory, setSelectedCategory] = useState<CategoryItemType | null>(null)
  const [selectedKeyword, setSelectedKeyword] = useState<KeywordItemType | null>(null)
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  const handleFilteringApply = (selection: {
    category: CategoryItemType | null
    keyword: KeywordItemType | null
  }) => {
    setSelectedCategory(selection.category)
    setSelectedKeyword(selection.keyword)
  }

  return (
    <div className="w-full">
      <ProfileDashboard
        navigateToMyPage={false}
        showBackButton={true}
      />
      <div className="mt-5 grid w-full auto-cols-max grid-cols-2 items-center">
        <p className="mr-auto ml-10 text-base">내 카드</p>
      </div>
      <div className="ml-10 flex">
        <FilteringCondition
          selectedCategory={selectedCategory}
          selectedKeyword={selectedKeyword}
          showResetButton={false}
        />
        <Drawer
          open={isFilterOpen}
          onOpenChange={setIsFilterOpen}
        >
          <DrawerTrigger className="mr-10 ml-auto flex items-center gap-1">
            <SlidersVertical size={18} />
            <p className="text-sm">필터</p>
          </DrawerTrigger>
          <FilteringTab
            onApply={handleFilteringApply}
            onClose={() => setIsFilterOpen(false)}
          />
        </Drawer>
      </div>
      <MyCardList
        selectedCategory={selectedCategory}
        selectedKeyword={selectedKeyword}
      />
    </div>
  )
}
