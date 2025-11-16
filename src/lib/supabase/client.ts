"use client";

import { createClient } from "@supabase/supabase-js";

export function createBrowserSupabaseClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) {
    console.warn(
      "Supabase 환경변수가 설정되지 않았습니다. .env.local 파일을 확인하세요.",
    );
    return null;
  }

  return createClient(url, key, {
    global: { headers: { "x-client-info": "dumping-app" } },
  });
}
