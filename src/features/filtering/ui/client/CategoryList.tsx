'use client'

import { CategoryItem, CategoryItemType } from '@/entities/category'

type CategoryListProps = {
  isLoading: boolean
  error: Error | null
  categories: CategoryItemType[]
  onCategoryClick: (category: CategoryItemType) => void
  selectedCategoryId: number | null
}

export function CategoryList({
  categories,
  onCategoryClick,
  selectedCategoryId,
}: CategoryListProps) {
  return (
    <div className="h-full overflow-y-scroll">
      {categories.map((category) => (
        <CategoryItem
          key={category.id}
          category={category}
          onClick={onCategoryClick}
          isSelected={selectedCategoryId === category.id}
        />
      ))}
    </div>
  )
}
