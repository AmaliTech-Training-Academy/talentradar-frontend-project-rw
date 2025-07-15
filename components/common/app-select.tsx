'use client'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export const AppSelect = ({
  options,
  placeholder,
  value,
  onChangeAction,
}: {
  value: string
  onChangeAction: (value: string) => void
  placeholder: string
  options: { value: string; label: string }[]
}) => {
  return (
    <Select value={value} onValueChange={onChangeAction}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
