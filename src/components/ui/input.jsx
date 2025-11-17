import * as React from "react"

import { cn } from "@/lib/utils"

function Input({
  className,
  type,
  isError,
  isSuccess,
  readOnly,
  error,
  isLoading,
  autoFocus,
  autoComplete,
  ...props
}) {
  return (
    <input
      id={props.id || ''}
      type={type}
      data-slot="input"
      autoFocus={autoFocus}
      autoComplete={autoComplete}
      name={props.name || ''}
      className={cn(
        "file:text-foreground placeholder:text-text/30 placeholder:font-light selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-border-600/80 flex h-10 w-full min-w-0 rounded-lg border bg-transparent px-3 py-1 text-base transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-65 disabled:bg-text/5 md:text-sm",
        "focus-visible:border-ring focus-visible:ring-primary/30 focus-visible:ring-[1px]",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive ",
        isError ? "border-danger/75" : null,
        className
      )}
      {...props} />
  );
}

export { Input }
