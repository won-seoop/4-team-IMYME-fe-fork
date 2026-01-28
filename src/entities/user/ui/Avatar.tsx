import Image from 'next/image'

import { DefaultAvatar } from '@/shared'

interface AvatarProps {
  avatar_src: string
  size: number
}

export function Avatar({ avatar_src, size }: AvatarProps) {
  return (
    <div
      style={{ width: size, height: size }}
      className="relative overflow-hidden rounded-full"
    >
      <Image
        src={avatar_src ? avatar_src : DefaultAvatar}
        alt="profile image"
        fill
        sizes={`${size}px`}
        className="object-cover"
        loading="eager"
      />
    </div>
  )
}
