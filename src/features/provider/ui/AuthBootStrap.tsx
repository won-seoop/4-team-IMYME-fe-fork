'use client'
import { useEffect } from 'react'

import { useSetAccessToken, useAccessToken } from '@/features/auth/model/client/useAuthStore'

export function AuthBootstrap() {
  const accessToken = useAccessToken()
  const setAccessToken = useSetAccessToken()

  useEffect(() => {
    const run = async () => {
      if (accessToken) return

      const res = await fetch('/api/auth/refresh', { method: 'POST' })
      if (!res.ok) return

      const data = (await res.json()) as { access_token: string }
      setAccessToken(data.access_token)
    }

    void run()
  }, [accessToken, setAccessToken])

  return null
}
