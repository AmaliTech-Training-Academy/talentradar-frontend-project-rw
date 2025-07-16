export default function LoginPage() {
  return (
    <div className="bg-background flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="w-full max-w-sm shadow-sm rounded-lg p-6 border-1">
        <div className="text-center mb-2">
          <h1 className="text-xl font-bold">Login</h1>
          <p className="text-sm text-muted-foreground">
            Enter your credentials to access your account
          </p>
        </div>
        {/* Login form will go here */}
      </div>
    </div>
  );
}