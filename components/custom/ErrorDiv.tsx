export default function ErrorDiv({ error }: { error: string }) {
  return (
    <div className="text-xs text-destructive text-start bg-destructive/10 border-2 border-destructive/50 p-2 rounded-lg">
      <p>{error}</p>
    </div>
  );
}
