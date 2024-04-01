import Form from "@/components/form";
import { DashbaordHeader } from "@/components/headers";
import { Screenshots } from "@/components/screenshots";
import { UserButton } from "@clerk/nextjs";
import { Separator } from "@/components/ui/separator";

export default function DashboardPage() {
  return (
    <>
      <main className="flex h-full  flex-col ">
        {" "}
        <DashbaordHeader />
        <div className="p-10 container mx-auto flex flex-col  gap-10">
          <h1 className="text-3xl font-bold">
            Generate consecutive screenshots from Vimeo
          </h1>

          <Form layout={"horizontal"} />
        </div>
        <Separator />
        <Screenshots />
      </main>
    </>
  );
}
