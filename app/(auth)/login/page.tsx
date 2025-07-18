import { LoginForm } from "@/app/(auth)/components/login-form";
import {
  Card,
  CardDescription,
  CardContent,
  CardTitle,
  CardHeader,
} from "@/components/ui/card";
import AuthAction from "@/app/dashboard/components/auth-actions";

const LoginPage = () => {
  return (
    <Card className="w-full max-w-sm backdrop-blur-xl bg-card/20 text-white shadow-none border-white/30">
      <CardHeader>
        <CardTitle className="text-2xl text-center">Sign In</CardTitle>
        <CardDescription className="text-white/50 text-center">
          Access your talent dashboard
        </CardDescription>
      </CardHeader>
      <CardContent>
        <LoginForm />
        <div className="w-full flex gap-1 items-center justify-center py-2 mt-2">
          <span className="w-full block h-[2px] bg-white flex-1 border" />
          <p className="text-sm text-white">Try demo acccount</p>
          <span className=" w-full block h-[1px] bg-white flex-1 border" />
        </div>
        <AuthAction />
      </CardContent>
    </Card>
  );
};

export default LoginPage;
