"use client";

import { useState, useMemo } from "react";
import { BrainDumpInput } from "@/components/inbox/brain-dump-input";
import { InboxFilters } from "@/components/inbox/inbox-filters";
import { InboxList } from "@/components/inbox/inbox-list";
import { CarryOverPanel } from "@/components/inbox/carry-over-panel";
import { VerificationChecklist } from "@/components/verification/checklist";
import type { InboxFilter, InboxItem } from "@/types/inbox";
import {
  useAddInboxItem,
  useCarryOverInboxItems,
  useInboxItems,
  useUpdateInboxStatus,
} from "@/hooks/use-inbox";

export function DumpWorkspace() {
  const [filter, setFilter] = useState<InboxFilter>("all");
  const [autoCarryOver, setAutoCarryOver] = useState(true);

  const { data, isLoading } = useInboxItems();
  const pendingCount = useMemo(
    () => (data ?? []).filter((item) => item.status !== "done").length,
    [data],
  );
  const items = data ?? [];

  const addMutation = useAddInboxItem();
  const updateMutation = useUpdateInboxStatus();
  const carryOverMutation = useCarryOverInboxItems();

  const handleAddItem = async (content: string) => {
    await addMutation.mutateAsync({ content });
  };

  const handleToggleDone = (item: InboxItem) => {
    const nextStatus = item.status === "done" ? "pending" : "done";
    updateMutation.mutate({ id: item.id, status: nextStatus });
  };

  const handleMarkScheduled = (item: InboxItem) => {
    updateMutation.mutate({ id: item.id, status: "scheduled" });
  };

  return (
    <section className="grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(280px,1fr)]">
      <div className="space-y-6">
        <BrainDumpInput
          onSubmit={handleAddItem}
          isSubmitting={addMutation.isPending}
        />
        <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
          <InboxFilters filter={filter} onChange={setFilter} />
          <div className="mt-4">
            <InboxList
              items={items}
              filter={filter}
              isLoading={isLoading}
              onToggleDone={handleToggleDone}
              onMarkScheduled={handleMarkScheduled}
              activeItemId={updateMutation.variables?.id}
            />
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <CarryOverPanel
          pendingCount={pendingCount}
          autoCarryOver={autoCarryOver}
          onToggleAuto={setAutoCarryOver}
          onCarryOver={() => carryOverMutation.mutate()}
          isProcessing={carryOverMutation.isPending}
        />
        <VerificationChecklist
          title="브레인덤프 체크리스트"
          items={[
            {
              label: "오늘 할 일을 모두 입력했다",
              hint: "머릿속에 남아 있는 일을 빠짐없이 추가했나요?",
            },
            {
              label: "미배치 항목 상태를 확인했다",
              hint: "필터를 통해 '미배치' 항목만 집중적으로 봅니다.",
            },
            {
              label: "캘린더 배치가 필요한 항목을 골랐다",
              hint: "드래그앤드롭 준비를 위해 우선순위를 파악합니다.",
            },
          ]}
        />
      </div>
    </section>
  );
}
