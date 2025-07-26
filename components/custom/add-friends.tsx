import React from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { MessageSquare, Search, ArrowBigLeft} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useRouter } from 'next/navigation'

export default function AddFriends() {
  const router = useRouter()

  return (
    <div className="flex h-full flex-col px-4">
      {/* Header */}
      <div className="mt-4">
        <Button size="icon" className="w-8 h-8">
          <ArrowBigLeft className="h-4 w-4" />
        </Button>
        <h2 className="text-lg font-semibold">Add Friends</h2>
        <p className="text-sm text-muted-foreground">Search for friends to add</p>
      </div>
      {/* Search */}
      <div className="relative mt-4">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search friends..."
          className="pl-9"
        />
      </div>
      {/* Friends List */}
      <div className="flex-1 p-4">
        <div className="flex h-full items-center justify-center">
          <div className="text-center">
            <MessageSquare className="mx-auto h-12 w-12 text-muted-foreground" />
            <p className="mt-4 text-lg font-medium">No friends found</p>
            <p className="text-sm text-muted-foreground">Search for friends to add</p>
          </div>
        </div>
      </div>
    </div>
  )
}
