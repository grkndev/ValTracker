import { IMatchHistory } from '@/app';
import { shortTimeAgo } from '@/lib/utils';
import { BlurView } from 'expo-blur';
import React from 'react';
import { FlatList, Image, ImageBackground, Text, View } from 'react-native';

export default function MatchHistory({ matchHistory }: { matchHistory: IMatchHistory[] }) {
    if (!matchHistory) {
        return (
            <View className='flex-1 justify-center items-center'>
                <Text className='text-white text-center'>No match history found</Text>
            </View>
        )
    }
    return (
        <FlatList
            data={matchHistory}
            renderItem={({ item }) => <MatchHistoryItem matchHistory={item} />}
            keyExtractor={(item) => item.attributes.id}
            ListEmptyComponent={() => (
                <View className='flex-1 justify-center items-center'>
                    <Text className='text-white text-center'>No match history found</Text>
                </View>
            )}
        />
    )
}

function MatchHistoryItem({ matchHistory }: { matchHistory: IMatchHistory }) {
    return (
        <View className='h-24 w-full rounded-2xl overflow-hidden'>
            <BlurView
                intensity={100}
                className='w-full h-full'
                tint='dark'
                experimentalBlurMethod='dimezisBlurView'
                blurReductionFactor={0.5}
            >
                <ImageBackground source={{ uri: matchHistory.metadata.mapImageUrl }}
                    className='w-full h-full p-4 flex-row items-center gap-4 justify-between'
                    imageStyle={{ opacity: 0.25 }}
                >
                    <View className='flex-row items-center gap-2'>
                        <View className=' bg-white/10 rounded-2xl aspect-square h-full p-2'>
                            <Image source={{ uri: matchHistory.segments[0].metadata.agentImageUrl }} className='w-full h-full rounded-xl' />
                        </View>
                        <View>
                            <Text className='font-bold text-xl text-white'>
                                {matchHistory.metadata.mapName}
                            </Text>
                            <Text className='text-white/50 text-xs'>
                                {shortTimeAgo(matchHistory.metadata.timestamp)}
                            </Text>
                        </View>
                    </View>
                    <View className='p-2 bg-white/10 rounded-2xl'>
                        <Image source={{ uri: matchHistory.segments[0].stats.rank.metadata.iconUrl }} className='w-8 h-8 rounded-xl' />
                    </View>
                    <View className='items-end flex-col'>
                        <Text className='text-white/50 text-xs'>K / D / A</Text>
                        <Text className='text-white text-sm font-bold'>
                            {matchHistory.segments[0].stats.kills.value}{" "}/{" "}
                            {matchHistory.segments[0].stats.deaths.value}{" "}/{" "}
                            {matchHistory.segments[0].stats.assists.value}
                        </Text>
                    </View>
                    <View className='flex-row gap-1'>
                        <Text className='text-green-500 text-2xl font-bold'>{matchHistory.segments[0].stats.roundsWon.value}</Text>
                        <Text className='text-white text-2xl font-bold'>:</Text>
                        <Text className='text-red-500 text-2xl font-bold'>{matchHistory.segments[0].stats.roundsLost.value}</Text>
                    </View>
                </ImageBackground>
            </BlurView>
        </View>
    )
}