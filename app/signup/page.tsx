'use client';

import React, { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, CardAction } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { createClient } from '@/utils/supabase/client'
import { useRouter } from 'next/navigation'

export default function SignUpPage() {
    const supabase = createClient()
     const router = useRouter()

    const [name, setname] = useState('')
    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')
    const [confirmPassword, setconfirmPassword] = useState('')
    const [loading, setloading] = useState(false)
    const [alertMessage, setalertMessage] = useState('')
    const [response, setresponse] = useState(false)
    const [terms, setterms] = useState(false)


    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        setloading(true)
        setalertMessage('')
        // See if password and confirm password match
        if (password !== confirmPassword) {
            setresponse(false)
            setalertMessage('Passwords do not match')
            setloading(false)
            return
        }

        // Sign up process here
        const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
            email,
            password
        })

        if (signUpError) {
            setalertMessage(signUpError.message)
        } else {
            // Sign up user insertion to the users table
            const response = await fetch('/api/register-user', {
                method: 'POST',
                body: JSON.stringify({
                    uuid: signUpData.user?.id,
                    name: name,
                    email: email,
                }),
                headers:{
                    'Content-Type': 'application/json'
                }
            })

            const data = await response.json()

            if (!response.ok || !data.success) {
                setresponse(false)
                setalertMessage(`Sign up succeeded, but failed to save profile: ${data.error}`);
            } else {
                setresponse(true)
                setalertMessage("Sign up successful! Check your email to confirm.");
                // redirect o login page
                router.push('/signin')
            }
        }

        setloading(false)
    }
    return (
        <div className='flex flex-col gap-2 items-center justify-center h-screen'>
            <Card className="w-full max-w-sm">
                <CardHeader>
                    <CardTitle className='text-2xl font-bold text-center'>Sign Up</CardTitle>
                    <CardDescription className='text-center'>
                        Create an account to get started
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSignup}>
                        <div className="flex flex-col gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="name">Name</Label>
                                <Input
                                    id="name"
                                    type="text"
                                    placeholder="John Doe"
                                    value={name}
                                    onChange={(e) => setname(e.target.value)}
                                    required
                                />
                            </div>
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
                                </div>
                                <Input
                                    id="password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setpassword(e.target.value)}
                                    required />
                            </div>
                            <div className="grid gap-2">
                                <div className="flex items-center">
                                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                                </div>
                                <Input
                                    id="confirmPassword"
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => setconfirmPassword(e.target.value)}
                                    required />
                            </div>
                            <div>
                                <CardAction className="flex items-center justify-between">
                                    <Label htmlFor="terms" className="flex items-center gap-2">
                                        <input
                                            id="terms"
                                            type="checkbox"
                                            checked={terms}
                                            onChange={(e) => setterms(e.target.checked)}
                                            required
                                        />
                                        I agree to the Terms of Service and Privacy Policy
                                    </Label>
                                </CardAction>
                            </div>
                        </div>
                        <CardFooter className="flex-col gap-2 mt-3">
                            <Button
                                type="submit"
                                className="w-full"
                                disabled={loading || !name || !email || !password || !confirmPassword || !terms}
                            >
                                {loading ? 'Signing Up...' : 'Sign Up'}
                            </Button>
                            {alertMessage && <p className={`mt-4 text-center text-sm ${response ? `text-green-500`: `text-red-500`}`}>{alertMessage}</p>}
                            <Label className='text-center text-sm hover:underline'>
                                <a href='/signin'>Already Have an Account?</a> 
                            </Label>
                        </CardFooter>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
