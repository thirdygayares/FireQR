import { Text, View } from "react-native";

export default function PermissionInstruction() {
    return (
        <View className="flex-1 items-center justify-center p-4">
            <Text className="text-center text-lg text-gray-600">
                To use the camera, please grant permission in your device settings.
            </Text>
        </View>
    );
}
