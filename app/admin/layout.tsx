export default function AdminChromeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-[60vh] border-t border-black/10 bg-white">
      {children}
    </div>
  );
}
