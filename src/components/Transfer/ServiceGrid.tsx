"use client";
import Image from "next/image";
import Link from "next/link";

type ServiceCardProps = {
  service: string;
};

function ServiceCard(props: ServiceCardProps) {
  const { service } = props;

  return (
    <Link href={`https://localhost:8080/oauth/${service}/login`}>
      <button className="bg-primary brightness-150 flex justify-center h-36 w-36 rounded-3xl">
        <Image
          src={`/assets/${service}.svg`}
          alt={`${service} image`}
          height={34}
          width={34 * (559 / 168)}
        />
      </button>
    </Link>
  );
}

export default function ServiceGrid() {
  return (
    <div className="grid grid-cols-2 gap-8 pt-8">
      <ServiceCard service="spotify" />
      <ServiceCard service="youtube" />
    </div>
  );
}
