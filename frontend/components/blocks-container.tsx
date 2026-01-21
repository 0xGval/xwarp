"use client"

import { useMemo } from "react"
import { useDraggable } from "@dnd-kit/core"
import { CSS } from "@dnd-kit/utilities"
import type { SearchBlock, BlockCategory } from "@/types"
import { CATEGORY_TITLES, getCategoryColor } from "@/lib/blocks"

interface BlocksContainerProps {
  blocks: SearchBlock[]
  usedBlockTypes: string[]
  onBlockClickAction: (blockId: string) => void
}

export function BlocksContainer({ blocks, usedBlockTypes, onBlockClickAction }: BlocksContainerProps) {
  const groupedBlocks = useMemo(() => {
    const groups: Record<BlockCategory, SearchBlock[]> = {
      keyword: [],
      user: [],
      media: [],
      date: [],
      engagement: [],
    }

    blocks.forEach((block) => {
      if (groups[block.category]) {
        groups[block.category].push(block)
      }
    })

    return groups
  }, [blocks])

  return (
    <nav className="space-y-6" aria-label="Search block categories" role="region">
      {(Object.entries(groupedBlocks) as [BlockCategory, SearchBlock[]][]).map(
        ([category, categoryBlocks]) => (
          <div key={category} className="space-y-2" role="group" aria-labelledby={`category-${category}`}>
            <h3 id={`category-${category}`} className="text-sm font-medium">
              {CATEGORY_TITLES[category]}
            </h3>
            <div className="flex flex-wrap gap-2" role="listbox" aria-label={`${CATEGORY_TITLES[category]} search blocks`}>
              {categoryBlocks.map((block) => (
                <DraggableBlock
                  key={block.id}
                  block={block}
                  category={category}
                  isUsed={usedBlockTypes.includes(block.type)}
                  onBlockClick={onBlockClickAction}
                />
              ))}
            </div>
          </div>
        )
      )}
    </nav>
  )
}

interface DraggableBlockProps {
  block: SearchBlock
  category: string
  isUsed: boolean
  onBlockClick: (blockId: string) => void
}

function DraggableBlock({ block, category, isUsed, onBlockClick }: DraggableBlockProps) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: block.id,
    disabled: isUsed,
    data: { type: "block", block, category },
  })

  const style = transform ? { transform: CSS.Translate.toString(transform) } : undefined

  const handleClick = () => {
    if (!isUsed) {
      onBlockClick(block.id)
    }
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      onClick={handleClick}
      className={`${getCategoryColor(category, isUsed)} border rounded-md px-3 py-2 text-sm transition-colors ${
        isDragging ? "opacity-50" : ""
      } ${isUsed ? "" : "cursor-pointer"}`}
      role="option"
      aria-selected={isUsed}
      aria-disabled={isUsed}
      aria-label={`${block.label} ${isUsed ? "(already used)" : "(available)"}`}
    >
      {block.label}
    </div>
  )
}
