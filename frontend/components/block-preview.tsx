"use client"

import type { SearchBlock, ActiveBlock } from "@/types"
import { getCategoryColor } from "@/lib/blocks"

interface BlockPreviewProps {
  block: SearchBlock | ActiveBlock
  category: string
}

export function BlockPreview({ block, category }: BlockPreviewProps) {
  // Get base color without hover state for preview
  const baseColor = getCategoryColor(category).replace(" hover:bg-blue-200", "")
    .replace(" hover:bg-green-200", "")
    .replace(" hover:bg-purple-200", "")
    .replace(" hover:bg-orange-200", "")
    .replace(" hover:bg-red-200", "")
    .replace(" hover:bg-gray-200", "")

  return (
    <div
      className={`${baseColor} border rounded-md px-3 py-2 text-sm shadow-md`}
      role="option"
      aria-label={`${category} search block: ${block.label}`}
    >
      {block.label}
    </div>
  )
}
