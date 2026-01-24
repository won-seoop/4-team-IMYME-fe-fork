'use client'

import { create } from 'zustand'
import { combine } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

import type { UserProfile } from './userProfile'

export const useUserStore = create(
  immer(
    combine(
      {
        profile: {
          nickname: '',
          profileImageUrl: '',
          level: 0,
          activeCardCount: 0,
          consecutiveDays: 1,
          winCount: 0,
        },
      },
      (set, get) => ({
        actions: {
          setProfile: (profile: UserProfile) => {
            set((state) => {
              state.profile = profile
            })
          },
          setProfileImage: (imageUrl: string) => {
            set((state) => {
              state.profile.profileImageUrl = imageUrl
            })
          },
          setNickname: (nickname: string) => {
            set((state) => {
              state.profile.nickname = nickname
            })
          },
          setLevel: (level: number) => {
            set((state) => {
              state.profile.level = level
            })
          },
          setActiveCardCount: (activeCardCount: number) => {
            set((state) => {
              state.profile.activeCardCount = activeCardCount
            })
          },
          setConsecutiveDays: (consecutiveDays: number) => {
            set((state) => {
              state.profile.consecutiveDays = consecutiveDays
            })
          },
          setWinCount: (winCount: number) => {
            set((state) => {
              state.profile.winCount = winCount
            })
          },
          getProfile: () => get().profile,
        },
      }),
    ),
  ),
)

export const useProfile = () => {
  const profile = useUserStore((store) => store.profile)
  return profile
}

export const useSetProfile = () => {
  const setProfile = useUserStore((store) => store.actions.setProfile)
  return setProfile
}

export const useNickname = () => {
  const nickname = useUserStore((store) => store.profile.nickname)
  return nickname
}

export const useProfileImage = () => {
  const profileImage = useUserStore((store) => store.profile.profileImageUrl)
  return profileImage
}
