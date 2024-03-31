import { createRouteHandler } from "uploadthing/next";

import { ourFileRouter } from "./core";
import { env } from "@/lib/env";

// Export routes for Next App Router
export const { GET, POST } = createRouteHandler({
    router: ourFileRouter,
    config: {
        uploadthingId: env.ut_id,
        uploadthingSecret: env.ut_secret,
    }

    // Apply an (optional) custom config:
    // config: { ... },
});