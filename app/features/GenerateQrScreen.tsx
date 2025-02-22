import { View, Text, SafeAreaView, TextInput } from "react-native";
import QRCode from "react-native-qrcode-svg";
import { useState } from "react";

export const GenerateQrScreen = () => {
    const [text, setText] = useState("");

    return (
        <SafeAreaView className="flex-1 gap-5 items-center justify-center bg-white">
            <Text className="font-bold text-4xl mb-4">Generate QR Code</Text>
            <TextInput
                className="border border-gray-300 rounded-lg px-2 py-5 w-3/4 text-center"
                placeholder="Enter text"
                value={text}
                onChangeText={(value) => setText(value || " ")} // Avoid empty string
            />
            <View className="mt-4">
                <QRCode value={text.trim() || "No Data"} size={200} />
            </View>
        </SafeAreaView>
    );
};
