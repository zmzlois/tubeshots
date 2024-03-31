import { utapi } from "./uploadthing";



const index = 300
const id = 325644669
async function deleteFiles(id: number) {

    for (let i = 0; i < index; i++) {
        console.log("deleting file", i)
        await utapi.deleteFiles(`vimeo-${id}-${i}`, {
            keyType: "customId",
        });
    }
}
deleteFiles(id)