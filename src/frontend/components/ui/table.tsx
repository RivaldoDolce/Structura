import * as React from "react";
import { cn } from "@/frontend/lib/cn";

function Table({ className, ...props }: React.ComponentProps<"table">) {
  return (
    <div className="relative w-full overflow-x-auto">
      <table className={cn("text-small text-ink w-full caption-bottom", className)} {...props} />
    </div>
  );
}

function TableHeader({ className, ...props }: React.ComponentProps<"thead">) {
  return <thead className={cn("border-line border-b", className)} {...props} />;
}

function TableBody({ className, ...props }: React.ComponentProps<"tbody">) {
  return <tbody className={cn("divide-line divide-y", className)} {...props} />;
}

function TableFooter({ className, ...props }: React.ComponentProps<"tfoot">) {
  return <tfoot className={cn("border-line bg-elevated border-t", className)} {...props} />;
}

function TableRow({ className, ...props }: React.ComponentProps<"tr">) {
  return <tr className={cn("hover:bg-elevated/60 transition-colors", className)} {...props} />;
}

function TableHead({ className, ...props }: React.ComponentProps<"th">) {
  return (
    <th
      scope="col"
      className={cn(
        "text-mono-xs text-ink-mute h-11 px-4 text-left align-middle font-mono uppercase",
        className
      )}
      {...props}
    />
  );
}

function TableCell({ className, ...props }: React.ComponentProps<"td">) {
  return <td className={cn("px-4 py-3 align-middle", className)} {...props} />;
}

function TableCaption({ className, ...props }: React.ComponentProps<"caption">) {
  return <caption className={cn("text-small text-ink-soft mt-4", className)} {...props} />;
}

export { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow };
