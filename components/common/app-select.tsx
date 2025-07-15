"use client";

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
    className
}: {
    options: { value: string, label: string}[];
    placeholder: string;
    value: string;
    onChangeAction: (value: string) => void;
    className?: string;
}) => {
    return (
        <Select value={value} onValueChange={onChangeAction}>
            <SelectTrigger className={className}>
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
    );
};