"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { dimensions } from "@/lib/dummyData";
import RatingSelector from "@/app/dashboard/manager-feedback/components/rating-selector";
import { CircleCheck, Save, SaveAll, TrendingUp } from "lucide-react";
import { SelfAssessmentSchema } from "@/lib/schemas/self-assessment";
import { cn } from "@/lib/utils";
import { RATING_OPTIONS } from "@/lib/get-rating-tittle";
import { getRatingTitle } from "@/lib/get-rating-tittle";
import { useState } from "react";
import { ConfirmationModal } from "../components/confirmation-modal";
import { calculateOverallScore } from "@/lib/calculate-overall-score";

type FormValues = z.infer<typeof SelfAssessmentSchema>;

export default function SelfAssessmentPage() {
  const [hasDraft, setHasDraft] = useState(false);
  const [lastSaved, setLastSaved] = useState<string | null>(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(SelfAssessmentSchema),
    defaultValues: {
      reflection: "",
      dimensions: dimensions.map((d) => ({
        dimension_definition_id: d.id,
        rating: 3,
      })),
    },
  });

  const {
    handleSubmit,
    watch,
    setValue,
    register,
    formState: { errors, isDirty },
  } = form;

  const onSubmit = (data: FormValues, isDraft: boolean = false) => {
    const payload = {
      userId: "550e8400-e29b-41d4-a716-446655440000",
      reflection: data.reflection,
      status: isDraft ? "DRAFT" : "SUBMITTED",
      dimensions: data.dimensions,
      lastUpdated: new Date().toISOString(),
    };

    if (isDraft) {
      setHasDraft(true);
      setLastSaved(new Date().toLocaleTimeString());
    } else {
      setShowConfirmModal(false);
    }
  };
  const getDimensionScores = () => {
    return dimensions.map((dim, index) => ({
      name: dim.dimension_name,
      rating: watch(`dimensions.${index}.rating`),
    }));
  };

  const overallScore = calculateOverallScore(getDimensionScores());

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
              <p>4.0</p>
            </div>
            <p className="text-primary text-xs">High Performance</p>
          </div>
        </div>

        <div className="px-5 space-y-6 pt-5">
          {dimensions.map((dim, index) => (
            <Card key={dim.id} className="bg-muted-foreground/10">
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
                        watch(`dimensions.${index}.rating`) === 5 && "text-teal"
                      )}
                    >
                      {getRatingTitle(watch(`dimensions.${index}.rating`))}
                    </p>
                  </div>
                </CardTitle>
                <p className="text-muted-foreground">{dim.description}</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="list-inside text-sm text-muted-foreground bg-white dark:bg-background p-2 rounded-md mb-4 border">
                  <p className="font-semibold">Assessment Criteria:</p>
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
              </CardContent>
            </Card>
          ))}

          <Card>
            <CardHeader>
              <CardTitle>Reflection & Development goals</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="Write your reflection here..."
                {...register("reflection")}
              />
              {errors.reflection && (
                <p className="text-sm text-destructive">
                  {errors.reflection.message}
                </p>
              )}
            </CardContent>
          </Card>
          <div className="border rounded-xl bg-primary/20 p-4">
            <p className="font-semibold mb-2 text-primary">
              Assessment Summary
            </p>
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
              <p className="text-lg font-semibold">{overallScore}</p>
              <p className="text-sm">Weighted Overall Score</p>
            </div>
          </div>

          <div className="flex justify-end gap-4 mt-6 mb-10">
            <Button
              variant="outline"
              className="flex items-center gap-2"
              onClick={() => handleSubmit((data) => onSubmit(data, true))()}
              disabled={!isDirty}
            >
              <SaveAll size={16} />
              Save Draft
            </Button>
            <Button
              className="text-white flex items-center gap-2"
              onClick={() => setShowConfirmModal(true)}
            >
              <Save size={16} />
              Submit Assessment
            </Button>
          </div>
        </div>
      </div>

      <ConfirmationModal
        isOpen={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        onConfirm={() => handleSubmit((data) => onSubmit(data, false))()}
      />
    </div>
  );
}
