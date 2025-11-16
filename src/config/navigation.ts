type NavItem = {
  href: string;
  label: string;
  description: string;
  badge?: string;
  inactive?: boolean;
};

export const primaryNav: NavItem[] = [
  {
    href: "/dump",
    label: "오늘 브레인덤프",
    description: "빠른 입력 · 상태 필터",
  },
  {
    href: "/schedule",
    label: "일정 종합 관리",
    description: "드래그앤드롭 타임라인",
  },
  {
    href: "/review",
    label: "하루 리뷰",
    description: "실행률 · 회고",
  },
];

export const secondaryNav: NavItem[] = [
  {
    href: "/weekly",
    label: "주간 보기 (Soon)",
    description: "주간 루틴/통계",
    inactive: true,
    badge: "준비중",
  },
  {
    href: "/settings",
    label: "설정 (Soon)",
    description: "알림 · 연결",
    inactive: true,
    badge: "준비중",
  },
];
