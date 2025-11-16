"use client";

import { create } from "zustand";
import { nanoid } from "nanoid";
import type { InboxFilter, InboxItem, InboxStatus } from "@/types/inbox";
import { addMinutes, formatISO } from "date-fns";

type InboxState = {
  items: InboxItem[];
  filter: InboxFilter;
  autoCarryOver: boolean;
  addItem: (content: string) => void;
  setFilter: (filter: InboxFilter) => void;
  toggleDone: (id: string) => void;
  markScheduled: (id: string) => void;
  carryOverIncomplete: () => void;
  setAutoCarryOver: (value: boolean) => void;
};

const initialItems: InboxItem[] = [
  {
    id: nanoid(),
    content: "팀 회의 안건 정리",
    status: "scheduled",
    createdAt: formatISO(new Date()),
    updatedAt: formatISO(new Date()),
  },
  {
    id: nanoid(),
    content: "블로그 초안 작성",
    status: "pending",
    createdAt: formatISO(addMinutes(new Date(), -30)),
    updatedAt: formatISO(addMinutes(new Date(), -30)),
  },
  {
    id: nanoid(),
    content: "메일함 정리",
    status: "done",
    createdAt: formatISO(addMinutes(new Date(), -120)),
    updatedAt: formatISO(addMinutes(new Date(), -90)),
  },
];

export const useInboxStore = create<InboxState>((set) => ({
  items: initialItems,
  filter: "all",
  autoCarryOver: true,
  addItem: (content) =>
    set((state) => ({
      items: [
        {
          id: nanoid(),
          content,
          status: "pending",
          createdAt: formatISO(new Date()),
          updatedAt: formatISO(new Date()),
        },
        ...state.items,
      ],
    })),
  setFilter: (filter) => set({ filter }),
  toggleDone: (id) =>
    set((state) => ({
      items: state.items.map((item) =>
        item.id === id
          ? {
              ...item,
              status: item.status === "done" ? "pending" : "done",
              updatedAt: formatISO(new Date()),
            }
          : item,
      ),
    })),
  markScheduled: (id) =>
    set((state) => ({
      items: state.items.map((item) =>
        item.id === id
          ? {
              ...item,
              status: "scheduled",
              updatedAt: formatISO(new Date()),
            }
          : item,
      ),
    })),
  carryOverIncomplete: () =>
    set((state) => ({
      items: state.items.map((item) =>
        item.status !== "done"
          ? {
              ...item,
              carriedOverAt: formatISO(new Date()),
              status: "pending",
            }
          : item,
      ),
    })),
  setAutoCarryOver: (value) => set({ autoCarryOver: value }),
}));

export const statusLabels: Record<InboxStatus, string> = {
  pending: "미배치",
  scheduled: "일정 연결됨",
  done: "완료",
};
