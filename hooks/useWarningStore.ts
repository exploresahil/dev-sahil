// /hooks/useWarningStore.ts
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

type WarningState = {
    warningDismissed: boolean;
    dismissWarning: () => void;
};

export const useWarningStore = create<WarningState>()(
    persist(
        (set) => ({
            warningDismissed: false,
            dismissWarning: () => set({ warningDismissed: true }),
        }),
        {
            name: 'motion-warning',                 // key in localStorage
            storage: createJSONStorage(() => localStorage),
            partialize: (state) => ({               // only persist this field
                warningDismissed: state.warningDismissed,
            }),
        }
    )
);
