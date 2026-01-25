import { Link2, CopyIcon, EyeIcon } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";

export function UrlList() {
  return (
    <div>
      <h2 className="text-text-2xl font-medium tracking-wide">Url List</h2>
      <ul className="space-y-2">
        <li className="flex  items-center justify-between gap-20  w-full">
          <Link href="https://google.com" target="_blank">
            https://google.com
          </Link>

          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon">
              <CopyIcon />
            </Button>

            <span className="flex items-center gap-2">
              <EyeIcon />
              <span>200 views</span>
            </span>
          </div>
        </li>
      </ul>
    </div>
  );
}
