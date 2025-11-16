export function getDemoUserId() {
  return (
    process.env.DUMPING_DEMO_USER_ID ?? "00000000-0000-0000-0000-000000000000"
  );
}
