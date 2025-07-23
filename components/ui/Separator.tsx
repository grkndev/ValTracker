import React from 'react'
import { View } from 'react-native'

export default function Separator({ horizontal = false }: { horizontal?: boolean }) {
    return (
        <View className={`${horizontal ? 'w-full h-[1px]' : 'w-[1px] h-full'} bg-white/15 rounded-full`} />
    )
}