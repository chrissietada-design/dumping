export type InboxStatus = "pending" | "scheduled" | "done";

export type InboxItem = {
  id: string;
  content: string;
  status: InboxStatus;
  createdAt: string;
  updatedAt: string;
  carriedOverAt?: string;
};

export type InboxFilter = "all" | InboxStatus;
