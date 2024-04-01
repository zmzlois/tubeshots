import { Button } from "./ui/button";
import { useAuth, auth } from "@clerk/nextjs";
import { UserButton } from "@clerk/nextjs";

export const LandingHeader = () => {
  const { userId, sessionId } = auth();

  if (!sessionId && !userId) {
    return (
      <header className="flex justify-end items-center gap-6 text-white">
        <a href="/sign-in">
          <Button>Sign in</Button>
        </a>
        <a href="/sign-up">
          <Button variant={"secondary"}>Sign up</Button>
        </a>
      </header>
    );
  } else {
    return (
      <header className="flex justify-end items-center gap-6  text-white">
        <a href="/dashboard">
          <Button>Dashboard</Button>
        </a>
      </header>
    );
  }
};

export const DashbaordHeader = () => {
  return (
    <header className="flex justify-end items-center gap-6 text-white">
      <UserButton afterSignOutUrl="/" />
    </header>
  );
};
