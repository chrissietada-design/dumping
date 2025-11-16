import { ReactNode } from "react";
import { SideNav } from "@/components/navigation/side-nav";
import { TopBar } from "@/components/navigation/top-bar";

type Props = {
  children: ReactNode;
};

export function AppShell({ children }: Props) {
  return (
    <div className="min-h-dvh bg-slate-950 text-slate-50">
      <div className="flex min-h-dvh w-full">
        <SideNav />
        <div className="flex flex-1 flex-col border-l border-white/5 bg-slate-950/90">
          <TopBar />
          <main className="flex-1 overflow-y-auto p-6 lg:p-10">{children}</main>
        </div>
      </div>
    </div>
  );
}
