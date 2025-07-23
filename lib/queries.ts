import { fetchMatchHistory } from '@/lib/api';
import { useQuery } from '@tanstack/react-query';

export function useMatchHistory(
  playerTag?: string,
  platform?: string,
  season?: string,
  type?: string
) {
  return useQuery({
    queryKey: ['matchHistory', playerTag, platform, season, type],
    queryFn: () => fetchMatchHistory(playerTag, platform, season, type),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
} 