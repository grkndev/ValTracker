import MatchHistory from '@/components/MatchHistory'
import TabList, { ITabListData } from '@/components/TabList'
import Separator from '@/components/ui/Separator'
import { useMatchHistory } from '@/lib/queries'
import React from 'react'
import { ActivityIndicator, Image, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function Home() {
    const [currentTab, setCurrentTab] = React.useState<ITabListData>("Unrated")
    const { data: matchHistory, isLoading, error } = useMatchHistory()
    console.log(matchHistory)

    return (
        <SafeAreaView className='flex-1 px-8 gap-4'>
            <View className='flex-row items-center justify-between'>
                <View className='flex-col gap-2'>
                    <Text className='text-white text-2xl font-bold'>Today Score</Text>
                    <View className='flex-row items-center gap-4'>
                        <Text className='text-green-500 text-3xl font-bold'>57W</Text>
                        <View className='w-3 h-3 bg-white rounded-full' />
                        <Text className='text-red-500 text-3xl font-bold'>27L</Text>
                    </View>
                </View>
                <Separator />
                <View className='flex-col gap-2 items-center'>
                    <Text className='text-white text-xl font-bold'>Current Rank</Text>
                    <Image source={{ uri: "https://trackercdn.com/cdn/tracker.gg/valorant/icons/tiersv2/15.png" }} className='w-16 h-16 rounded-full' />
                </View>
            </View>
            <Separator horizontal />
            <View>
                <TabList onTabChange={setCurrentTab} currentTab={currentTab} />
                {isLoading ? (
                    <View className='flex-1 justify-center items-center py-8'>
                        <ActivityIndicator size="large" color="#ffffff" />
                        <Text className='text-white/70 mt-2'>Loading match history...</Text>
                    </View>
                ) : error ? (
                    <View className='flex-1 justify-center items-center py-8'>
                        <Text className='text-red-500 text-center mb-2'>Failed to load match history</Text>
                        <Text className='text-white/70 text-sm text-center'>
                            {error instanceof Error ? error.message : 'Unknown error occurred'}
                        </Text>
                    </View>
                ) : (
                    <MatchHistory matchHistory={matchHistory || []} />
                )}
            </View>
        </SafeAreaView>
    )
}

// Move IMatchHistory type to a more appropriate location
export interface IMatchHistory {
    attributes: {
        id: string;
        mapId: string;
        modeId: string;
        seasonId: string;
    };
    metadata: {
        modeKey: string;
        modeName: string;
        modeImageUrl: string;
        modeMaxRounds: number;
        isAvailable: boolean;
        timestamp: string;
        result: string;
        map: string;
        mapName: string;
        mapImageUrl: string;
        seasonName: string;
    };
    segments: Array<{
        type: string;
        attributes: {
            platformSlug: string;
            platformUserIdentifier: string;
        };
        metadata: {
            platformUserHandle: string;
            hasWon: boolean;
            result: string;
            agent: string;
            agentName: string;
            agentColor: string;
            agentImageUrl: string;
        };
        expiryDate: string;
        stats: {
            [key: string]: {
                displayName: string;
                displayCategory?: string;
                category?: string;
                metadata: any;
                value: number | null;
                displayValue: string | null;
                displayType: string;
            };
        };
    }>;
}