"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { dimensions, users, commentTypes } from "@/lib/dummyData";
import RatingSelector from "./components/rating-selector";
import { CircleCheck, Save } from "lucide-react";
import { ManagerFeedbackSchema } from "@/lib/schemas/manager-feedback-schema";
import { cn } from "@/lib/utils";
import { RATING_OPTIONS } from "@/lib/get-rating-tittle";
import { getRatingTitle } from "@/lib/get-rating-tittle";
import { useState } from "react";
import ConfirmationModal from "../components/manager-confirmation-modal";
import { toast } from "sonner";
import dynamic from "next/dynamic";

const RichTextEditor = dynamic(() => import("./components/rich-text-editor"), {
  ssr: false,
});
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

type FormValues = z.infer<typeof ManagerFeedbackSchema>;

export default function ManagerFeedBackPage() {
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(ManagerFeedbackSchema),
    defaultValues: {
      dimensions: dimensions.map((d) => ({
        dimension_definition_id: d.id,
        rating: 3,
        comment: "",
      })),
      comments: commentTypes.map((c) => ({
        id: c.comment_id,
        comment_title: c.comment_title,
        comment_content: "",
      })),
    },
  });

  const {
    handleSubmit,
    watch,
    setValue,
    register,
    formState: { errors },
  } = form;

  const calculateOverallScore = () => {
    const scores = dimensions.map((_, index) =>
      watch(`dimensions.${index}.rating`)
    );
    const average = scores.reduce((a, b) => a + b, 0) / scores.length;
    return average.toFixed(1);
  };

const handleSubmitClick = form.handleSubmit(() => {
  if (!selectedUser) {
    toast.error("Please select a team member to evaluate");
    return;
  }
  setShowConfirmModal(true);
});


  const onSubmit = (data: FormValues) => {
    if (!selectedUser) return;
//eslint-disable-next-line
    const payload = {
      developer_id: selectedUser,
      dimensions: data.dimensions,
      comments: data.comments.map((comment) => ({
        id: comment.id,
        comment_title: comment.comment_title,
        comment_content: comment.comment_content,
      })),
    };

    // console.log("SUBMIT PAYLOAD:", payload);
    setShowConfirmModal(false);
    toast.success("Evaluation submitted successfully");
  };

  const selectedUserData = users.find((u) => u.id === selectedUser);

  return (
    <div className="  px-5 p-8 space-y-8">
      <div className="  border rounded-xl pb-5  overflow-hidden">
        <div className="mb-5 p-5 border-b bg-foreground/5 space-y-1">
          <h3 className="md:text-3xl text-xl font-bold mb-2">
            Manager Performance Evaluation
          </h3>
          <p className="text-muted-foreground text-sm">
            Comprehensive 360-degree feedback based on enterprise performance
            standards
          </p>
        </div>
        <div className="px-5 space-y-5">
          <div className="p-6 border-b bg-muted-foreground/5 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">
              Select Team Member for Evaluation
            </h2>
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
                    key={user.id}
                    className="md:basis-1/3 lg:basis-1/3 pl-4 "
                  >
                    <div
                      onClick={() => setSelectedUser(user.id)}
                      className={cn(
                        "p-4 border rounded-lg cursor-pointer transition-all h-full",
                        selectedUser === user.id
                          ? "border-primary bg-primary/5 border-2"
                          : "hover:border-gray-400"
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={user.avatar} alt={user.name} />
                          <AvatarFallback>
                            {user.name.substring(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-medium">{user.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            {user.email}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Joined: {user.joinDate}
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
          </div>

          {selectedUser && (
            <>
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
                              src={selectedUserData.avatar}
                              alt={selectedUserData.name}
                            />
                            <AvatarFallback>
                              {selectedUserData.name
                                .substring(0, 2)
                                .toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="font-medium">
                              {selectedUserData.name}
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              {selectedUserData.role}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              Joined: {selectedUserData.joinDate}
                            </p>
                          </div>
                        </div>

                        <div className="text-center">
                          <div className="text-3xl font-bold text-primary">
                            {calculateOverallScore()}
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Overall Rating
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className=" space-y-6 pt-5">
                {dimensions.map((dim, index) => (
                  <Card key={dim.id}>
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <h3>{dim.dimension_name}</h3>
                        <div className="flex items-center gap-2">
                          <p className="text-muted-foreground text-xs">
                            Weight: {dim.Weight}%
                          </p>
                          <p
                            className={cn(
                              "text-xs bg-white border rounded-full px-2 inline",
                              watch(`dimensions.${index}.rating`) === 1 &&
                                "text-destructive",
                              watch(`dimensions.${index}.rating`) === 2 &&
                                "text-orange",
                              watch(`dimensions.${index}.rating`) === 3 &&
                                "text-chart-4",
                              watch(`dimensions.${index}.rating`) === 4 &&
                                "text-primary",
                              watch(`dimensions.${index}.rating`) === 5 &&
                                "text-teal"
                            )}
                          >
                            {getRatingTitle(
                              watch(`dimensions.${index}.rating`)
                            )}
                          </p>
                        </div>
                      </CardTitle>
                      <p className="text-muted-foreground">{dim.description}</p>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <ul className="list-inside text-sm text-muted-foreground bg-white dark:bg-background p-2 rounded-md mb-4 border">
                        <p className="font-semibold">Evaluation Criteria:</p>
                        <div className="grid grid-cols-2">
                          {dim.criteria.map((c) => (
                            <li key={c.id} className="flex items-center gap-1">
                              <CircleCheck size={12} className="text-teal" />
                              <p>{c.criteria_name}</p>
                            </li>
                          ))}
                        </div>
                      </ul>

                      <RatingSelector
                        options={RATING_OPTIONS}
                        selected={watch(`dimensions.${index}.rating`)}
                        onSelectAction={(val) =>
                          setValue(`dimensions.${index}.rating`, val)
                        }
                      />

                      <div className="space-y-2">
                        <label className="text-sm font-medium">
                          Dimension-specific feedback
                        </label>
                        <Textarea
                          placeholder={`Provide specific feedback for ${dim.dimension_name}...`}
                          {...register(`dimensions.${index}.comment`)}
                          rows={4}
                        />
                        {errors.dimensions?.[index]?.comment && (
                          <p className="text-sm text-destructive">
                            {errors.dimensions[index]?.comment?.message}
                          </p>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}

                <div className="grid md:grid-cols-2 gap-6">
                  {commentTypes.map((type, index) => (
                    <Card key={type.comment_id}>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          {type.comment_title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <Controller
                          control={form.control}
                          name={`comments.${index}.comment_content`}
                          render={({ field, fieldState }) => (
                            <>
                              <RichTextEditor
                                value={field.value}
                                onChange={field.onChange}
                              />
                              {fieldState.error && (
                                <p className="text-sm text-destructive mt-2">
                                  {fieldState.error.message}
                                </p>
                              )}
                            </>
                          )}
                        />
                        
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <div className="flex justify-end mt-6 mb-10">
                  <Button
                    className="text-white flex items-center gap-2"
                    onClick={handleSubmitClick}
                  >
                    <Save size={16} />
                    Submit Evaluation
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      <ConfirmationModal
        isOpen={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        onConfirm={() => handleSubmit(onSubmit)()}
      />
    </div>
  );
}
