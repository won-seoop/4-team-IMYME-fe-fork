import {
  ProfileImage,
  NicknameInput,
  ProfileEditButton,
  useNicknameForm,
  useProfileImageForm,
} from '@/features/profile-edit'
import defaultAvatar from '@/shared/assets/images/default-avatar.svg'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/shared/ui/dialog'

const MODAL_CONTENT_CLASS = 'flex flex-col sm:min-h-[450px] sm:max-w-[350px] items-center'
const LABEL_CLASS = 'self-start font-semibold'

type ProfileEditModalProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ProfileEditModal({ open, onOpenChange }: ProfileEditModalProps) {
  const {
    imagePreview,
    handleFileChange,
    acceptTypes,
    errorMessage: profileImageErrorMessage,
  } = useProfileImageForm()
  const {
    nickname,
    handleNicknameChange,
    handleNicknameBlur,
    hasNicknameError,
    errorMessage: nicknameErrorMessage,
  } = useNicknameForm()

  const handleProfileEdit = () => {}

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent className={MODAL_CONTENT_CLASS}>
        <DialogHeader className="items-center">
          <DialogTitle>프로필 수정하기</DialogTitle>
        </DialogHeader>
        <DialogDescription className={LABEL_CLASS}>프로필 이미지</DialogDescription>
        <ProfileImage
          imageSrc={imagePreview ?? defaultAvatar}
          onChange={handleFileChange}
          acceptTypes={acceptTypes}
          errorMessage={profileImageErrorMessage}
        />
        <DialogDescription className={LABEL_CLASS}>닉네임</DialogDescription>
        <NicknameInput
          value={nickname}
          onChange={handleNicknameChange}
          onBlur={handleNicknameBlur}
          helperMessage={hasNicknameError ? nicknameErrorMessage : null}
          helperVariant={hasNicknameError ? 'error' : 'default'}
        />
        <DialogFooter>
          <ProfileEditButton onClick={handleProfileEdit} />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
