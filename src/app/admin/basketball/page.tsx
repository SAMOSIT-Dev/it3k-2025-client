"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getScoreboard } from "./actions/scoreboard.action";
import { IBasketball } from "@/app/admin/basketball/types/basketball";

const Page = () => {
    const [scoreboard, setScoreboard] = useState<IBasketball[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchScoreboard = async () => {
            try {
                const response = await getScoreboard();

                if (response?.success && Array.isArray(response.data)) {
                    setScoreboard(response.data as IBasketball[]);
                } else {
                    throw new Error("Invalid API response");
                }
            } catch (error) {
                setError("Failed to fetch scoreboard");
                console.error("Error fetching scoreboard:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchScoreboard();
    }, []);

    return (
        <div className="mt-20 px-4 md:px-8 lg:px-16">
            <h1 className="text-4xl font-bold text-center mb-8 text-blue-600">
                Basketball Scoreboard
            </h1>

            {loading && <p className="text-center text-gray-500">Loading...</p>}
            {error && <p className="text-center text-red-500">{error}</p>}

            {!loading && !error && (
                <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {scoreboard.length > 0 ? (
                        scoreboard.map((match) => (
                            <Link href={`/admin/basketball/${match.id}`} key={match.id}>
                            <div
                                key={match.id}
                                className="border border-gray-200 rounded-lg p-4 shadow-lg bg-white hover:shadow-xl transition"
                            >
                                <h2 className="text-lg font-semibold text-gray-700">
                                    Match ID: {match.id}
                                </h2>
                                <div className="flex justify-between items-center mt-3">
                                    <div className="flex items-center">
                                        <div
                                            className="w-8 h-8 rounded-full"
                                            style={{ backgroundColor: match.team_A.color_code }}
                                        />
                                        <p className="ml-2 font-medium">{match.team_A.uniName}</p>
                                    </div>
                                    <p className="font-bold text-xl">{match.team_A.totalScore}</p>
                                </div>
                                <div className="flex justify-between items-center mt-3">
                                    <div className="flex items-center">
                                        <div
                                            className="w-8 h-8 rounded-full"
                                            style={{ backgroundColor: match.team_B.color_code }}
                                        />
                                        <p className="ml-2 font-medium">{match.team_B.uniName}</p>
                                    </div>
                                    <p className="font-bold text-xl">{match.team_B.totalScore}</p>
                                </div>
                                <p className="text-sm text-gray-500 mt-2">Status: {match.status}</p>
                                <p className="text-sm text-gray-500">Start Time: {new Date(match.timeStart).toLocaleString()}</p>
                            </div>
                            </Link>
                        ))
                    ) : (
                        <p className="text-center text-gray-600 col-span-full">
                            No matches available
                        </p>
                    )}
                </div>
            )}
        </div>
    );
};

export default Page;
