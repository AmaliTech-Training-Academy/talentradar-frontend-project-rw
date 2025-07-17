import {
  Card,
  CardDescription,
  CardContent,
  CardFooter,
  CardTitle,
  CardHeader,
} from "@/components/ui/card";
import { RegisterForm } from "../components/register-form";

export default function page() {
  return (
    <Card className="w-full max-w-sm backdrop-blur-xl bg-card/20 text-white shadow-none border-white/30">
      <CardHeader className="w-full text-center">
        <CardTitle className="text-2xl ">Create account</CardTitle>
        <CardDescription className=" text-white/50">
          Start your proffessional journey
        </CardDescription>
      </CardHeader>
      <CardContent>
        <RegisterForm />
      </CardContent>
    </Card>
  );
}
