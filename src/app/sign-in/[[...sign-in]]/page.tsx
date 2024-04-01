import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="flex flex-col items-center content-center">
      <SignIn afterSignInUrl={"/dashboard"} />
    </div>
  );
}
