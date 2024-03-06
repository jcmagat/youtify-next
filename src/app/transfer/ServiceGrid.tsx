"use client";
import Image from "next/image";
import Link from "next/link";
import { TransferData } from "./types";

enum Service {
  Spotify = "spotify",
  YouTube = "youtube",
}

type ServiceGridProps = {
  updateKey: keyof TransferData;
  updateData: (updatedData: Partial<TransferData>) => void;
};

type ServiceCardProps = ServiceGridProps & {
  service: Service;
};

function ServiceCard({ service, updateKey, updateData }: ServiceCardProps) {
  const clickCard = () => {
    updateData({ [updateKey]: service });
  };

  return (
    // <Link href={`https://localhost:8080/oauth/${service}/login`}>
    <button
      className="bg-primary brightness-150 flex justify-center h-36 w-36 rounded-3xl"
      onClick={clickCard}
    >
      <Image
        src={`/assets/${service}.svg`}
        alt={`${service} logo`}
        height={34}
        width={34 * (559 / 168)}
      />
    </button>
    // </Link>
  );
}

export default function ServiceGrid({
  updateKey,
  updateData,
}: ServiceGridProps) {
  return (
    <div className="grid grid-cols-2 gap-8 pt-8">
      {Object.keys(Service).map((serviceKey) => (
        <ServiceCard
          key={serviceKey}
          service={Service[serviceKey as keyof typeof Service]}
          updateKey={updateKey}
          updateData={updateData}
        />
      ))}
    </div>
  );
}
