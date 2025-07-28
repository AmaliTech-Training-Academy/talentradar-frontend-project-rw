"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {  Developers } from "@/lib/dummyData";
import RatingSelector from "./components/rating-selector";
import { CircleCheck, Loader, Save } from "lucide-react";
import { ManagerFeedbackSchema } from "@/lib/schemas/manager-feedback-schema";
import { cn } from "@/lib/utils";
import { RATING_OPTIONS } from "@/lib/get-rating-tittle";
import { getRatingTitle } from "@/lib/get-rating-tittle";
import { useState } from "react";
import ConfirmationModal from "../components/manager-confirmation-modal";
import { toast } from "sonner";
import dynamic from "next/dynamic";
import { useEffect } from "react";

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
const RichTextEditor = dynamic(() => import("./components/rich-text-editor"), {
  ssr: false,
});
import UserCarousel from "./components/user-carousel";
import SelectedUser from "./components/selected-user";
import { CommentFeedback, Dimensions, InitialDimensions } from "@/lib/types";

type FormValues = z.infer<typeof ManagerFeedbackSchema>;

export default function ManagerFeedBackPage() {
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [developers, setDevelopers] = useState<Developers[]>([]);
  const [dimensions, setDimensions] = useState<Dimensions[]>([]);
  const [commentTypes, setCommentTypes] = useState<CommentFeedback[]>([]);
  //eslint-disable-next-line
  const [loading, setLoading] = useState(true);
  const [fetchDevelopersLoading, setFetchDevelopersLoading] = useState(true);

  const form = useForm<FormValues>({
    resolver: zodResolver(ManagerFeedbackSchema),
    defaultValues: {
      dimensions: [],
      feedbackComments: [], 
    },
  });

  const {
    handleSubmit,
    watch,
    setValue,
    register,
    reset,
    trigger,
    formState: { errors,isLoading },
  } = form;

async function handleSubmitConfirm() {
  console.log("object");
  setShowConfirmModal((prev) => !prev);
  handleSubmit(onSubmit)
}
  useEffect(() => {
    const fetchDimensions = async () => {
      try {
        const res = await fetch(`${baseUrl}/dimensions`, {
          method: "GET",
          credentials: 'include',
          headers: {
            "Content-Type": "application/json",
            "X-Requested-With": "XMLHttpRequest",
          },
        });

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();
        const fetchedDimensions = data.data || [];
        setDimensions(fetchedDimensions);

      } catch (err) {
        console.error("Failed to fetch dimensions:", err);
        toast.error("Failed to load assessment dimensions");
      } finally {
        setLoading(false);
      }
    };

    fetchDimensions();
  }, []);


  useEffect(() => {
    if (dimensions.length > 0 && commentTypes.length > 0) {
      const initialDimensions = dimensions.map((d: InitialDimensions) => ({
        dimensionDefinitionId: d.id,
        rating: 3,
        comment: "", 
      }));

      const initialComments = commentTypes.map((c) => ({
        commentId: c.id,
        feedbackCommentBody: "",
      }));

      reset({
        dimensions: initialDimensions,
        feedbackComments: initialComments,
      });
    }
  }, [dimensions, commentTypes, reset]);

  useEffect(() => {
    const fetchDevelopers = async () => {
      try {
        setFetchDevelopersLoading(true);
        const response = await fetch(`${baseUrl}/user-assign/developers`, {
          method: "GET",
          credentials: 'include',
          headers: {
            "X-Requested-With": "XMLHttpRequest",
          },
        });
        const data = await response.json();
setDevelopers(data.data);
        console.log(data.data);
      } catch (error) {
        console.error("Error fetching developers:", error);
        toast.error("Failed to fetch developers data");
      } finally{
        setFetchDevelopersLoading(false);
      }
    };

    fetchDevelopers();
  }, []);

  useEffect(() => {
    const fetchCommentTypes = async () => {
      try {
        const response = await fetch(`${baseUrl}/feedbacks/comments/templates`, {
          method: "GET",
          credentials: 'include',
          headers: {
            "X-Requested-With": "XMLHttpRequest",
          },
        });
        const data = await response.json();
        if (Array.isArray(data.data)) {
          console.log(data.data);
          setCommentTypes(data.data);
        }
      } catch (error) {
        console.error("Error fetching comment types:", error);
        toast.error("Failed to fetch comment types");
      }
    };
    fetchCommentTypes();
  }, []);

  const calculateOverallScore = () => {
    const scores = dimensions.map((_, index) =>
      watch(`dimensions.${index}.rating`)
    );
    const average = scores.reduce((a, b) => a + b, 0) / scores.length;
    return average.toFixed(1);
  };


  const handleSubmitClick = async () => {
    if (!selectedUser) {
      toast.error("Please select a team member to evaluate");
      return;
    }

    if (!selectedUserData) {
      toast.error("Selected user data not found");
      return;
    }

    // Trigger validation manually
    const isValid = await trigger();
    if (!isValid) {
      toast.error("Please fill in all required fields");
      console.log("Form errors:", errors);
      return;
    }

    setShowConfirmModal(true);
  };

  const onSubmit = async (data: FormValues) => {
    if (!selectedUser || !selectedUserData) return;
    
    try {
     
      const payload = {
        managerId: selectedUserData.managerId,
        developerId: selectedUser,
        dimensions: data.dimensions,
        feedbackComments: data.feedbackComments,
      };
      
      
      const response = await fetch(`${baseUrl}/feedbacks`, {
        method: "POST",
        credentials: 'include',
        headers: {
          "Content-Type": "application/json",
          "X-Requested-With": "XMLHttpRequest",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `Failed to submit feedback: ${response.status}`);
      }

      const result = await response.json();

      setShowConfirmModal(false);
      toast.success("Evaluation submitted successfully");
      console.log("Submission result:", result);
      
      
      reset();
      setSelectedUser(null);
      
    } catch (error) {
      console.error("Submission error:", error);
      setShowConfirmModal(false);
      toast.error(error instanceof Error ? error.message : "Failed to submit evaluation");
    }
  };

  const selectedUserData = developers?.find((u) => u.id === selectedUser);

  return (
    <div className="px-5 p-8 space-y-8">
      <div className="border rounded-xl pb-5 overflow-hidden">
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

            {fetchDevelopersLoading ? (
              <div className="flex items-center justify-center h-10">
                <Loader className="animate-spin h-6 w-6 mx-auto text-primary" />
              </div>
            ) : (
              <UserCarousel users={developers} setSelectedUser={setSelectedUser} selectedUser={selectedUser} />
            )}
          </div>

          {selectedUser && (
            <>
              <SelectedUser selectedUserData={selectedUserData} calculateOverallScore={calculateOverallScore} />
              <div className="space-y-6 pt-5">
                {dimensions?.map((dim, index) => (
                  <Card key={dim.id}>
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <h3>{dim.dimensionName}</h3>
                        <div className="flex items-center gap-2">
                          <p className="text-muted-foreground text-xs">
                            Weight: {dim.weight}%
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
                          {dim.gradingCriteria.map((c) => (
                            <li key={c.id} className="flex items-center gap-1">
                              <CircleCheck size={12} className="text-teal" />
                              <p>{c.criteriaName}</p>
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
                          placeholder={`Provide specific feedback for ${dim.dimensionName}...`}
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
                    <Card key={type.id}>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          {type.commentTitle}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <Controller
                          control={form.control}
                          name={`feedbackComments.${index}.feedbackCommentBody`}
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
                    type="button"
                    disabled={isLoading}
                  >
                    <Save size={16} />
                    {isLoading ? (
                      <Loader className="animate-spin h-4 w-4" />
                    ) : (
                      "Submit Evaluation"
                    )}
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      <ConfirmationModal
        isOpen={showConfirmModal}
        onClose={() => {console.log("object");}}
        onConfirm={() => setShowConfirmModal(false)}
      />
    </div>
  );
}