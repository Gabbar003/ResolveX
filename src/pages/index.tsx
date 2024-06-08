import { signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import { TextGenerateEffect } from "./components/ui/text-generate-effect";
import { api } from "~/utils/api";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation"


export default function Home() {
  const [textStatus,setTextStatus]  = useState(true)
  const { data: sessionData } = useSession();
  const tokenRegister = api.token.GithubTokenRegister.useMutation()
  const param = useSearchParams()
    useEffect(()=>{
      setTimeout(()=>{
        setTextStatus(false)
      },3500)
    
    })
  const { data: secretMessage } = api.post.getSecretMessage.useQuery(
    undefined, // no input
    { enabled: sessionData?.user !== undefined }
  );

  const gitcode =  param.get("code")

    useEffect(()=>{
        if(gitcode!== null && gitcode !== undefined){
            console.log("Code is there"+gitcode.toString())
            // gitAccessToken.mutate({code:gitcode.toString()})
            tokenRegister.mutate({gitToken:gitcode.toString()})

        }
        else {
            console.log("No Code")
        }
    },[gitcode])


  return (
    <>
      <Head>
        <title>ResolveX</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className=" flex min-h-screen flex-col items-center justify-center bg-black ">
      {/* <div className="flex flex-col items-center justify-center gap-4">
      <p className="text-center text-2xl text-white">
        {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
        {secretMessage && <span> - {secretMessage}</span>}
      </p>
      <button
        className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
        onClick={sessionData ? () => void signOut() : () => void signIn()}
      >
        {sessionData ? "Sign out" : "Sign in"}
      </button>
        </div> */}
    {textStatus && sessionData  &&

      <TextGenerateEffect words={`Welcome To ResolveX ${sessionData?.user.name}`}/>
    
    }
   {sessionData && <>
   
   </>}
      <button
        className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
        onClick={sessionData ? () => void signOut() : () => void signIn()}
      >
        {sessionData ? "Sign out" : "Sign in"}
      </button>
      </main>
    </>
  );
}



