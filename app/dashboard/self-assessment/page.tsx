"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import RatingSelector from "@/app/dashboard/manager-feedback/components/rating-selector";
import { CircleCheck, Loader, Save,  TrendingUp } from "lucide-react";
import { SelfAssessmentSchema } from "@/lib/schemas/self-assessment";
import { cn } from "@/lib/utils";
import { RATING_OPTIONS } from "@/lib/get-rating-tittle";
import { getRatingTitle } from "@/lib/get-rating-tittle";
import { useEffect, useState } from "react";
import { ConfirmationModal } from "../components/confirmation-modal";
import { calculateOverallScore } from "@/lib/calculate-overall-score";
import { InitialDimensions } from "@/lib/types";
import { Dimensions } from "@/lib/types";
import { GradingCriteria } from "@/lib/types";
import { toast } from "sonner";


type FormValues = z.infer<typeof SelfAssessmentSchema>;

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
const dimensionsEndpoint = 'dimensions';
const dimensionsUrl = `${baseUrl}/${dimensionsEndpoint}`;

export default function SelfAssessmentPage() {
  const [hasDraft, setHasDraft] = useState(false);
  const [lastSaved, setLastSaved] = useState<string | null>(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [dimensions, setDimensions] = useState<Dimensions[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(SelfAssessmentSchema),
    defaultValues: {
      reflection: "",
      dimensions: [],
    },
  });

  const {
    handleSubmit,
    watch,
    setValue,
    register,
    reset,
    trigger,
    formState: { errors,  },
  } = form;

 
  useEffect(() => {
    const fetchDimensions = async () => {
      try {
        const res = await fetch(dimensionsUrl, {
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


        const initialDimensions = fetchedDimensions.map((d: InitialDimensions) => ({
          dimensionDefinitionId: d.id,
          rating: 3,
        }));

        reset({
          reflection: "",
          dimensions: initialDimensions,
        });

      } catch (err) {
        console.error("Failed to fetch dimensions:", err);
        toast.error("Failed to load assessment dimensions");
      } finally {
        setLoading(false);
      }
    };

    fetchDimensions();
  }, [reset]);

  const onSubmit = async (data: FormValues, isDraft: boolean = false) => {
    try {
      setSubmitting(true);
      setSubmitError(null);
      
      const payload = {
        reflection: data.reflection,
        status: isDraft ? "DRAFT" : "SUBMITTED",
        dimensions: data.dimensions.map(dim => ({
          dimensionDefinitionId: dim.dimensionDefinitionId, 
          rating: dim.rating,
        })),
      };

      console.log("Submitting data:", payload);
      
      const assessmentUrl = `${baseUrl}/assessments`;
      
      const response = await fetch(assessmentUrl, {
        method: "POST",
        credentials: 'include',
        headers: {
          "Content-Type": "application/json",
          "X-Requested-With": "XMLHttpRequest",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        if (errorData && errorData.errors) {
          setSubmitError(errorData.errors[0] || "Failed to submit assessment");
          toast.error(errorData.errors[0] || "Failed to submit assessment");
          return;
        }
      }

      const result = await response.json();
      console.log("Submission successful:", result);

      if (isDraft) {
        setHasDraft(true);
        setLastSaved(new Date().toLocaleTimeString());
        toast.success("Draft saved successfully");
      } else {
        setShowConfirmModal(false);
        toast.success("Assessment submitted successfully");
        
      }
      
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Failed to submit assessment. Please try again.";
      setSubmitError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setSubmitting(false);
      reset()
    }
  };

  // const handleSaveDraft = () => {
  //   handleSubmit((data) => onSubmit(data, true))();
  // };


  const handleSubmitClick = async () => {
    setSubmitError(null);
    
    const isFormValid = await trigger();
    
    if (isFormValid) {
      setShowConfirmModal(true);
    } else {
      toast.error("Please fix all validation errors before submitting");

      const firstErrorField = document.querySelector('[aria-invalid="true"]');
      if (firstErrorField) {
        firstErrorField.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'center' 
        });
      }
    }
  };

  const handleSubmitAssessment = () => {
    handleSubmit((data) => onSubmit(data, false))();
  };

  const getDimensionScores = () => {
    return dimensions.map((dim, index) => ({
      name: dim.dimensionName,
      rating: watch(`dimensions.${index}.rating`) || 3,
    }));
  };

  const overallScore = (() => {
    try {
      const score = calculateOverallScore(getDimensionScores());
      return typeof score === 'number' && !isNaN(score) ? score : 3.0;
    } catch (error) {
      console.error('Error calculating overall score:', error);
      return 3.0;
    }
  })();

  if (loading) {
    return (
      <div data-testid="loading-spinner" className="px-5 p-8 space-y-8">
        <div className="border rounded-xl overflow-hidden">
          <div className="p-6 space-y-4 border-b bg-muted-foreground/10">
            <Loader className="animate-spin h-6 w-6 mx-auto text-primary" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="px-5 p-8 space-y-8">
      <div className="border rounded-xl overflow-hidden">
        <div className="p-6 space-y-4 border-b bg-muted-foreground/10 flex justify-between items-center">
          <div className="space-y-1">
            <h1 className="md:text-3xl text-xl font-bold">
              Professional Self-Assessment
            </h1>
            <p className="text-muted-foreground text-sm">
              Comprehensive evaluation based on industry-standards and
              competency frameworks
            </p>
            {hasDraft && lastSaved && (
              <p className="text-xs text-muted-foreground">
                Draft saved at {lastSaved}
              </p>
            )}
          </div>
          <div>
            <div className="flex items-center gap-2 text-lg font-semibold text-primary">
              <TrendingUp />
              <p>{typeof overallScore === 'number' ? overallScore.toFixed(1) : '3.0'}</p>
            </div>
            <p className="text-primary text-xs">
              {getRatingTitle(typeof overallScore === 'number' ? Math.round(overallScore) : 3)}
            </p>
          </div>
        </div>

        <form className="px-5 space-y-6 pt-5">
          {dimensions.map((dim, index) => (
            <Card key={dim.id} className="bg-muted-foreground/10">
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
                          "text-violet",
                        watch(`dimensions.${index}.rating`) === 4 &&
                          "text-primary",
                        watch(`dimensions.${index}.rating`) === 5 && "text-teal"
                      )}
                    >
                      {getRatingTitle(watch(`dimensions.${index}.rating`) || 3)}
                    </p>
                  </div>
                </CardTitle>
                <p className="text-muted-foreground">{dim.description}</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="list-inside text-sm text-muted-foreground bg-white dark:bg-background p-2 rounded-md mb-4 border">
                  <p className="font-semibold">Assessment Criteria:</p>
                  <div className="grid grid-cols-2">
                    {dim.gradingCriteria?.map((c: GradingCriteria) => (
                      <li key={c.id} className="flex items-center gap-1">
                        <CircleCheck size={12} className="text-teal-500" />
                        <p>{c.criteriaName}</p>
                      </li>
                    ))}
                  </div>
                </ul>

                <RatingSelector
                  options={RATING_OPTIONS}
                  selected={watch(`dimensions.${index}.rating`) || 3}
                  onSelectAction={(val) =>
                    setValue(`dimensions.${index}.rating`, val, { shouldDirty: true })
                  }
                />
                
                {/* Display validation error for this dimension if any */}
                {errors.dimensions?.[index] && (
                  <p className="text-sm text-destructive">
                    {errors.dimensions[index]?.rating?.message || 
                     errors.dimensions[index]?.dimensionDefinitionId?.message}
                  </p>
                )}
              </CardContent>
            </Card>
          ))}

          <Card>
            <CardHeader>
              <CardTitle>Reflection & Development goals</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                data-testid="comment"
                placeholder="Write your reflection here..."
                {...register("reflection")}
                className={errors.reflection ? "border-destructive" : ""}
              />
              {errors.reflection && (
                <p className="text-sm text-destructive mt-2">
                  {errors.reflection.message}
                </p>
              )}
            </CardContent>
          </Card>

          <div className="border rounded-xl bg-primary/20 p-4">
            <p className="font-semibold mb-2 text-primary">Assessment Summary</p>
            <div className="grid md:grid-cols-3 grid-cols-1 gap-4 mt-2">
              {getDimensionScores().map((dim, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center justify-center text-primary"
                >
                  <p className="text-lg font-semibold">{dim.rating}</p>
                  <p className="text-sm text-center">{dim.name}</p>
                </div>
              ))}
            </div>
            <hr className="border-primary my-2" />
            <div className="flex flex-col items-center justify-center text-primary">
              <p className="text-lg font-semibold">
                {typeof overallScore === 'number' ? overallScore.toFixed(1) : '3.0'}
              </p>
              <p className="text-sm">Weighted Overall Score</p>
            </div>
          </div>

          {submitError && (
            <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-3">
              <p className="text-destructive text-sm">{submitError}</p>
            </div>
          )}

          <div className="flex justify-end gap-4 mt-6 mb-10">
            {/* <Button
              type="button"
              variant="outline"
              className="flex items-center gap-2"
              onClick={handleSaveDraft}
              disabled={!isDirty || submitting}
            >
              <SaveAll size={16} />
              {submitting ? "Saving..." : "Save Draft"}
            </Button> */}
            <Button
              type="button"
              data-testid="submit-assessment-button"
              className="text-white flex items-center gap-2"
              onClick={handleSubmitClick} 
              disabled={submitting}
            >
              <Save size={16} />
              {submitting ? (
                      <Loader className="animate-spin h-4 w-4" />
                    ) : (
                      "Submit assessment"
                    )}
            </Button>
          </div>
        </form>
      </div>

      <ConfirmationModal
        isOpen={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        onConfirm={handleSubmitAssessment}
      />
    </div>
  );
}