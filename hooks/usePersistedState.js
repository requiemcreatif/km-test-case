import React, { useState } from 'react';

export function usePersistedState (key, defaultValue) {
    const [state, setState] = useState(() => {
        if (typeof window !== 'undefined') {
            const persistedState = window.localStorage.getItem(key);
            return persistedState ? JSON.parse(persistedState) : defaultValue;
        }
        return defaultValue;
    });

    React.useEffect(() => {
        if (typeof window !== 'undefined') {
            window.localStorage.setItem(key, JSON.stringify(state));
        }
    }, [key, state]);

    return [state, setState];
}