import { PageHeader } from "@/components/layout/page-header";
import { DumpWorkspace } from "@/components/inbox/dump-workspace";

export default function DumpPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="오늘 브레인덤프"
        description="오늘 머릿속에 떠오르는 모든 일을 적고, 상태별로 정리해보세요."
      />

      <DumpWorkspace />
    </div>
  );
}
