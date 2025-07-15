'use client';

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

interface AppSelectProps {
    options: { value: string, label: string}[];
    placeholder: string;
    value: string;
    onChangeAction: (value: string) => void;

}

export const AppSelect = ({ options, placeholder, value, onChangeAction }: AppSelectProps) => {
    return (
        <Select value={value} onValueChange={onChangeAction}>
            <SelectTrigger>
                <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
                {options.map(option => (
                    <SelectItem key={option.value} value={option.value} className="capitalize">
                        {option.label}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    )
}