"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter, useSearchParams } from "next/navigation";
import { AlertTriangle } from "lucide-react";

export default function UnauthorizedPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const error = searchParams.get("error") || "Unauthorized Access";

  return (
    <div className="container flex items-center justify-center min-h-screen">
      <Card className="w-[400px]">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <AlertTriangle className="h-12 w-12 text-yellow-500" />
          </div>
          <CardTitle>Access Denied</CardTitle>
          <CardDescription>{decodeURIComponent(error)}</CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center">
          <Button
            variant="default"
            onClick={() => router.push("/dashboard")}
          >
            Return to Dashboard
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}