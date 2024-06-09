import { z } from "zod";
import axios from "axios";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { AxiosResponse } from "axios";
import { TRPCError } from "@trpc/server";

interface res extends AxiosResponse {
    
        login : string
    

}

export const profileRouter = createTRPCRouter({
    getGitusername:protectedProcedure
    .query(async({ctx})=>{
       await axios.get<res>(`https://api.github.com/user`, {
            headers: {
                "Accept": "application/vnd.github+json",
                "X-GitHub-Api-Version": "2022-11-28",
                "Authorization": `token ${ctx.account?.access_token}`
            }
        }).then((res)=>{
             return res.data
        }).catch((err)=>{
            throw new TRPCError({code:"UNAUTHORIZED"})
            console.log(err)
        })
        
    })
})