import Form from "@/components/form";
import { LandingHeader } from "@/components/headers";
export default function Home() {
  return (
    <>
      <LandingHeader />
      <main className="flex h-full justify-center flex-col items-center ">
        <div className="p-10 container mx-auto flex flex-col border-2 gap-10">
          <h1 className="text-3xl font-bold">
            Generate consecutive screenshots from Vimeo
          </h1>

          <Form />
        </div>
      </main>
    </>
  );
}
