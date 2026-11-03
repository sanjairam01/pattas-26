"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function TitleSync() {
  const pathname = usePathname();

  useEffect(() => {
    document.title = "PATTAS'26 at MKCE";
  }, [pathname]);

  return null;
}

