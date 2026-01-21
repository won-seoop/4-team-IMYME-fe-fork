'use client'

import { type ReactNode } from 'react'

import { LogoutButton } from '@/features/auth'
import { HelpButton } from '@/features/help'
import { ProfileEditButton } from '@/features/profile-edit'
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
  DialogDescription,
} from '@/shared/ui/dialog'

const MODAL_CONTENT_CLASS =
  'sm:max-w-[320px] min-h-[270px] flex flex-col items-center justify-between'

type MenuModalProps = {
  trigger: ReactNode
  open: boolean
  onOpenChange: (open: boolean) => void
  onProfileEditOpen: () => void
}

export function MenuModal({ trigger, open, onOpenChange, onProfileEditOpen }: MenuModalProps) {
  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className={MODAL_CONTENT_CLASS}>
        <DialogTitle>설정</DialogTitle>
        <DialogDescription></DialogDescription>
        <ProfileEditButton onClick={onProfileEditOpen} />
        <HelpButton />
        <LogoutButton />
      </DialogContent>
    </Dialog>
  )
}
