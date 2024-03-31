import Form from "@/components/form";
export default function Home() {
  return (
    <main className="flex h-screen content-center flex-col justify-center items-center p-24">
      <div className="p-10 container mx-auto flex flex-col border-2 gap-10">
        <h1 className="text-3xl font-bold">
          Generate consecutive screenshots from Vimeo
        </h1>

        <Form />
      </div>
    </main>
  );
}
