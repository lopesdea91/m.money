import { cn } from "@/utils/utils";

export default function PageTitle({
  label,
  className,
  children,
}: {
  label: string;
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className={cn("flex items-center gap-2 border-b p-4", className)}>
      <h1 className="text-xl font-bold uppercase">{label}</h1>
      {children}
    </div>
  );
}
