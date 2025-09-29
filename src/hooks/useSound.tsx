import { useRef, useCallback } from 'react'

export const useSound = (soundFile: string) => {
  const audioRef = useRef<HTMLAudioElement>()

  const play = useCallback(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio(soundFile)
    }
    
    audioRef.current.play().catch(error => {
      console.log('Audio play failed:', error)
    })
  }, [soundFile])

  const stop = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.currentTime = 0
    }
  }, [])

  return { play, stop }
}