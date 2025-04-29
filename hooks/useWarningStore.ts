import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

type WarningState = {
    warningDismissed: boolean;
    dismissWarning: () => void;
};

// Helper: compute start of next local day (12am)
const getNextMidnight = () => {
    const now = new Date();
    const next = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate() + 1,
        0, 0, 0,
        0
    );
    return next.getTime();
};

// Custom JSON storage that wraps localStorage to add expire at next midnight
const expiringStorage = () => ({
    getItem: (name: string) => {
        const str = localStorage.getItem(name);
        if (!str) return null;

        try {
            const parsed = JSON.parse(str) as { value: any; expireAt: number; };

            if (Date.now() > parsed.expireAt) {
                localStorage.removeItem(name);
                return null;
            }

            // return the raw JSON string of the stored value
            return JSON.stringify(parsed.value);
        } catch {
            // corrupted or old format
            localStorage.removeItem(name);
            return null;
        }
    },
    setItem: (name: string, value: string) => {
        try {
            const wrapped = {
                value: JSON.parse(value),
                expireAt: getNextMidnight(),
            };
            localStorage.setItem(name, JSON.stringify(wrapped));
        } catch {
            // fallback: store raw
            localStorage.setItem(name, value);
        }
    },
    removeItem: (name: string) => {
        localStorage.removeItem(name);
    },
});

export const useWarningStore = create<WarningState>()(
    persist(
        (set) => ({
            warningDismissed: false,
            dismissWarning: () => set({ warningDismissed: true }),
        }),
        {
            name: 'motion-warning',
            storage: createJSONStorage(expiringStorage),
            partialize: (state) => ({ warningDismissed: state.warningDismissed }),
        }
    )
);
