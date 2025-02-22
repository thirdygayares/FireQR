import React, { useEffect, useRef, useState } from "react";
import { View, Text, Modal, TouchableOpacity } from "react-native";
import { Html5QrcodeScanner } from "html5-qrcode";
import { useStorage } from "@hooks/useStorage";
import { ScanHistoryItem } from "@app/types/ScanHistoryItem";

export const WebScanQrScreen = () => {
    const [scannedData, setScannedData] = useState<string | null>(null);
    const [modalVisible, setModalVisible] = useState(false);
    const scannerRef = useRef<Html5QrcodeScanner | null>(null);
    const { addItem } = useStorage<ScanHistoryItem>("scan_history");




    useEffect(() => {
        const scanner = new Html5QrcodeScanner(
            "qr-reader",
            { fps: 10, qrbox: 250 },
            false
        );

        scanner.render(
            (data) => {
                setScannedData(data);
                setModalVisible(true);
                addItem({ details: data, date: new Date().toISOString() });
            },
            (error) => console.error(error)
        );

        scannerRef.current = scanner;

        return () => {
            if (scannerRef.current) {
                scannerRef.current.clear();
            }
        };
    }, []);

    return (
        <View className="flex-1">
          <div id="qr-reader" style={{ width: "100%", height: "100%" }}></div>

            {/* Modal for Scan Result */}
            <Modal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
                <View className="flex-1 justify-end bg-blue-500/50">
                    <View className="bg-white rounded-t-3xl px-5 py-20">
                        <Text className="text-center text-xl font-bold mb-2">QR Code Result</Text>
                        <Text className="text-center text-gray-600">{scannedData}</Text>

                        <TouchableOpacity onPress={() => setModalVisible(false)} className="bg-blue-500 mt-4 p-3 rounded-lg">
                        <Text className="text-center text-white font-bold">Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
);
};
