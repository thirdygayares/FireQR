import React from "react";
import {createNativeStackNavigator, NativeStackNavigationProp} from "@react-navigation/native-stack";

import AppTabNavigation from "@navigation/AppTabNavigation";
import {NavigationContainer} from "@react-navigation/native";
import {SafeAreaView} from "react-native";


export type RootStackParamList = {
    App: undefined;
};

export type NavigationProps = NativeStackNavigationProp<RootStackParamList>;

// Create Stack Navigator
const Stack = createNativeStackNavigator<RootStackParamList>();

export default function Navigation() {
    return (
            <NavigationContainer>
                <Stack.Navigator
                    screenOptions={{
                        animation: "none",
                        headerShown: false,
                    }}
                >
                    <Stack.Screen name="App" component={AppTabNavigation} />
                </Stack.Navigator>
            </NavigationContainer>
    );
}
