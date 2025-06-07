import React from "react";

export function Card({ children }) {
  return <div className="rounded-xl border p-4 bg-white shadow">{children}</div>;
}

export function CardContent({ children }) {
  return <div className="mt-2">{children}</div>;
}
