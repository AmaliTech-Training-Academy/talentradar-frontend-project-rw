import {
    Select,
    SelectContent,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

interface AppSelectProps {
    items: string[],
    // selectedItem: string;
    // onChangeAction: (item: string) => void;

}

export const AppSelect = ({ items }: AppSelectProps) => {
    return (
        <Select>
            <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by Date range" />
            </SelectTrigger>
            <SelectContent>
                {items.map(item => (
                    <SelectItem key={item} value={item} className="capitalize">
                        {item}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    )
}