import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const Rankrouter = createTRPCRouter({
        addExp : protectedProcedure
        .mutation(async({ctx})=>{

            const currentpoints = await  ctx.db.user.findUnique({
                where : {
                    id  : ctx.session.user.id
                }
            })

           const  points = currentpoints.ExpPoints
            return ctx.db.user.update({
                where : {
                    id : ctx.session.user.id
                },
                data : {
                    ExpPoints : points + 80
                }
            })
        })
})