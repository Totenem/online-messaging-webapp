'use client';

import React, { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, CardAction } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { createClient } from '@/utils/supabase/client'
import { useRouter } from 'next/navigation'

export default function SignInPage() {
    const supabase = createClient()
    const router = useRouter()

    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')
    const [loading, setloading] = useState(false)
    const [error, seterror] = useState('')

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setloading(true)
        seterror('')

        // Sign Process Here
        const {data: signInData, error: signInError} = await supabase.auth.signInWithPassword({
            email,
            password
        })

        if (signInError) {
            seterror(signInError.message)
        } else {
            router.push('/messenger')
        }
    }
  return (
    <div className='flex flex-col gap-2 items-center justify-center h-screen'>
            <Card className="w-full max-w-sm">
                <CardHeader>
                    <CardTitle className='text-2xl font-bold text-center'>Sign In</CardTitle>
                    <CardDescription className='text-center'>
                        Enter your email below to login to your account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form>
                        <div className="flex flex-col gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="m@example.com"
                                    value={email}
                                    onChange={(e) => setemail(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="grid gap-2">
                                <div className="flex items-center">
                                    <Label htmlFor="password">Password</Label>
                                    <a
                                        href="#"
                                        className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                                    >
                                        Forgot your password?
                                    </a>
                                </div>
                                <Input 
                                    id="password" 
                                    type="password"
                                    value={password}
                                    onChange={(e) => setpassword(e.target.value)}
                                    required 
                                />
                            </div>
                        </div>
                    </form>
                </CardContent>
                <CardFooter className="flex-col gap-2">

                    <Button 
                    type="submit" 
                    className="w-full"
                    onClick={handleSubmit}
                    disabled={loading || !email || !password}>
                        {loading ? 'Signing In...':'Sign In'}
                    </Button>

                    {error && <p className="mt-4 text-center text-sm text-red-500">{error}</p>}

                    <Label className='text-center text-sm hover:underline'>
                        <a href='/signup'>Don't Have an a Account? Sign Up</a>
                    </Label>

                </CardFooter>
            </Card>
        </div>
  )
}
