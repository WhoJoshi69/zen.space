import { useState, useEffect } from 'react';

import { useRouter } from 'next/router';

export default function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T | ((val: T) => T)) => void] {
    const router = useRouter();

    // State to store our value
    // Pass initial state function to useState so logic is only executed once
    const [storage, setStorage] = useState<T>(() => {
        // Move initial value logic into useState initializer function
        if (typeof window === 'undefined') {
            return initialValue;
        }
        try {
            const item = window.localStorage.getItem(key);
            let parse = typeof initialValue !== 'string';
            return item ? (parse ? JSON.parse(item) : item) : initialValue;
        } catch (error) {
            console.log(error);
            return initialValue;
        }
    });

    useEffect(() => {
        if (typeof window === 'undefined') return;
        
        const handleStorageUpdate = () => {
            const item = window.localStorage.getItem(key);
            if (item) {
                let parse = typeof initialValue !== 'string';
                setStorage(parse ? JSON.parse(item) : item);
            }
        };

        handleStorageUpdate(); // Initial check
        
        // Optional: Listen for storage changes
        window.addEventListener('storage', handleStorageUpdate);
        return () => window.removeEventListener('storage', handleStorageUpdate);
    }, [key, router.query]);

    // Return a wrapped version of useState's setter function that ...
    // ... persists the new value to localStorage.
    const setValue = (value: T | ((val: T) => T)) => {
        try {
            // Allow value to be a function so we have same API as useState
            const valueToStore = value instanceof Function ? value(storage) : value;
            // Save state
            setStorage(valueToStore);
            // Save to local storage
            if (typeof window !== 'undefined') {
                let parse = typeof valueToStore !== 'string';
                window.localStorage.setItem(
                    key,
                    parse ? JSON.stringify(valueToStore) : valueToStore as string
                );
            }
        } catch (error) {
            // A more advanced implementation would handle the error case
            console.log(error);
        }
    };

    return [storage, setValue];
}
