import { useState, useEffect } from "react";
import {clearItems, getItems, saveItem} from "@utils/storageUtils";

/**
 * Custom hook for managing stored data.
 * @param key Storage key
 */
export const useStorage = <T>(key: string) => {
    const [items, setItems] = useState<T[]>([]);

    useEffect(() => {
        loadItems();
    }, []);

    const loadItems = async () => {
        const storedItems = await getItems<T>(key);
        setItems(storedItems);
    };

    const addItem = async (newItem: T) => {
        await saveItem<T>(key, newItem);
        loadItems();
    };

    const clearAllItems = async () => {
        await clearItems(key);
        setItems([]);
    };

    return { items, addItem, clearAllItems, loadItems };
};
