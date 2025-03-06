"use client";

import { useEffect, useState } from "react";
import BasketBallCard from "@/app/scoreboards/basketball/components/BastketballCard";
import Link from "next/link";
import { getScoreboard } from "./actions/scoreboard.action";
import { BasketballMatch } from "@/app/scoreboards/basketball/interfaces/basketball";

const Page = () => {
    const [scoreboard, setScoreboard] = useState<BasketballMatch[]>([]);

    useEffect(() => {
        const fetchScoreboard = async () => {
            try {
               const data = await getScoreboard()

                setScoreboard(data as BasketballMatch[]);
            } catch (error) {
                console.error("Error fetching scoreboard:", error);
            }
        };

        fetchScoreboard();
    }, []);


    return (
        <div className="mt-40">
      <h1 className="text-3xl font-bold text-center mb-8 text-blue-600">
        Basketball Scoreboard
      </h1>
            <div className='w-full h-full'>
                <div className='flex flex-col max-w-7xl mx-auto'>
                    {scoreboard?.map((match, index) => (
                        <Link href={`/admin/basketball/${match.id}`} key={match.id}>
                            <div className="mb-4 ml-7">
                            <BasketBallCard data={match} key={index} />
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Page;
