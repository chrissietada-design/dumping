import { NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { getDemoUserId } from "@/lib/users/demo-user";
import type { InboxItem } from "@/types/inbox";

const userId = getDemoUserId();

type InboxRow = {
  id: string;
  user_id: string;
  content: string;
  status: string;
  created_at: string;
  updated_at: string;
  carried_over_at: string | null;
};

function normalizeItems(data: InboxRow[]): InboxItem[] {
  return data.map((item) => ({
    id: item.id,
    userId: item.user_id,
    content: item.content,
    status: item.status as InboxItem["status"],
    createdAt: item.created_at,
    updatedAt: item.updated_at,
    carriedOverAt: item.carried_over_at ?? undefined,
  }));
}

export async function GET() {
  const supabase = createServerSupabaseClient();
  const { data, error } = await supabase
    .from("inbox_items")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 },
    );
  }

  return NextResponse.json({ items: normalizeItems(data ?? []) });
}

export async function POST(request: Request) {
  const supabase = createServerSupabaseClient();
  const body = await request.json();
  const content = (body?.content ?? "").trim();

  if (!content) {
    return NextResponse.json(
      { error: "내용을 입력해주세요." },
      { status: 400 },
    );
  }

  const { data, error } = await supabase
    .from("inbox_items")
    .insert({
      content,
      user_id: userId,
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 },
    );
  }

  return NextResponse.json({ item: normalizeItems([data])[0] });
}
