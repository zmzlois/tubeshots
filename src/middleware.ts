import { authMiddleware } from "@clerk/nextjs";

const publicRoutes = [
    "/",
    "/sign-in",
    "/sign-up",
    "/forgot-password",
    "/reset-password",
    "/verify-email",


]
export default authMiddleware({
    publicRoutes: publicRoutes,
});

export const config = {
    matcher: ["/((?!.+.[w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};