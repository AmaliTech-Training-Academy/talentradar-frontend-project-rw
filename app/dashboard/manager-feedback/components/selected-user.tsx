import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Developers } from "@/lib/dummyData";

type SelectedUserProps = {
  selectedUserData: Developers | undefined;
  calculateOverallScore: () => string;
};

const SelectedUser: React.FC<SelectedUserProps> = ({
  selectedUserData,
  calculateOverallScore,
}) => {
  return (
    <div className="p-6 border-b bg-muted-foreground/5 rounded-lg">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <h1 className="md:text-3xl text-xl font-bold mb-4">
            Developer Performance Review
          </h1>
          {selectedUserData && (
            <div className="border-2 border-primary bg-primary/10 rounded-lg p-4 flex items-center justify-between">
              <div className="flex items-center gap-3 ">
                <Avatar className="h-12 w-12">
                  <AvatarImage
                    src={selectedUserData.username}
                    alt={selectedUserData.username}
                  />
                  <AvatarFallback>
                    {selectedUserData.username.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-medium">{selectedUserData.username}</h3>
                  <p className="text-sm text-muted-foreground">
                    {selectedUserData.role}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {/* Joined: {selectedUserData.joinDate} */}
                  </p>
                </div>
              </div>

              <div className="text-center">
                <div className="text-3xl font-bold text-primary">
                  {calculateOverallScore()}
                </div>
                <p className="text-sm text-muted-foreground">Overall Rating</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SelectedUser;
