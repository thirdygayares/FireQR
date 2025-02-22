import { View, Text, SafeAreaView, TextInput, TouchableOpacity, Alert } from "react-native";
import QRCode from "react-native-qrcode-svg";
import { useState, useRef } from "react";
import ViewShot, {captureRef} from "react-native-view-shot";
import * as MediaLibrary from "expo-media-library";

export const GenerateQrScreen = () => {
    const [text, setText] = useState("");
    const qrCodeRef = useRef<ViewShot | null>(null);

    const handleSaveQr = async () => {
        try {
            const { status } = await MediaLibrary.requestPermissionsAsync();
            if (status !== "granted") {
                Alert.alert("Permission Denied", "You need to allow access to save QR codes.");
                return;
            }

            if (qrCodeRef.current) {
                const uri = await captureRef(qrCodeRef, {
                    format: "png",
                    quality: 1,
                });
                await MediaLibrary.saveToLibraryAsync(uri);
                Alert.alert("Saved", "QR Code has been saved to your device!");
            }
        } catch (error) {
            console.error("Error saving QR code:", error);
            Alert.alert("Error", "Something went wrong while saving the QR Code.");
        }
    };

    return (
        <SafeAreaView className="flex-1 gap-5 items-center justify-center bg-white">
            <Text className="font-bold text-4xl mb-4">Generate QR Code</Text>

            <TextInput
                className="border border-gray-300 rounded-lg px-2 py-5 w-3/4 text-center"
                placeholder="Enter text"
                value={text}
                onChangeText={(value) => setText(value)}
            />

            <ViewShot ref={qrCodeRef} options={{ format: "png", quality: 1 }}>
                <View className="mt-4">
                    <QRCode value={text.trim() || "No Data"} size={200} />
                </View>
            </ViewShot>

            {text.trim() !== "" && (
                <TouchableOpacity onPress={handleSaveQr} className="bg-blue-500 mt-5 p-3 rounded-lg w-3/4">
                    <Text className="text-center text-white font-bold">Save QR Code</Text>
                </TouchableOpacity>
            )}
        </SafeAreaView>
    );
};

export default GenerateQrScreen;
