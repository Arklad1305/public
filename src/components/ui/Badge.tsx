interface BadgeProps {
  children: React.ReactNode;
  variant?: 'ps4' | 'ps5' | 'primary' | 'secondary' | 'discount' | 'new' | 'key';
}

const variantClasses: Record<string, string> = {
  ps4: 'bg-ps-dark/80 text-blue-200 border-ps-blue/30',
  ps5: 'bg-ps-blue/80 text-white border-ps-light/30',
  primary: 'bg-accent-purple/20 text-purple-300 border-accent-purple/30',
  secondary: 'bg-accent-pink/20 text-pink-300 border-accent-pink/30',
  discount: 'bg-accent-green/20 text-green-300 border-accent-green/30',
  new: 'bg-accent-orange/20 text-orange-300 border-accent-orange/30',
  key: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
};

export default function Badge({ children, variant = 'ps5' }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 text-xs font-semibold rounded border ${variantClasses[variant] ?? variantClasses.ps5}`}
    >
      {children}
    </span>
  );
}
