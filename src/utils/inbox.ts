import type { InboxStatus } from "@/types/inbox";

export const statusLabels: Record<InboxStatus, string> = {
  pending: "미배치",
  scheduled: "일정 연결됨",
  done: "완료",
};
