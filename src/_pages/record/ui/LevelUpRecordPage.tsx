'use client'

import { useRouter } from 'next/navigation'

import { LevelUpHeader } from '@/features/levelup'

const RECORD_PROGRESS_VALUE = 100
const RECORD_STEP_LABEL = '3/3'

export function LevelUpRecordPage() {
  const router = useRouter()

  const handleBack = () => {
    router.push('/main')
  }

  return (
    <div className="h-full w-full">
      <LevelUpHeader
        variant="recording"
        onBack={handleBack}
        progressValue={RECORD_PROGRESS_VALUE}
        stepLabel={RECORD_STEP_LABEL}
      />
    </div>
  )
}
