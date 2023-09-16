import { currentProfile } from '@/lib/current-profile'
import { redirect } from 'next/navigation'
import React from 'react'

interface ServerSiderbarProps {
    serverId: string
}

const ServerSiderbar = async ({ serverId }: ServerSiderbarProps) => {
    const profile = await currentProfile()
    if (!profile) {
        return redirect("/")
    }
    return (
        <div>ServerSiderbar</div>
    )
}

export default ServerSiderbar