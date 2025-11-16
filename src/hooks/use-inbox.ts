"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { InboxItem, InboxStatus } from "@/types/inbox";

const QUERY_KEY = ["inbox-items"];

async function fetchInboxItems(): Promise<InboxItem[]> {
  const response = await fetch("/api/inbox", {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("브레인덤프 데이터를 불러오지 못했습니다.");
  }

  const data = await response.json();
  return data.items as InboxItem[];
}

export function useInboxItems() {
  return useQuery({
    queryKey: QUERY_KEY,
    queryFn: fetchInboxItems,
  });
}

export function useAddInboxItem() {
  const queryClient = useQueryClient();

  return useMutation<unknown, Error, { content: string }>({
    mutationFn: async ({ content }: { content: string }) => {
      const response = await fetch("/api/inbox", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content }),
      });
      if (!response.ok) {
        throw new Error("브레인덤프 항목 추가에 실패했습니다.");
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY });
    },
  });
}

export function useUpdateInboxStatus() {
  const queryClient = useQueryClient();

  return useMutation<unknown, Error, { id: string; status: InboxStatus }>({
    mutationFn: async ({ id, status }: { id: string; status: InboxStatus }) => {
      const response = await fetch(`/api/inbox/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (!response.ok) {
        throw new Error("상태 변경에 실패했습니다.");
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY });
    },
  });
}

export function useCarryOverInboxItems() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const response = await fetch("/api/inbox/carry-over", {
        method: "POST",
      });
      if (!response.ok) {
        throw new Error("이월 처리에 실패했습니다.");
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY });
    },
  });
}
