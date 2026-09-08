import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "navy" | "light-blue" | "white";

const file: Record<Variant, string> = {
  navy: "/brand/in2it-ebs-navy.svg",
  "light-blue": "/brand/in2it-ebs-light-blue.svg",
  white: "/brand/in2it-ebs-white.svg",
};

export function Logo({
  variant = "navy",
  className,
  asLink = true,
  priority = false,
}: {
  variant?: Variant;
  className?: string;
  asLink?: boolean;
  priority?: boolean;
}) {
  const img = (
    <Image
      src={file[variant]}
      alt="In2IT EBS — Converged Intelligence"
      width={420}
      height={100}
      priority={priority}
      className={cn("h-9 w-auto", className)}
    />
  );
  if (!asLink) return img;
  return (
    <Link href="/" aria-label="In2IT EBS home" className="inline-flex">
      {img}
    </Link>
  );
}
