import React from "react";
import { createNativeStackNavigator, NativeStackNavigationProp } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaView, StyleSheet } from "react-native";
import AppTabNavigation from "@navigation/AppTabNavigation";

// Define the Root Stack Param List
export type RootStackParamList = {
    App: undefined;
};

export type NavigationProps = NativeStackNavigationProp<RootStackParamList>;

// Create Stack Navigator
const Stack = createNativeStackNavigator<RootStackParamList>();

export default function Navigation() {
    return (
        <SafeAreaView style={styles.safeArea}>
            <NavigationContainer>
                <Stack.Navigator
                    screenOptions={{
                        animation: "none",
                        headerShown: false,
                        contentStyle: styles.stackContent, // Set background color for all screens
                    }}
                >
                    {/* Correct usage of Stack.Screen */}
                    <Stack.Screen name="App" component={AppTabNavigation} />
                </Stack.Navigator>
            </NavigationContainer>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: "white", // Set background color for SafeAreaView
    },
    stackContent: {
        backgroundColor: "white", // Set background color for all screens in the Stack Navigator
    },
});