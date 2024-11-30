interface LoadingSpinnerProps {
  color?: string;
  size?: number;
}

export function LoadingSpinner({
  color,
  size,
}: LoadingSpinnerProps) {
  return (
    <div
      className={`animate-spin rounded-full 
        h-${size} w-${size} 
        border-2 
        border-${color}
        border-t-transparent`}
    />
  );
}
