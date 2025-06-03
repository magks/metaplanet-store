'use client'
import { useEffect, useState } from 'react'

// Single interface for dimensions
export interface Dimensions {
  width: number
  height: number
}

// Hook for screen dimensions (physical screen)
export function useScreenSize(): Dimensions {
  const [screenSize, setScreenSize] = useState<Dimensions>({ width: 0, height: 0 })

  useEffect(() => {
    const updateScreenSize = () => {
      setScreenSize({
        width: window.screen.width,
        height: window.screen.height
      })
    }

    // Set initial size after component mounts (client-side only)
    updateScreenSize()

    window.addEventListener('resize', updateScreenSize)
    return () => window.removeEventListener('resize', updateScreenSize)
  }, [])

  return screenSize
}

// Hook for viewport dimensions (browser window) - SSR safe
export function useViewportSize(): Dimensions {
  const [viewportSize, setViewportSize] = useState<Dimensions>({ width: 0, height: 0 })
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    // Mark as client-side and set initial dimensions
    setIsClient(true)
    
    const updateViewportSize = () => {
      setViewportSize({
        width: window.innerWidth,
        height: window.innerHeight
      })
    }

    updateViewportSize()

    // Set up resize listener
    window.addEventListener('resize', updateViewportSize)
    
    // Also listen for orientation changes on mobile
    window.addEventListener('orientationchange', updateViewportSize)
    
    return () => {
      window.removeEventListener('resize', updateViewportSize)
      window.removeEventListener('orientationchange', updateViewportSize)
    }
  }, [])

  return viewportSize
}

// Hook that returns both screen and viewport dimensions
export function useWindowDimensions() {
  const screenSize = useScreenSize()
  const viewportSize = useViewportSize()

  return {
    screen: screenSize,
    viewport: viewportSize
  }
}

// Hook to check if viewport dimensions are ready (not 0x0)
export function useViewportReady(): boolean {
  const { width, height } = useViewportSize()
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  return isClient && width > 0 && height > 0
}

// Hook for responsive breakpoints
export function useBreakpoint() {
  const { width } = useViewportSize()
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])
  
  return {
    isMobile: isClient ? width < 768 : false,
    isTablet: isClient ? width >= 768 && width < 1024 : false,
    isDesktop: isClient ? width >= 1024 : false,
    isLarge: isClient ? width >= 1280 : false,
    isXLarge: isClient ? width >= 1536 : false,
    width,
    isClient
  }
}

// Utility function to check if we're on client side
export function isClientSide(): boolean {
  return typeof window !== 'undefined'
}

// Get current dimensions without hooks (one-time check)
export function getCurrentDimensions() {
  if (!isClientSide()) {
    return { 
      screen: { width: 0, height: 0 }, 
      viewport: { width: 0, height: 0 } 
    }
  }
  
  return {
    screen: {
      width: window.screen.width,
      height: window.screen.height
    },
    viewport: {
      width: window.innerWidth,
      height: window.innerHeight
    }
  }
}

// Hook for debounced viewport size (useful for expensive operations)
export function useDebouncedViewportSize(delay: number = 250): Dimensions {
  const currentSize = useViewportSize()
  const [debouncedSize, setDebouncedSize] = useState<Dimensions>({ width: 0, height: 0 })

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSize(currentSize)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [currentSize, delay])

  return debouncedSize
}

// Hook that combines viewport size with mounted state for animations
export function useViewportForAnimations() {
  const { width, height } = useViewportSize()
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  return {
    width,
    height,
    isMounted,
    isReady: isMounted && width > 0 && height > 0
  }
}