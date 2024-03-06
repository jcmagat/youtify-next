import { ReactNode } from "react";

export default function FormWrapper(title: string, children: ReactNode) {
  return (
    <div className="bg-primary text-secondary flex flex-col items-center gap-4">
      <h1 className="text-5xl font-bold">{title}</h1>

      {children}
    </div>
  );
}
