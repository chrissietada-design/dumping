import { nanoid } from "nanoid";
import type { InboxItem, InboxStatus } from "@/types/inbox";

const MOCK_USER_ID = "mock-user";

let items: InboxItem[] = [
  {
    id: nanoid(),
    userId: MOCK_USER_ID,
    content: "브레인덤프 목업 데이터",
    status: "pending",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export function listMockItems() {
  return items;
}

export function addMockItem(content: string) {
  const now = new Date().toISOString();
  const newItem: InboxItem = {
    id: nanoid(),
    userId: MOCK_USER_ID,
    content,
    status: "pending",
    createdAt: now,
    updatedAt: now,
  };
  items = [newItem, ...items];
  return newItem;
}

export function updateMockItem(id: string, status: InboxStatus) {
  items = items.map((item) =>
    item.id === id ? { ...item, status, updatedAt: new Date().toISOString() } : item,
  );
}

export function carryOverMockItems() {
  const now = new Date().toISOString();
  items = items.map((item) =>
    item.status === "done"
      ? item
      : { ...item, status: "pending", carriedOverAt: now, updatedAt: now },
  );
}
