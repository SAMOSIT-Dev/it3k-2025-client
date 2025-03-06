import { TPodiumScoreboard } from "@/shared/types/PodiumScoreboard";

const staticData: Record<
  string,
  { tradition_game_points: number; esport_point: number }
> = {
  'KMUTT': { tradition_game_points: 10, esport_point: 15 },
  'KMITL': { tradition_game_points: 8, esport_point: 12 },
  'KMUTNB': { tradition_game_points: 5, esport_point: 20 },
  'KMUTNB_PR': { tradition_game_points: 5, esport_point: 20 }
}

export const mergePodiumScoreWithStaticData = (apiData: TPodiumScoreboard[]) => {
  return apiData.map((university) => ({
    ...university,
    tradition_game_points: staticData[university.universityName]?.tradition_game_points || 0,
    esport_point: staticData[university.universityName]?.esport_point || 0
  }))
}