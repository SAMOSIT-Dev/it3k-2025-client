"use client";

import { useEffect, useState } from "react";
import BasketBallCard from "@/app/scoreboards/basketball/components/BastketballCard";
import Link from "next/link";

const Page = () => {

    const API_URL = 'https://it3k.sit.kmutt.ac.th';
    const [scoreboard, setScoreboard] = useState([]);

    useEffect(() => {
        const fetchScoreboard = async () => {
            try {
                console.log("Fetching data from:", `${API_URL}/api/basketball/score-board`);
                const res = await fetch(`${API_URL}/api/basketball/score-board`);

                if (!res.ok) {
                    throw new Error(`HTTP error! Status: ${res.status}`);
                }

                const data = await res.json();
                console.log("Response:", data);
                setScoreboard(data);
            } catch (error) {
                console.error("Error fetching scoreboard:", error);
            }
        };

        fetchScoreboard();
    }, []);


    return (
        <div className="mt-40">
            <h1>Basketball Scoreboard</h1>
            <div className='w-full h-full'>
                <div className='max-w-7xl mx-auto '>
                    {scoreboard?.map((match, index) => (
                        <Link href={`/admin/basketball/${match.id}`} key={match.id}>
                            <BasketBallCard data={match} key={index} />
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Page;
