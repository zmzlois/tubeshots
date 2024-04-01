"use client";
import { FormEvent } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { auth, useAuth } from "@clerk/nextjs";
import { cn } from "@/lib/utils";

export default function Form({
  layout,
}: {
  layout?: "horizontal" | "vertical";
}) {
  const router = useRouter();
  const { userId, sessionId } = useAuth();

  function validate() {
    const input = document.getElementById("url") as HTMLInputElement;
    const validityState = input.validity;

    if (validityState.patternMismatch) {
      input.setCustomValidity("Please enter a valid vimeo URL");
    } else if (validityState.valueMissing) {
      input.setCustomValidity("You gotta fill this out, yo!");
    }
    input.reportValidity();
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (userId && sessionId) {
      const formData = new FormData(event.target as HTMLFormElement);
      const url = formData.get("url") as string;
      console.log("URL", url);
      const response = await fetch(`/api/image?url=${url}`);
      const data = await response.json();

      if (response.ok) {
        console.log("Data", data);
        router.push(`/processing/${data.id}`);
      } else {
        toast("An error occurred. Please try again.");
      }
    } else {
      toast.info("You must be signed in to create screenshots.");
    }
    // console.log("Data", data);
  }

  return (
    <form
      className={cn("flex gap-10", { "flex-col": layout === "vertical" })}
      onSubmit={onSubmit}
    >
      <Input
        placeholder="Paste vimeo URL here"
        name="url"
        id="url"
        pattern="(https?|ftp):\/\/[^\s/$.?#].[^\s]*"
      />
      <Button type="submit">
        <p className="text-zinc-100"> Create screen shots</p>
      </Button>
    </form>
  );
}
