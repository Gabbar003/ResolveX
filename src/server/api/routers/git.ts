import { TRPCError } from "@trpc/server";
import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const Issuerouter = createTRPCRouter({
   createIssueCount : protectedProcedure
   .input(z.object({
        issueCount : z.number().optional()
   }))
   .mutation (async({ctx,input})=> {
        await ctx.db.user.update({
            where : {
              id : ctx.session.user.id
            },
            data : {
                issueCount : input.issueCount
            }
        }).catch((err)=> {
            throw new TRPCError({
                code : "FORBIDDEN"
            })
        })
   }),


   getIssueCount: protectedProcedure
   .query (async({ctx,input})=> {
        const user = await ctx.db.user.findUnique({
            where  :{id :  ctx.session.user.id}
        })

        if(user?.issueCount) {
            return  user.issueCount;
        }
        else {
            throw new TRPCError({
                code:"NOT_FOUND"
            });
        }
   }),

   createIssue : protectedProcedure
   .input(z.object({
    state : z.string(),
    title : z.string(),
    issue_number : z.number(),
    created_at : z.string(),
    owner : z.string(),
    url : z.string()
   }))
   .mutation(async({ctx,input})=> {
    
      await ctx.db.issue.create({
        data : {
            userId : ctx.session.user.id,
            state : input.state,
            title : input.title,
            issue_number : input.issue_number,
            created_at : input.created_at,
            owner : input.owner,
            url : input.url
        }
     })
   }),


   updateIssue : protectedProcedure
   .input(z.object({
    id : z.string(),
    state: z.string(),
   }))
   .mutation(async ({ctx,input})=> {
        await  ctx.db.issue.update({
               where : {
                id : input.id
               },
              data : {
                state : input.state
              }
         })
   }),

   getIssues : protectedProcedure
   .query(async({ctx})=> {
         const issues = await ctx.db.issue.findMany({
              where : {
                userId : ctx.session.user.id
              }
         })
         return issues;
   })


})