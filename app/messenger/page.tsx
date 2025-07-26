'use client';
import React, { useState } from 'react'

// Type definition for user data
import { UserData, FilteredUser } from '@/components/interface/interface'

import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInput,
  SidebarInset
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, Search, MessageSquare, Users, UserPlus, User } from "lucide-react"
import AddFriends from "@/components/custom/add-friends"

export default function MessengerPage() {
  const [addFriends, setaddFriends] = useState(false)
  const [users, setUsers] = useState([])

  // Fetch users (For add friends feature to be stored in )
  const fetchUsers = async () => {
    const users_data = await fetch('api/fetch-users',{
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    const data = await users_data.json()
    // store the users data in memory (only id, name, email)
    if (data.success) {
      const filteredUsers = data.users.map((user: UserData): FilteredUser => ({
        id: user.id,
        name: user.name,
        email: user.email
      }))
      setUsers(filteredUsers)
    }
  }

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full">
        {/* Sidebar */}
        <Sidebar className="border-r">
          <SidebarHeader className="border-b p-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Messages</h2>
              <Button size="sm" variant="ghost" className="gap-2" onClick={() => setaddFriends(true)}>
                <Plus className="h-4 w-4" />
                Add Friends
              </Button>
            </div>
          </SidebarHeader>

          <SidebarContent className="p-4">
            {/* Action Buttons */}
            <SidebarGroup>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton className="w-full justify-start">
                      <MessageSquare className="mr-2 h-4 w-4" />
                      New Message
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton className="w-full justify-start">
                      <UserPlus className="mr-2 h-4 w-4" />
                      Create Group Chat
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton className="w-full justify-start">
                      <Users className="mr-2 h-4 w-4" />
                      Friend Requests
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            {/* Search */}
            <div className="relative mt-4">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <SidebarInput
                placeholder="Search conversations..."
                className="pl-9"
              />
            </div>

            {/* Conversations List */}
            <SidebarGroup className="mt-4">
              <SidebarGroupContent>
                {/*  <SidebarMenu>
                  This will be populated with actual conversations 
                  <SidebarMenuItem>
                    <SidebarMenuButton className="w-full justify-start">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full bg-sidebar-accent flex items-center justify-center">
                          <span className="text-sm font-medium">LA</span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-sm font-medium">Leslie Alexander</span>
                          <span className="text-xs text-muted-foreground">Hi, Brandon! I am looking forward...</span>
                        </div>
                      </div>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton className="w-full justify-start">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full bg-sidebar-accent flex items-center justify-center">
                          <span className="text-sm font-medium">SN</span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-sm font-medium">Savannah Nguyen</span>
                          <span className="text-xs text-muted-foreground">Frigilla leo sem cursus ut pulvinar...</span>
                        </div>
                      </div>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton className="w-full justify-start">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full bg-sidebar-accent flex items-center justify-center">
                          <span className="text-sm font-medium">KW</span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-sm font-medium">Kristin Watson</span>
                          <span className="text-xs text-muted-foreground">Could you send me a link to join...</span>
                        </div>
                      </div>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>*/}
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>

          {/* Profile Section at Bottom */}
          <SidebarFooter className="border-t bg-[#B8CFCE]">
            <SidebarGroup>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton className="w-full justify-start hover:bg-inherit active:bg-inherit">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full bg-sidebar-accent flex items-center justify-center">
                          <User className="h-4 w-4" />
                        </div>
                        <div className="flex flex-col">
                          <span className="text-sm font-medium">John Doe</span>
                          <span className="text-xs text-muted-foreground">Online</span>
                        </div>
                      </div>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarFooter>
        </Sidebar>

        {/* Main Chat Area */}
        <SidebarInset className="flex-1">
          <div className="flex h-full flex-col">
            {addFriends ? <AddFriends /> : (
            <>
              {/* Header */ }
              <div className="border-b p-4">
                <h3 className="text-lg font-semibold">Select a conversation</h3>
                <p className="text-sm text-muted-foreground">Choose a conversation to start messaging</p>
              </div>

              {/* Chat Content */}
              <div className="flex-1 p-4">
                <div className="flex h-full items-center justify-center">
                  <div className="text-center">
                    <MessageSquare className="mx-auto h-12 w-12 text-muted-foreground" />
                    <p className="mt-4 text-lg font-medium">No conversation selected</p>
                    <p className="text-sm text-muted-foreground">Click on a conversation to start messaging</p>
                  </div>
                </div>
              </div>
           </>
            )}
      </div>
    </SidebarInset>
      </div >
    </SidebarProvider >
  )
}
