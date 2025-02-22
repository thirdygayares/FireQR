import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialIcons } from "@expo/vector-icons";
import {GenerateQrScreen} from "@features/GenerateQrScreen";
import {HistoryScreen} from "@features/HistoryScreen";
import {MobileScanQrScreen} from "@features/MobileScanQrScreen";
import ScanQrScreen from "@features/ScanQRScreen";

export type RootTabParamList = {
    Scan: undefined;
    Generate: undefined;
    History: undefined;
};

const Tab = createBottomTabNavigator<RootTabParamList>();

export default function AppTabNavigation() {
    return (
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ color, size }) => {
                        let iconName: keyof typeof MaterialIcons.glyphMap;

                        if (route.name === "Scan") {
                            iconName = "qr-code-scanner";
                        } else if (route.name === "Generate") {
                            iconName = "dataset";
                        } else if (route.name === "History") {
                            iconName = "history";
                        }else {
                            iconName = "dataset";
                        }
                        return <MaterialIcons name={iconName} size={size} color={color} />;
                    },
                    tabBarActiveTintColor: "#008dff",
                    tabBarInactiveTintColor: "rgba(6,48,83,0.22)",
                    tabBarStyle: {
                        height: 65,
                        paddingTop: 7,
                        alignItems: "center",
                        borderRadius: 30,
                        margin: 30,
                        backgroundColor: "#fff9f9",
                        },
                    headerShown: false, // Hide header
                })}
            >
                <Tab.Screen name="Generate" component={GenerateQrScreen} />
                <Tab.Screen  name="Scan" component={ScanQrScreen} />
                <Tab.Screen name="History" component={HistoryScreen} />
            </Tab.Navigator>
    );
}
