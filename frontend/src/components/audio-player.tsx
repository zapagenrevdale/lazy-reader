"use client"

import { useEffect, useRef, useState } from "react"
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, Repeat, Shuffle } from "lucide-react"
import { Slider } from "@/components/ui/slider"

interface AudioPlayerProps {
  audioUrl: string
  title: string
  url: string
  albumArt: string
  goToNext: () => void;
  goToPrev: () => void;
}

export function AudioPlayer({ audioUrl, title, url, goToPrev, goToNext }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [duration, setDuration] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [volume, setVolume] = useState(0.7)
  const [isMuted, setIsMuted] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    // Create audio element
    const audio = new Audio(audioUrl)
    audio.crossOrigin = "anonymous" // To avoid CORS issues
    audioRef.current = audio

    // Set up event listeners
    audio.addEventListener("loadedmetadata", () => {
      setDuration(audio.duration)
      setIsLoading(false)
      setIsPlaying(false)
    })

    audio.addEventListener("timeupdate", () => {
      setCurrentTime(audio.currentTime)
    })

    audio.addEventListener("ended", () => {
      setIsPlaying(false)
      setCurrentTime(0)
    })

    audio.addEventListener("loadstart", () => {
      setIsLoading(true)
    })

    audio.addEventListener("canplay", () => {
      setIsLoading(false)
    })

    audio.addEventListener("error", (e) => {
      console.log("Audio error:", e)
      setIsLoading(false)
      // You could add an error state here if needed
    })

    // Set initial volume
    audio.volume = volume

    // Clean up
    return () => {
      audio.pause()
      audio.src = ""
      audio.removeEventListener("loadedmetadata", () => { })
      audio.removeEventListener("timeupdate", () => { })
      audio.removeEventListener("ended", () => { })
      audio.removeEventListener("error", () => { })
      audio.removeEventListener("loadstart", () => { })
      audio.removeEventListener("canplay", () => { })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [audioUrl])

  // Play/pause control
  const togglePlay = () => {
    if (!audioRef.current) return

    if (isPlaying) {
      audioRef.current.pause()
    } else {
      audioRef.current.play()
    }

    setIsPlaying(!isPlaying)
  }

  // Seek control
  const handleSeek = (value: number[]) => {
    if (!audioRef.current) return

    const newTime = value[0]!
    audioRef.current.currentTime = newTime
    setCurrentTime(newTime)
  }

  // Volume control
  const handleVolumeChange = (value: number[]) => {
    if (!audioRef.current) return

    const newVolume = value[0]!
    audioRef.current.volume = newVolume
    setVolume(newVolume)

    // Only set muted to true if volume is exactly 0, and unmute if volume > 0
    if (newVolume === 0) {
      setIsMuted(true)
    } else if (isMuted && newVolume > 0) {
      setIsMuted(false)
    }
  }

  // Toggle mute
  const toggleMute = () => {
    if (!audioRef.current) return

    if (isMuted) {
      // Unmute: restore previous volume (or default to 0.7 if it was 0)
      const restoreVolume = volume > 0 ? volume : 0.7
      audioRef.current.volume = restoreVolume
      setVolume(restoreVolume)
      setIsMuted(false)
    } else {
      // Mute: set volume to 0 but keep the volume state for restoration
      audioRef.current.volume = 0
      setIsMuted(true)
    }
  }

  // Format time (seconds to MM:SS)
  const formatTime = (time: number) => {
    if (isNaN(time)) return "0:00"

    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, "0")}`
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-zinc-900 border-t border-zinc-800 p-4">
      <div className="max-w-7xl mx-auto flex flex-col gap-2">
        {/* Progress bar */}
        <div className="w-full flex items-center gap-2 text-xs text-zinc-400">
          <span>{formatTime(currentTime)}</span>
          <Slider
            value={[currentTime]}
            min={0}
            max={duration || 100}
            step={0.1}
            onValueChange={handleSeek}
            className="flex-1"
          />
          <span>{formatTime(duration)}</span>
        </div>

        {/* Controls and info */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 w-1/3">
            <div
              className="w-14 h-14 rounded-sm bg-primary"
            />
            <div>
              <p className="font-medium text-sm">{title}</p>
              <p className="text-xs text-zinc-400">{url}</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="text-zinc-400 hover:text-white transition">
              <Shuffle className="w-4 h-4" />
              <span className="sr-only">Shuffle</span>
            </button>
            <button className="text-zinc-400 hover:text-white transition" onClick={goToPrev}>
              <SkipBack className="w-5 h-5" />
              <span className="sr-only">Previous</span>
            </button>
            <button
              onClick={togglePlay}
              disabled={isLoading}
              className="bg-white text-black rounded-full w-8 h-8 flex items-center justify-center hover:scale-105 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
              ) : isPlaying ? (
                <Pause className="w-4 h-4" />
              ) : (
                <Play className="w-4 h-4 ml-0.5" />
              )}
              <span className="sr-only">{isLoading ? "Loading" : isPlaying ? "Pause" : "Play"}</span>
            </button>
            <button className="text-zinc-400 hover:text-white transition" onClick={goToNext}>
              <SkipForward className="w-5 h-5" />
              <span className="sr-only">Next</span>
            </button>
            <button className="text-zinc-400 hover:text-white transition">
              <Repeat className="w-4 h-4" />
              <span className="sr-only">Repeat</span>
            </button>
          </div>

          <div className="flex items-center gap-2 w-1/3 justify-end">
            <button onClick={toggleMute} className="text-zinc-400 hover:text-white transition">
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              <span className="sr-only">{isMuted ? "Unmute" : "Mute"}</span>
            </button>
            <Slider value={[volume]} min={0} max={1} step={0.01} onValueChange={handleVolumeChange} className="w-24" />
          </div>
        </div>
      </div>
    </div>
  )
}
