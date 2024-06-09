import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { api } from '~/utils/api';
import { AxiosResponse } from 'axios';
import Image from 'next/image';
import  will from  "../components/ui/will.png"
import { extractRepoOwnerAndIssue } from '../utils/converter';
enum state {
    open = "open",
    closed = "closed"
}

interface res extends AxiosResponse {

    login: string


}

interface res1   extends AxiosResponse {

   user : {
    login:string
   }
   body : string


}

interface IssueResponse extends AxiosResponse {
    total_count: number;
    items: [
        {
            state: state;
            title: string;
            html_url: string;
            number: number;
            created_at: string;
            user: {
                login: string;
            }
        }
    ];
}

const Index = () => {
    const { data: tokenData } = api.token.getGithubToken.useQuery();
    const [data, setData] = useState("");
    const createCount = api.issue.createIssueCount.useMutation();
    const createIssues = api.issue.createIssue.useMutation()
    const getIssues = api.issue.getIssues.useQuery()
    const getGithubToken = api.token.getGithubToken.useQuery()
    const gitusername = api.profile.getGitusername.useQuery()
    const addExp = api.rank.addExp.useMutation({
        onSuccess:(d)=>{
            console.log(d)
        }
    })
    const issues = useQuery({
        queryKey: ['issues'],
        queryFn: async () => {
            if (!tokenData?.token) {
                throw new Error("No GitHub token found");
            }

            const response = await axios.get<IssueResponse>(
                "https://api.github.com/search/issues?q=assignee:kiran-alex+type:issue&sort=asc",
                {
                    headers: {
                        "Accept": "application/vnd.github+json",
                        "X-GitHub-Api-Version": "2022-11-28",
                        "Authorization": `Bearer ${tokenData.token}`
                    }
                }
            );
            return response.data;
        },
        enabled: !!tokenData?.token  // Only run the query if the token exists
    });

    const getSpecificIssue = async (owner: string | undefined, repo: string | undefined, issueNo: string | undefined) => {
        await axios.get(`https://api.github.com/repos/${owner}/${repo}/issues/${issueNo}`, {
            headers: {
                "Accept": "application/vnd.github+json",
                "X-GitHub-Api-Version": "2022-11-28",
                "Authorization": `Bearer ${tokenData?.token}`
            }
        }).then((res) => {
            return res
        }).catch((err) => {
            console.log(err)
        })
    }


    interface dresponse extends AxiosResponse {
        data: {
            assignee: { login: string }
        }

    }

    if (gitusername.isFetched) {
        console.log(gitusername.data)
    }
 

    const runVerification = async () => {
        if (getIssues.data !== null && getIssues.data !== undefined && getIssues.isFetched) {
            for (const item of getIssues.data) {
                const repo_url = extractRepoOwnerAndIssue(item.url);
                if (repo_url !== null) {
                    try {
                        const response = await axios.get<dresponse>(`https://api.github.com/repos/${repo_url.owner}/${repo_url.repo}/issues/${repo_url.issueNumber}/events`, {
                            headers: {
                                "Accept": "application/vnd.github+json",
                                "X-GitHub-Api-Version": "2022-11-28",
                                "Authorization": `Bearer ${tokenData?.token}`
                            }
                        });
                        if (response.data !== undefined) {  

                            if (response.data[0].assignee.login) {
                                try {
                                 const data =    await axios.get<res>(`https://api.github.com/user`, {
                                        headers: {
                                            "Accept": "application/vnd.github+json",
                                            "X-GitHub-Api-Version": "2022-11-28",
                                            "Authorization": `token ${getGithubToken.data?.token}`
                                        }
                                    })

                                    if(data.status==200) {
                                       if( data.data.login === response.data[0].assignee.login ) {
                                             
                                        try {
                                            const data1 =    await axios.get<res1>(`https://api.github.com/repos/${repo_url.owner}/${repo_url.repo}/issues/comments`, {
                                                headers: {
                                                    "Accept": "application/vnd.github+json",
                                                    "X-GitHub-Api-Version": "2022-11-28",
                                                    "Authorization": `token ${getGithubToken.data?.token}`
                                                }
                                            })

                                            if(data1.status==200) {
                                                for (const item of data1.data) {
                                                    if(item.user.login.includes(data.data.login)) {
                                                       console.log("User Found")
                                                        addExp.mutate()
                                                    }
                                                }

                                                console.log(data1.data)
                                            }
                                        }
                                        catch(err) {
                                            console.log(err)
                                        }

                                       }
                                    }
                                }
                                catch (err) {
                                    console.error(err)
                                }
                            }



                        }
                    } catch (err) {
                        console.error(err);
                    }
                }
            }
        }
    }


    const getIssueCount = api.issue.getIssueCount.useQuery();


    useEffect(() => {
        if (getIssueCount.isSuccess && getIssueCount.data == 0 || getIssueCount.data == null && issues.isSuccess && issues.data.total_count > 0 && issues.data !== undefined) {
            createCount.mutate({ issueCount: issues.data?.total_count });
            console.log("Count Created")

        }
        else if (issues.data !== undefined && getIssueCount.isSuccess && getIssueCount.data == issues.data.total_count && issues.isSuccess) {
            setData("beginner")
        }
        else if (getIssueCount.data !== undefined && issues.isSuccess && issues.data.total_count > getIssueCount.data && getIssueCount.data !== null) {
            const data = issues.data.items.splice(0, issues.data.items.length - getIssueCount.data)

            data.map((item) => {

                createIssues.mutate({
                    state: item.state,
                    title: item.title,
                    issue_number: item.number,
                    created_at: item.created_at,
                    owner: item.user.login,
                    url: item.html_url
                })

            })

        }
        else if (getIssues.data !== null && getIssues.data !== undefined && getIssues.isFetched) {
            runVerification().catch(() => {
                console.log("Error")

            })
        }

    }, [issues.data, getIssueCount.status]);

    if (issues.isError) {
        console.error("Error fetching issues:", issues.error);
    }

    return (
        <>
           <div className='w-[87%] h-full bg-slate-950 flex flex-col space-y-16 justify-center items-center'>
                <Image src={will} alt='willsmith'/>
                <p className='text-white  '>You don't have any open issues right now in ResolveX</p>
           </div>
        </>
    );
}

export default Index;
