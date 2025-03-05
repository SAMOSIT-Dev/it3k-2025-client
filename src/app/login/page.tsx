"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "./hooks/useAuth";


export default function LoginForm() {
    const { login } = useAuth();
    const router = useRouter();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        const success = await login(username, password);

        if (success) {
            router.push("/"); 
        } else {
            setError("Invalid username or password.");
        }
    };



    return (
        <div className="flex items-center justify-center min-h-screen bg-[#111]">
            <div className="flex flex-col justify-center px-8 md:px-12 lg:px-16 bg-black text-white rounded-lg shadow-lg max-w-md w-full">
                <h1 className="text-4xl font-bold mb-12 text-center">Sign In</h1>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <label htmlFor="username" className="block text-sm">
                            User Name
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-gray-400">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                                    <circle cx="12" cy="7" r="4"></circle>
                                </svg>
                            </div>
                            <input
                                id="username"
                                type="text"
                                placeholder="Enter User Name"
                                className="w-full h-12 pl-10 pr-4 rounded-md bg-transparent border border-gray-700 focus:border-blue-500 focus:outline-none text-white"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="password" className="block text-sm">
                            Password
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-gray-400">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect>
                                    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                                </svg>
                            </div>
                            <input
                                id="password"
                                type="password"
                                placeholder="Enter Password"
                                className="w-full h-12 pl-10 pr-4 rounded-md bg-transparent border border-gray-700 focus:border-blue-500 focus:outline-none text-white"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div className="text-xs text-right">
                        <Link href="/forgot-password" className="text-gray-400 hover:text-white">
                            FORGOT PASSWORD?
                        </Link>
                    </div>

                    <button
                        type="submit"
                        className="w-full h-12 bg-red-600 hover:bg-red-700 text-white rounded-md transition-colors duration-200"
                    >
                        SIGN IN
                    </button>
                    {error && <p style={{ color: "red" }}>{error}</p>}
                </form>
            </div>
        </div>
    );
}
