import React, { useState, useEffect } from "react";
import { View, Text, Modal, TouchableOpacity, StyleSheet } from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import PermissionInstruction from "@components/PermissionInstruction";
import {useStorage} from "@hooks/useStorage";
import {ScanHistoryItem} from "@app/types/ScanHistoryItem";

export const MobileScanQrScreen = () => {
    const [hasPermission, requestPermission] = useCameraPermissions();
    const [scannedData, setScannedData] = useState<string | null>(null);
    const [modalVisible, setModalVisible] = useState(false);
    const { addItem } = useStorage<ScanHistoryItem>("scan_history");

    useEffect(() => {
        if (hasPermission === null) {
            requestPermission();
        }
    }, [hasPermission]);

    const handleBarCodeScanned = ({ data }: { data: string }) => {
        setScannedData(data);
        setModalVisible(true);
        addItem({ details: data, date: new Date().toISOString() });

    };

    const handleCloseModal = () => {
        setModalVisible(false);
        setScannedData(null);
    };

    if (hasPermission === null) {
        return <Text className="text-center text-lg mt-10">Requesting camera permission...</Text>;
    }

    if (!hasPermission.granted) {
        return <PermissionInstruction />;
    }

    return (
        <View className="flex-1">
            {/* Camera Scanner */}
            <CameraView
                onBarcodeScanned={scannedData ? undefined : handleBarCodeScanned}
                style={styles.camera}
            />

            {/* Bottom Sheet Modal for QR Code Result */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={handleCloseModal}
            >
                <View className="flex-1 justify-end bg-blue-500/50">
                    <View className="bg-white rounded-t-3xl justify-between px-5 py-20 " >
                        <Text className="text-center text-xl font-bold mb-2">QR Code Result</Text>
                        <Text className="text-center text-gray-600">{scannedData}</Text>

                        {/* Close Button */}
                        <TouchableOpacity onPress={handleCloseModal} className="bg-blue-500 mt-4 p-3 rounded-lg">
                            <Text className="text-center text-white font-bold">Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    camera: { flex: 1, width: "100%" },
});

export default MobileScanQrScreen;