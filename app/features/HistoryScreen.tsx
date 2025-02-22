import React, {useCallback} from "react";
import { View, Text, FlatList, SafeAreaView, TouchableOpacity } from "react-native";
import {useStorage} from "@hooks/useStorage";
import {ScanHistoryItem} from "@app/types/ScanHistoryItem";
import {useFocusEffect} from "@react-navigation/native";

export const HistoryScreen = () => {
    const { items: history, clearAllItems, loadItems } = useStorage<ScanHistoryItem>("scan_history");

    useFocusEffect(
        useCallback(() => {
            loadItems();
        }, [])
    );

    return (
        <SafeAreaView className="flex-1 bg-white lg:px-[400px]">
            <View className="p-5 flex-1">
                <Text className="text-2xl font-bold mb-4">Scan History</Text>

                {history.length === 0 ? (
                    <Text className="text-gray-500 text-center">No scan history available</Text>
                ) : (
                    <FlatList
                        data={history}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => (
                            <View className="border-b border-gray-300 p-4">
                                <Text className="text-lg">{item.details}</Text>
                                <Text className="text-gray-500 text-sm">{new Date(item.date).toLocaleString()}</Text>
                            </View>
                        )}
                    />
                )}

                {history.length > 0 && (
                    <TouchableOpacity onPress={clearAllItems} className="bg-red-500 mt-5 p-3 rounded-lg">
                        <Text className="text-center text-white font-bold">Clear History</Text>
                    </TouchableOpacity>
                )}
            </View>
        </SafeAreaView>
    );
};

export default HistoryScreen;
