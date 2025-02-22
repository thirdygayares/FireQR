import AsyncStorage from "@react-native-async-storage/async-storage";

/**
 * Save data to AsyncStorage.
 * @param key Storage key
 * @param newItem New item to be stored
 */
export const saveItem = async <T>(key: string, newItem: T) => {
    try {
        const existingItems = await getItems<T>(key);
        const updatedItems = [newItem, ...existingItems]; 
        await AsyncStorage.setItem(key, JSON.stringify(updatedItems));
    } catch (error) {
        console.error(`Error saving item to ${key}:`, error);
    }
};

/**
 * Retrieve data from AsyncStorage.
 * @param key Storage key
 * @returns Parsed list of stored items
 */
export const getItems = async <T>(key: string): Promise<T[]> => {
    try {
        const storedItems = await AsyncStorage.getItem(key);
        return storedItems ? JSON.parse(storedItems) : [];
    } catch (error) {
        console.error(`Error retrieving items from ${key}:`, error);
        return [];
    }
};

/**
 * Clear stored items from AsyncStorage.
 * @param key Storage key
 */
export const clearItems = async (key: string) => {
    try {
        await AsyncStorage.removeItem(key);
    } catch (error) {
        console.error(`Error clearing items from ${key}:`, error);
    }
};
