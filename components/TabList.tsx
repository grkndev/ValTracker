import React from 'react'
import { FlatList, Pressable, Text } from 'react-native'

export default function TabList({
    onTabChange,
    currentTab
}: {
    onTabChange: (tab: ITabListData) => void,
    currentTab: ITabListData
}) {
    return (
        <FlatList
            data={TabListData}
            renderItem={({ item }) => <TabItem item={item} onPress={() => onTabChange(item)} isActive={currentTab === item} />}
            keyExtractor={(item) => item}
            initialScrollIndex={TabListData.indexOf(currentTab)}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ gap: 10 }}
        />
    )
}

const TabItem = ({ item, onPress, isActive }: { item: string, onPress: () => void, isActive: boolean }) => {
    return (
        <Pressable className={`flex-row items-center gap-2 bg-white/10 rounded-full px-4 py-2 ${isActive ? 'border-red-500 border-2' : ''}`} onPress={onPress}>
            <Text className='text-white text-lg font-bold'>{item}</Text>
        </Pressable>
    )
}

const TabListData: ITabListData[] = [
    "Unrated", "Competitive", "Spike Rush", "Team Deathmatch", "Deathmatch", "Custom"
]
export type ITabListData =
    "Unrated" | "Competitive" | "Spike Rush" | "Team Deathmatch" | "Deathmatch" | "Custom"
