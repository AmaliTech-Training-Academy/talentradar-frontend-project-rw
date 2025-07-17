"use client"

import { useState } from "react"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Button } from "@/components/ui/button"
import { ChevronDown } from "lucide-react"

interface MemberFeedbackProps {
  feedback: string
}

export const MemberFeedback = ({ feedback }: MemberFeedbackProps) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className="w-full space-y-2 mt-4">
      <CollapsibleTrigger asChild>
        <Button variant="ghost" className="w-full justify-between bg-secondary">
          Show More Detail
          <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent className="text-sm bg-ring/5 p-4 rounded-md">{feedback}</CollapsibleContent>
    </Collapsible>
  )
}
