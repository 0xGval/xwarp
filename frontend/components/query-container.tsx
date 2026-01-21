"use client"

import { useDroppable } from "@dnd-kit/core"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import type { ActiveBlock } from "@/types"
import { getCategoryStyles } from "@/lib/blocks"

interface QueryContainerProps {
  blocks: ActiveBlock[]
  updateBlockValueAction: (id: string, value: string, value2?: string) => void
  removeBlockAction: (id: string) => void
}

export function QueryContainer({ blocks, updateBlockValueAction, removeBlockAction }: QueryContainerProps) {
  const { setNodeRef, isOver } = useDroppable({
    id: "query-container",
  })

  return (
    <div
      ref={setNodeRef}
      className={`border-2 ${isOver ? "border-primary border-dashed bg-primary/5" : "border-dashed"} rounded-lg p-4 min-h-[200px] query-container`}
      role="region"
      aria-label="Active search query blocks"
    >
      {blocks.length === 0 ? (
        <div className="h-full flex items-center justify-center text-center text-gray-500" role="status" aria-label="Empty query container">
          Drag blocks here to build your query
        </div>
      ) : (
        <div className="space-y-3" role="list" aria-label="Active search blocks">
          {blocks.map((block) => {
            const categoryStyles = getCategoryStyles(block.category)
            return (
              <Card key={block.id} className={cn("overflow-hidden shadow-sm", categoryStyles.borderClasses)}>
                <CardHeader className={cn("flex flex-row items-center justify-between p-3 space-y-0", categoryStyles.headerClasses)}>
                  <CardTitle className="text-sm font-medium leading-none">{block.label}</CardTitle>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeBlockAction(block.id)}
                    aria-label={`Remove ${block.label} block`}
                    className="h-7 w-7 rounded-full text-current hover:bg-black/10 dark:hover:bg-white/10"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </CardHeader>
                <CardContent className="p-3 bg-card">
                  {block.requiresValue ? (
                    <div className="space-y-2">
                      <Input
                        type={block.inputType || "text"}
                        placeholder={block.placeholder}
                        value={block.value}
                        onChange={(e) => updateBlockValueAction(block.id, e.target.value, block.value2)}
                        aria-label={`${block.label} value`}
                        className="text-sm"
                      />
                      {block.requiresSecondValue && block.placeholder2 && (
                        <Input
                          type={block.inputType || "text"}
                          placeholder={block.placeholder2}
                          value={block.value2 || ""}
                          onChange={(e) => updateBlockValueAction(block.id, block.value, e.target.value)}
                          aria-label={`${block.label} second value`}
                          className="text-sm"
                        />
                      )}
                    </div>
                  ) : (
                    <p className="text-xs text-muted-foreground italic">No additional configuration needed.</p>
                  )}
                </CardContent>
              </Card>
            )
          })}
        </div>
      )}
    </div>
  )
}
