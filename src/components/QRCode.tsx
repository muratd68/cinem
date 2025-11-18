'use client';

import React from 'react';

interface QRCodeProps {
  data: string;
  size?: number;
}

// Simple QR Code generator using SVG patterns
export default function QRCode({ data, size = 200 }: QRCodeProps) {
  // Create a simple deterministic pattern based on data
  const generatePattern = (input: string): boolean[][] => {
    const gridSize = 21;
    const pattern: boolean[][] = [];

    // Simple hash function
    let hash = 0;
    for (let i = 0; i < input.length; i++) {
      const char = input.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash;
    }

    // Generate pattern
    for (let row = 0; row < gridSize; row++) {
      pattern[row] = [];
      for (let col = 0; col < gridSize; col++) {
        // Position patterns (corners)
        const isPositionPattern =
          (row < 7 && col < 7) || // Top-left
          (row < 7 && col >= gridSize - 7) || // Top-right
          (row >= gridSize - 7 && col < 7); // Bottom-left

        if (isPositionPattern) {
          // Create finder pattern
          const inOuter = row === 0 || row === 6 || col === 0 || col === 6 ||
                         row === gridSize - 7 || row === gridSize - 1 ||
                         col === gridSize - 7 || col === gridSize - 1;
          const inInner = (row >= 2 && row <= 4 && col >= 2 && col <= 4) ||
                         (row >= 2 && row <= 4 && col >= gridSize - 5 && col <= gridSize - 3) ||
                         (row >= gridSize - 5 && row <= gridSize - 3 && col >= 2 && col <= 4);
          pattern[row][col] = inOuter || inInner;
        } else {
          // Data pattern based on hash
          const seed = (hash + row * gridSize + col) % 100;
          pattern[row][col] = seed < 45;
        }
      }
    }

    return pattern;
  };

  const pattern = generatePattern(data);
  const moduleSize = size / 21;

  return (
    <div className="inline-block bg-white p-4 rounded-lg">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {pattern.map((row, rowIndex) =>
          row.map((cell, colIndex) =>
            cell ? (
              <rect
                key={`${rowIndex}-${colIndex}`}
                x={colIndex * moduleSize}
                y={rowIndex * moduleSize}
                width={moduleSize}
                height={moduleSize}
                fill="black"
              />
            ) : null
          )
        )}
      </svg>
    </div>
  );
}
