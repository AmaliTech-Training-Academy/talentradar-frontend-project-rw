import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

import { UserCardProps } from "@/lib/types";

export default function UserCard({ user, isSelected, onClick }: UserCardProps) {
  return (
    <div
      onClick={onClick}
      className={cn(
        "p-4 border rounded-lg flex items-center gap-3 cursor-pointer transition-all hover:bg-accent",
        isSelected && "border-primary bg-primary/5"
      )}
    >
      <Avatar className="h-12 w-12">
        <AvatarImage src={user.avatar} alt={user.name} />
        <AvatarFallback>{user.name.substring(0, 2).toUpperCase()}</AvatarFallback>
      </Avatar>
      <div>
        <h3 className="font-medium">{user.name}</h3>
        <p className="text-sm text-muted-foreground">{user.email}</p>
        <p className="text-xs text-muted-foreground">Joined: {user.joinDate}</p>
      </div>
    </div>
  );
}