import { postRouter } from "~/server/api/routers/post";
import { createCallerFactory, createTRPCRouter } from "~/server/api/trpc";
import { Tokenrouter } from "./routers/token";
import { Issuerouter } from "./routers/git";
import { Rankrouter } from "./routers/rank";
import { profileRouter } from "./routers/profile";
/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  post: postRouter,
  token :  Tokenrouter,
  issue : Issuerouter,
  profile : profileRouter,
  rank : Rankrouter
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
