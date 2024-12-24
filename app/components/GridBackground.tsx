'use client'

import { motion } from 'framer-motion'
import { useEffect, useState, useRef } from 'react'

export default function GridBackground() {
  const gridRef = useRef(null)
  const squareSize = 96 // size in px
  const squareColors = ['#5E81AC4D', '#8FBCBB33', '#88C0D040', '#81A1C13B']
  const [numSquares, setNumSquares] = useState(50)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const [filledSquares, setFilledSquares] = useState(() =>
    fillRandomSquares(numSquares)
  )

  function getPos() {
    const rows = Math.ceil(dimensions.width / squareSize)
    const cols = Math.ceil(dimensions.height / squareSize)

    return [Math.floor(Math.random() * rows), Math.floor(Math.random() * cols)]
  }

  function fillRandomSquares(numSquares: number) {
    return Array.from({ length: numSquares }, (_, i) => ({
      id: i,
      pos: getPos(),
    }))
  }

  const getNewSquarePos = (id: number) => {
    setFilledSquares((currentSquares) =>
      currentSquares.map((square) =>
        square.id === id ? { ...square, pos: getPos() } : square
      )
    )
  }

  useEffect(() => {
    let previousWidth: number | null = null
    let previousHeight: number | null = null

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const width = entry.contentRect.width
        const height = entry.contentRect.height

        const widthChanged =
          previousWidth === null || Math.abs(width - previousWidth) >= 96
        const heightChanged =
          previousHeight === null || Math.abs(height - previousHeight) >= 96

        if (widthChanged || heightChanged) {
          previousWidth = width
          previousHeight = height

          if (width < 640) setNumSquares(15)
          else if (width < 768) setNumSquares(25)
          else setNumSquares(50)

          setDimensions({ width, height })
        }
      }
    })

    const currentGridRef = gridRef.current

    if (currentGridRef) {
      resizeObserver.observe(currentGridRef)
    }

    return () => {
      if (currentGridRef) {
        resizeObserver.unobserve(currentGridRef)
      }
    }
  }, [gridRef])

  useEffect(() => {
    if (dimensions.width && dimensions.height) {
      setFilledSquares(fillRandomSquares(numSquares))
    }
  }, [dimensions, numSquares])

  return (
    <div
      ref={gridRef}
      className="absolute overflow-hidden z-[-10] inset-0 h-full w-full bg-[#2E3440] bg-[linear-gradient(to_right,#D8DEE912_1px,transparent_1px),linear-gradient(to_bottom,#D8DEE912_1px,transparent_1px)] bg-[size:96px_96px]"
    >
      {filledSquares.map(({ id, pos: [x, y] }, index) => (
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{
            duration: 4,
            repeat: Infinity,
            repeatDelay: 0.5,
            delay: index * 0.5,
            repeatType: 'reverse',
          }}
          onAnimationComplete={() => getNewSquarePos(id)}
          key={id}
          className="absolute"
          style={{
            width: `${squareSize}px`,
            height: `${squareSize}px`,
            top: `${y * squareSize}px`,
            left: `${x * squareSize}px`,
            backgroundColor: `${squareColors[index % 4]}`,
          }}
        />
      ))}
    </div>
  )
}
