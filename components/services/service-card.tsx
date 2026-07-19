import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import type { Service } from "@/lib/services";
import { cn } from "@/lib/utils";

type ServiceCardProps = {
  service: Service;
  className?: string;
};

export function ServiceCard({ service, className }: ServiceCardProps) {
  return (
    <Link
      href={`/services/${service.slug}`}
      className={cn(
        "group flex h-full flex-col overflow-hidden rounded-xl bg-white ring-1 ring-foreground/10 transition duration-300 hover:-translate-y-1 hover:ring-primary/40 focus-ring",
        className
      )}
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-brand-mist">
        <Image
          src={service.image}
          alt={`${service.title} by RL Solutions`}
          fill
          className="object-cover transition duration-500 group-hover:scale-[1.03]"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div>
          <h3 className="text-xl font-semibold tracking-tight text-brand-dark">
            {service.title}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            {service.summary}
          </p>
        </div>
        <span className="mt-auto inline-flex items-center gap-2 text-sm font-medium text-primary">
          Explore service
          <ArrowRight className="size-4 transition group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}
