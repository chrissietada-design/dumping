import { PageHeader } from "@/components/layout/page-header";

export default function SchedulePage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="일정 종합 관리"
        description="브레인덤프 항목을 캘린더 타임라인으로 드래그해 배치하는 페이지입니다. (준비 중)"
      />
      <div className="rounded-3xl border border-dashed border-white/15 bg-white/5 p-10 text-center text-white/70">
        타임블럭 캘린더 인터페이스는 다음 단계에서 구현될 예정입니다.
      </div>
    </div>
  );
}
