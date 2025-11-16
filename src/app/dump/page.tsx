import { PageHeader } from "@/components/layout/page-header";
import { BrainDumpInput } from "@/components/inbox/brain-dump-input";
import { InboxFilters } from "@/components/inbox/inbox-filters";
import { InboxList } from "@/components/inbox/inbox-list";
import { CarryOverPanel } from "@/components/inbox/carry-over-panel";
import { VerificationChecklist } from "@/components/verification/checklist";

export default function DumpPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="오늘 브레인덤프"
        description="오늘 머릿속에 떠오르는 모든 일을 적고, 상태별로 정리해보세요."
      />

      <section className="grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(280px,1fr)]">
        <div className="space-y-6">
          <BrainDumpInput />
          <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
            <InboxFilters />
            <div className="mt-4">
              <InboxList />
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <CarryOverPanel />
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
    </div>
  );
}
