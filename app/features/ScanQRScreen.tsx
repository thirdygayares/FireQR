import React from "react";
import { Platform } from "react-native";
import {WebScanQrScreen} from "@features/WebScanQrScreen";
import MobileScanQrScreen from "@features/MobileScanQrScreen";

export const ScanQrScreen = () => {
    return Platform.OS === "web" ? <WebScanQrScreen /> : <MobileScanQrScreen />;
};

export default ScanQrScreen;
