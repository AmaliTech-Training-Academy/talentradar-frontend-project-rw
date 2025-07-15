"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { dimensions } from "@/lib/dummyData";
import RatingSelector from "@/components/feature-specific/dashboard/RatingSelector";
import { RatingOption } from "@/lib/types";
import { CircleCheck, Save, TrendingUp } from "lucide-react";
import { SelfAssessmentSchema } from "@/lib/schemas/self-assessment";
import { cn } from "@/lib/utils";

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

const getRatingTitle = (rating: number): string => {
  return RATING_OPTIONS.find((option) => option.value === rating)?.title || "";
};

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
        <div className="p-6 space-y-4 border-b bg-muted-foreground/10 flex justify-between items-center">
          <div>
            <h1 className="md:text-3xl text-xl font-bold">
              {" "}
              Professional Self-Assessment
            </h1>
            <p className="text-muted-foreground text-sm">
              Comprehensive evaluation based on industry-standards and
              competency frameworks
            </p>
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
                    {/* dynamic badge */}
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
                <ul className=" list-inside text-sm text-muted-foreground bg-white p-2 rounded-md mb-4 border">
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
              <Save />
              Submit Professional Assessment
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
