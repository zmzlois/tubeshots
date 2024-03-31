

import { env } from "@/lib/env";
import { createUploadthing, type FileRouter, UTApi, createRouteHandler } from "uploadthing/server";

const f = createUploadthing();


export const uploadRouter = {
    imageUploader: f({
        image: {
            maxFileSize: "4MB",
            maxFileCount: 4,
        },
    }).onUploadComplete((data) => {
        console.log("upload completed", data);
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof uploadRouter;


export const { GET, POST } = createRouteHandler({
    router: uploadRouter,
    config: {
        uploadthingId: env.ut_id,
        uploadthingSecret: env.ut_secret,
    },
});




export const utapi = new UTApi({
    apiKey: env.ut_secret,
});


