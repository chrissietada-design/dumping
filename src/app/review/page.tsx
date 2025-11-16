import { PageHeader } from "@/components/layout/page-header";

export default function ReviewPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="하루 리뷰"
        description="일정 실행률과 미완료 항목을 돌아보는 대시보드는 추후 단계에서 공개됩니다."
      />
      <div className="rounded-3xl border border-dashed border-white/15 bg-white/5 p-10 text-center text-white/70">
        완료/미완료 리스트, 내일로 보내기, 회고 메모 컴포넌트를 곧 추가할 예정입니다.
      </div>
    </div>
  );
}
