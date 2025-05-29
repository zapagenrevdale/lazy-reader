import { create } from "zustand"
import { persist } from "zustand/middleware"
import { createId } from "@paralleldrive/cuid2"

type UserStore = {
  userUid?: string,
  getUserUid: () => string;
}

export const useUserStore = create<UserStore>()(
  persist(
    (set, get) => ({
      getUserUid: () => {
        const uid = get().userUid;
        if (!uid) {
          const newUid = createId();
          set(() => ({
            userUid: newUid
          }))
          return newUid
        }
        return uid;
      }
    }),
    {
      name: "lazy-reader-store",
    }
  )
)

