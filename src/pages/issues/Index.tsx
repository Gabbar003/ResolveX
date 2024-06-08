import React from 'react'
import { useQuery } from '@tanstack/react-query'
import axios from  "axios"
import { api } from '~/utils/api'
import { useState } from 'react'
import { AxiosResponse } from 'axios'

interface IssueResponse extends AxiosResponse {
    data : {
        
    }
}

const Index = () => {
    const token = api.token.getGithubToken.useQuery()
    const [data,setData]= useState()
    const issues = useQuery({
        queryKey: ['issues'],
        queryFn : async()=> {
         const response =  await  axios.get("https://api.github.com/issues",{
            headers : {
               " Accept " :  "application/vnd.github+json",
               " X-GitHub-Api-Version ":"2022-11-28",
               "Authorization" : `bearer ${token.data?.token}`
            }
           })

           return response
        }
    })

    if(issues.isSuccess) {
        setData(issues.data)
    }


  return (
  <>
  
  </>
  )
}

export default Index