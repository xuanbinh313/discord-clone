import React from 'react'
import ServerSiderbar from '@/components/server/server-siderbar'
import { currentProfile } from '@/lib/current-profile'
import { db } from '@/lib/db'
import { redirectToSignIn } from '@clerk/nextjs'
import { redirect, useParams } from 'next/navigation'

interface ServerLayoutProps {
    children: React.ReactNode
    params: { serverId: string }
}

const ServerLayout = async ({ children, params }: ServerLayoutProps) => {
    const profile = await currentProfile()
    if (!profile) {
        return redirectToSignIn()
    }
    const server = db.server.findUnique({
        where: {
            id: params.serverId,
            members: {
                some: {
                    profileId: profile.id
                }
            }
        }
    })
    if (!server) {
        return redirect("/")
    }
    return (
        <div className='h-full'>
            <div className='hidden md:flex flex-col
            h-full w-60 z-20 fixed inset-y-0'>
                <ServerSiderbar serverId={params.serverId} />
            </div>
            <main className='h-full md:pl-60'>
                {children}
            </main>

        </div>
    )
}

export default ServerLayout