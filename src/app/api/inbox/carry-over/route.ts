import { NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { getDemoUserId } from "@/lib/users/demo-user";

const userId = getDemoUserId();

export async function POST() {
  const supabase = createServerSupabaseClient();
  const now = new Date().toISOString();

  const { error } = await supabase
    .from("inbox_items")
    .update({
      status: "pending",
      carried_over_at: now,
    })
    .eq("user_id", userId)
    .neq("status", "done");

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ carriedOverAt: now });
}
