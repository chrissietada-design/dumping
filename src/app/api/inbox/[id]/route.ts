import { NextRequest, NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { getDemoUserId } from "@/lib/users/demo-user";
import type { InboxStatus } from "@/types/inbox";

const userId = getDemoUserId();

export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  const supabase = createServerSupabaseClient();
  const body = await request.json();
  const status = body?.status as InboxStatus | undefined;
  const { id } = await context.params;

  if (!status) {
    return NextResponse.json({ error: "상태가 필요합니다." }, { status: 400 });
  }

  const allowed: InboxStatus[] = ["pending", "scheduled", "done"];
  if (!allowed.includes(status)) {
    return NextResponse.json({ error: "잘못된 상태 값입니다." }, { status: 400 });
  }

  const { data, error } = await supabase
    .from("inbox_items")
    .update({ status })
    .eq("id", id)
    .eq("user_id", userId)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ item: data });
}
