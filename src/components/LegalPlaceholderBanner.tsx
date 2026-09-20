export default function LegalPlaceholderBanner({ message }: { message: string }) {
  return (
    <div
      role="alert"
      className="rounded-xl border-2 border-dashed border-red-400 bg-red-50 px-4 py-3 text-sm font-medium text-red-800"
    >
      ⚠ {message}
    </div>
  );
}
