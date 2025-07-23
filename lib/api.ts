import { IMatchHistory } from "@/app";

// Keep the fetchMatchHistory function for client-side usage if needed
export async function fetchMatchHistory(
    playerTag: string = 'BBL%20Gweep%23QUTI',
    platform: string = 'pc',
    season: string = 'ac12e9b3-47e6-9599-8fa1-0bb473e5efc7',
    type: string = 'competitive'
  ): Promise<IMatchHistory[]> {
    const params = new URLSearchParams({
      playerTag,
      platform,
      season,
      type,
    });
  
    const response = await fetch(`/api/history?${params.toString()}`);
  
    if (!response.ok) {
      throw new Error(`Failed to fetch match history: ${response.status} ${response.statusText}`);
    }
  
    return await response.json();
  }
  