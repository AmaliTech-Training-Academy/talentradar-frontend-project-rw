"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { dimensions } from "@/lib/dummyData";
import RatingSelector, {
  RatingOption,
} from "@/components/feature-specific/dashboard/RatingSelector";

const RATING_OPTIONS: RatingOption[] = [
  {
    value: 1,
    color: "red",
    title: "Developing",
    desc: "Needs significant guidance",
  },
  {
    value: 2,
    color: "orange",
    title: "Progressing",
    desc: "Requires moderate guidance",
  },
  {
    value: 3,
    color: "yellow",
    title: "Proficient",
    desc: "Works independently",
  },
  { value: 4, color: "blue", title: "Advanced", desc: "Exceeds expectations" },
  { value: 5, color: "green", title: "Expert", desc: "Drives best practices" },
];

const SelfAssessmentSchema = z.object({
  reflection: z.string().min(10, "Reflection must be at least 10 characters."),
  dimensions: z.array(
    z.object({
      dimension_definition_id: z.string().uuid(),
      rating: z.number().min(1).max(5),
    })
  ),
});

type FormValues = z.infer<typeof SelfAssessmentSchema>;

export default function SelfAssessmentPage() {
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
    formState: { errors },
  } = form;

  const onSubmit = (data: FormValues) => {
    const payload = {
      userId: "550e8400-e29b-41d4-a716-446655440000",
      reflection: data.reflection,
      status: "SUBMITTED",
      dimensions: data.dimensions,
    };
    console.log("SUBMIT PAYLOAD:", payload);
  };

  return (
    <div className="px-5 p-8 space-y-8 ">
      <div className="border rounded-xl overflow-hidden">
        <div className="p-6 space-y-4 border-b bg-muted-foreground/10">
          <h1 className="text-3xl font-bold">Self-Assessment</h1>
        </div>
        <div className="px-5 space-y-6 pt-5">
          {dimensions.map((dim, index) => (
            <Card key={dim.id} className="bg-muted-foreground/10">
              <CardHeader>
                <CardTitle>{dim.dimension_name}</CardTitle>
                <p className="text-muted-foreground">{dim.description}</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="list-disc list-inside text-sm text-muted-foreground bg-white p-2 rounded-md mb-4 border">
                  {dim.criteria.map((c) => (
                    <li key={c.id}>{c.criteria_name}</li>
                  ))}
                </ul>

                <RatingSelector
                  options={RATING_OPTIONS}
                  selected={watch(`dimensions.${index}.rating`)}
                  onSelect={(val) =>
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
        <div className="flex justify-end mt-6 mb-10">
          <Button onClick={handleSubmit(onSubmit)}>
            Submit Professional Assessment
          </Button>

        </div>
        </div>
      </div>
    </div>
  );
}
