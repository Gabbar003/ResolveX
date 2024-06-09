import { signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import { TextGenerateEffect } from "./components/ui/text-generate-effect";
import { api } from "~/utils/api";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation"
import Table2 from "./components/ui/Table2.svg"
import Chart3 from "./components/ui/Chart3.svg"
import Image from "next/image";
export default function Home() {
  const [textStatus, setTextStatus] = useState(true)
  const { data: sessionData } = useSession();
  const tokenRegister = api.token.GithubTokenRegister.useMutation()
  const param = useSearchParams()
  useEffect(() => {
    setTimeout(() => {
      setTextStatus(false)
    }, 3500)

  })
  const { data: secretMessage } = api.post.getSecretMessage.useQuery(
    undefined, // no input
    { enabled: sessionData?.user !== undefined }
  );

  const gitcode = param.get("code")

  useEffect(() => {
    if (gitcode !== null && gitcode !== undefined) {
      console.log("Code is there" + gitcode.toString())
      tokenRegister.mutate({ gitToken: gitcode.toString() })

    }
    else {
      console.log("No Code")
    }
  }, [gitcode])


  return (
    <>
      <Head>
        <title>ResolveX</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className=" flex min-h-screen w-[87%] flex-col  bg-black vfe">

        {/* {textStatus && sessionData  &&

      <TextGenerateEffect words={`Welcome To ResolveX ${sessionData?.user.name}`}/>
    
    } */}

        <div className=" w-full h-[10%] bg-[#0B0B0B]">

        </div>
        <div className="w-full h-[88%] px-8 py-2">


          <div className="h-fit w-fit flex flex-col justify-between mt-3">
            <div className="mb-10 text-white font-bold mt-4">
             hey kiran alex - Here's what's happeing with ur store today 
            </div>
          <div className="flex flex-row justify-between space-x-7">
            <div className="bg-white h-24 w-72 rounded-lg p-4 flex flex-col justify-between">
              <div className="w-3/4 h-full justify-between flex flex-col">
              <div className="text-sm">
                <p>RANK</p>
              </div>
              <div className="text-lg font-bold">
                Newbie
              </div>
              </div>
            </div>


            <div className="bg-white h-24 w-72 rounded-lg p-4 flex flex-col justify-between">
              <div className="w-3/4 h-full justify-between flex flex-col">
              <div className="text-sm">
                <p>THIS WEEK CONTRIBUTIONS</p>
              </div>
              <div className="text-lg font-bold">
                0
              </div>
              </div>
            </div>

            <div className="bg-white h-24 w-72 rounded-lg p-4 flex flex-col justify-between">
              <div className="w-3/4 h-full justify-between flex flex-col">
              <div className="text-sm">
                <p>EXPERIENCE</p>
              </div>
              <div className="text-lg font-bold">
                0
              </div>
              </div>
            </div>

            <div className="bg-white h-24 w-72 rounded-lg p-4 flex flex-col justify-between">
              <div className="w-3/4 h-full justify-between flex flex-col">
              <div className="text-sm">
                <p>SWAGS</p>
              </div>
              <div className="text-lg font-bold">
                0
              </div>
              </div>
            </div>
          </div>
          </div>

          <div className="flex flex-row justify-between mt-9">

            <div className="h-fit w-80%  bg-white">
              <Image src={Table2} alt="table" />
            </div>


            <div className="px-14">
            <Image src={Chart3} alt="table" />
            </div>

          </div>




        </div>





      </main>
    </>
  );
}



