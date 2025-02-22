import { Alert, Platform } from "react-native";
import * as MediaLibrary from "expo-media-library";
import { captureRef } from "react-native-view-shot";

export const useFileDownload = () => {
    const handleSaveQr = async (qrCodeRef: any) => {
        try {
            if (!qrCodeRef) return;

            if (Platform.OS === "web") {
                // Web: Download Image File
                const uri = await captureRef(qrCodeRef, { format: "png", quality: 1 });
                const link = document.createElement("a");
                link.href = uri;
                link.download = "qr-code.png";
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                Alert.alert("Downloaded", "QR Code has been downloaded.");
            } else {
                // Mobile (Android & iOS)
                const { status } = await MediaLibrary.requestPermissionsAsync();
                if (status !== "granted") {
                    Alert.alert("Permission Denied", "You need to allow access to save QR codes.");
                    return;
                }

                const uri = await captureRef(qrCodeRef, { format: "png", quality: 1 });
                await MediaLibrary.saveToLibraryAsync(uri);
                Alert.alert("Saved", "QR Code has been saved to your device!");
            }
        } catch (error) {
            console.error("Error saving QR code:", error);
            Alert.alert("Error", "Something went wrong while saving the QR Code.");
        }
    };

    return { handleSaveQr };
};
