'use client'

import { Menu } from 'lucide-react'

import { ProfileEditModal } from '@/features/profile-edit'
import { useProfileEditModal } from '@/widgets/header/model/client/useProfileEditModal'
import { MenuModal } from '@/widgets/menu'
import { useMenuModal } from '@/widgets/menu/model/client/useMenuModal'

type HeaderProps = {
  showMenu?: boolean
}

export function Header({ showMenu = true }: HeaderProps) {
  const { profileEditOpen, handleProfileEditOpenChange, handleProfileEditOpen } =
    useProfileEditModal()
  const { menuOpen, handleMenuOpenChange, handleMenuClose } = useMenuModal()

  const handleProfileEditOpenWithMenuClose = () => {
    handleProfileEditOpen()
    handleMenuClose()
  }

  return (
    <header className="flex w-full items-center justify-between px-3 py-4">
      <span className="text-md font-semibold text-[rgb(var(--color-primary))]">MINE</span>
      {showMenu ? (
        <>
          <MenuModal
            trigger={
              <button type="button">
                <Menu className="h-5 w-5" />
              </button>
            }
            open={menuOpen}
            onOpenChange={handleMenuOpenChange}
            onProfileEditOpen={handleProfileEditOpenWithMenuClose}
          />
          <ProfileEditModal
            open={profileEditOpen}
            onOpenChange={handleProfileEditOpenChange}
          />
        </>
      ) : (
        <span aria-hidden="true" />
      )}
    </header>
  )
}
