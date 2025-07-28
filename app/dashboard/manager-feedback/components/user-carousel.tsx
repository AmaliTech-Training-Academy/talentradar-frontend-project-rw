import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { Developers } from "@/lib/dummyData";

type UserCarouselProps = {
  users: Developers[];
  setSelectedUser: (userId: string) => void;
  selectedUser: string | null;
};

const UserCarousel = ({
  users,
  setSelectedUser,
  selectedUser,
}: UserCarouselProps) => {
  return (
    <Carousel
      opts={{
        align: "start",
        loop: true,
      }}
      className="max-w-screen-lg  mx-auto"
    >
      <CarouselContent>
        {users.map((user) => (
          <CarouselItem
            key={user?.id}
            className="md:basis-1/3 lg:basis-1/3 pl-4 "
          >
            <div
              onClick={() => setSelectedUser(user?.id)}
              className={cn(
                "p-4 border rounded-lg cursor-pointer transition-all h-full",
                selectedUser === user.id
                  ? "border-primary bg-primary/5 border-2"
                  : "hover:border-gray-400"
              )}
            >
              <div className="flex items-center gap-3">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={user?.username} alt={user?.username} />
                  <AvatarFallback>
                    {user?.username.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-medium">{user?.username}</h3>
                  <p className="text-sm text-muted-foreground">{user?.email}</p>
                  <p className="text-xs text-muted-foreground">
                    {/* Joined: {user.joinDate} */}
                  </p>
                </div>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <div className="flex items-center justify-center gap-2 mt-4">
        <CarouselPrevious />
        <CarouselNext />
      </div>
    </Carousel>
  );
};

export default UserCarousel;
