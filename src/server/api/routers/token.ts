import { TRPCError } from "@trpc/server";
import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const Tokenrouter = createTRPCRouter({
    GithubTokenRegister: protectedProcedure
    .input(z.object({
        gitToken : z.string()
    }))
    .mutation(async ({ ctx, input }) => {

        const userexists = await ctx.db.user.findUnique({
            where: {
                id : ctx.session?.user.id
            }
        })

        if (!userexists) {

            await ctx.db.user.create({
                data: {
                     id : ctx.session?.user.id,
                    name: ctx.session?.user.name,
                     gitAccessToken :  ctx.account?.access_token,
                    email : ctx.session?.user.email,
                    image : ctx.session?.user.image,
                }   
            })
        }
        else {
            throw new TRPCError({
                code:"BAD_REQUEST",message:"User Already Exists"
            })
        }
    }),


    getGithubToken: protectedProcedure
    .query(async({ctx})=> {
        const user = await ctx.db.account.findUnique({
            where  : {
                id: ctx.session?.user.id
            }
        })
        if(user){
            return    {
                token :  user.access_token
            }
        }
        else {
            throw new TRPCError({
                code:"BAD_REQUEST",message:"User Not Found"
            })
        }
    })
})