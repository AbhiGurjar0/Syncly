import { cn } from "../lib/utils";

interface ProgressBarProps {
  value: number;
  max?: number;
  className?: string;
  gradient?: string;
  size?: "sm" | "md";
}

export function ProgressBar({ value, max = 100, className, gradient = "gradient-primary", size = "sm" }: ProgressBarProps) {
  const percent = Math.min((value / max) * 100, 100);

  return (
    <div className={cn("w-full bg-muted rounded-full overflow-hidden", size === "sm" ? "h-1.5" : "h-2.5", className)}>
      <div
        className={cn("h-full rounded-full transition-all duration-700 ease-out", gradient)}
        style={{ width: `${percent}%` }}
      />
    </div>
  );
}