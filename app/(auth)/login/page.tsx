import { LoginForm } from "@/app/(auth)/components/login-form";
import {
  Card,
  CardDescription,
  CardContent,
  CardTitle,
  CardHeader,
} from "@/components/ui/card";

const LoginPage = () => {
  return (
    <Card className="w-full max-w-sm backdrop-blur-xl bg-card/20 text-white shadow-none border-white/30">
      <CardHeader>
        <CardTitle className="text-2xl ">Login to your account</CardTitle>
        <CardDescription className="text-inherit">
          Enter your credentials below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <LoginForm />
      </CardContent>
    </Card>
  );
};

export default LoginPage;
