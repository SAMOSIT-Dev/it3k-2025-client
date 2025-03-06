'use server'

import { IBasketball } from "../types/basketball";

const API_URL = 'https://it3k.sit.kmutt.ac.th';

export const getScoreboard = async () => {
    try {
        const res = await fetch(`${API_URL}/api/basketball/score-board`);

        if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
        }

        const data = await res.json() as IBasketball[] 
        return data || []
    } catch (error) {
        console.error("Error fetching scoreboard:", error);
        return null;
    }
}


export const getBasketballMatchById = async (id: number) => {
    try {
        const data = await getScoreboard()
        if (!data) return null

        return data.find((game) => game.id === id)
    } catch (error) {
        console.error("Error updating score:", error);
        return null;
    }
}