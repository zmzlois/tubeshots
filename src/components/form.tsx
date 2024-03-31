"use client"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
export default function Form() {
  return (
    <form className="flex flex-col gap-10">
      <Input placeholder="Paste youtube URL here" />
      <Button><p className="text-zinc-100"> Create screen shots</p></Button>
    </form>


  )
}