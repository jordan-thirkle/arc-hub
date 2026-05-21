import * as SelectPrimitive from '@radix-ui/react-select';
import { ChevronDown } from 'lucide-react';

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  value: string;
  onValueChange: (value: string) => void;
  options: SelectOption[];
  placeholder?: string;
  className?: string;
}

export function Select({ value, onValueChange, options, placeholder = 'Select...', className = '' }: SelectProps) {
  return (
    <SelectPrimitive.Root value={value} onValueChange={onValueChange}>
      <SelectPrimitive.Trigger
        className={`px-3 py-1.5 text-[10px] bg-surface border border-[rgb(var(--border-primary))] text-primary focus:outline-none focus:border-accent flex items-center gap-2 min-w-[120px] ${className}`}
        aria-label={placeholder}
      >
        <SelectPrimitive.Value placeholder={placeholder} />
        <SelectPrimitive.Icon className="ml-auto">
          <ChevronDown size={12} />
        </SelectPrimitive.Icon>
      </SelectPrimitive.Trigger>
      <SelectPrimitive.Portal>
        <SelectPrimitive.Content className="z-50 bg-surface border border-[rgb(var(--border-primary))] shadow-elevated min-w-[140px]">
          <SelectPrimitive.Viewport>
            {options.map(opt => (
              <SelectPrimitive.Item
                key={opt.value}
                value={opt.value}
                className="px-3 py-1.5 text-[10px] font-mono text-primary hover:bg-[rgb(var(--bg-elevated))] cursor-pointer data-[highlighted]:bg-[rgb(var(--bg-elevated))] data-[state=checked]:text-accent outline-none"
              >
                <SelectPrimitive.ItemText>{opt.label}</SelectPrimitive.ItemText>
              </SelectPrimitive.Item>
            ))}
          </SelectPrimitive.Viewport>
        </SelectPrimitive.Content>
      </SelectPrimitive.Portal>
    </SelectPrimitive.Root>
  );
}
