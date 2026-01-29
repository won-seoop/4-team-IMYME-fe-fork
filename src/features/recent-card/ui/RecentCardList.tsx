import { Card } from '@/shared'

export function RecentCardList() {
  return (
    <div className="mt-5 flex flex-col items-center gap-4">
      <Card
        title="새해 공부"
        date="2026.01.01"
        categoryName="Spring"
        keywordName="Spring Bean"
      />
      <Card
        title="주간 복습"
        date="2026.01.08"
        categoryName="React"
        keywordName="Hooks"
      />
    </div>
  )
}
