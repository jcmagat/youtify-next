"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import { TransferData, Service } from "@/types/transfer";

type ServiceGridProps = Omit<TransferData, "playlists"> & {
  updateKey: keyof Omit<TransferData, "playlists">;
  updateData: (updatedData: Partial<TransferData>) => void;
};

type ServiceCardProps = ServiceGridProps & {
  service: Service;
};

function ServiceCard({
  service,
  source,
  destination,
  updateKey,
  updateData,
}: ServiceCardProps) {
  const [isSource, setIsSource] = useState(false);
  const [isDestination, setIsDestination] = useState(false);

  useEffect(() => {
    setIsSource(service === source);
    setIsDestination(service === destination);
  }, [service, source, destination]);

  const clickCard = async () => {
    updateData({ [updateKey]: service });

    try {
      const status_res = await axios.get(
        `https://localhost:8080/oauth/${service}/status`,
        {
          withCredentials: true,
        }
      );

      // If already logged in, don't attempt to login again
      if (status_res.data.is_logged_in) return;

      const login_res = await axios.get(
        `https://localhost:8080/oauth/${service}/login`,
        {
          withCredentials: true,
        }
      );

      const auth_url = login_res.data.auth_url;
      if (auth_url)
        window.open(
          login_res.data.auth_url,
          "oauth",
          "popup=true,width=500,height=720"
        );
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div
      className={`relative h-36 w-36 rounded-3xl shadow-lg overflow-hidden
      ${isSource || isDestination ? "border-4 border-secondary" : ""}`}
    >
      <h1
        className={`absolute left-1/2 -translate-x-1/2 text-xs leading-none select-none
        ${
          isSource || isDestination
            ? "bg-secondary text-primary px-1 pb-1 rounded-b-md"
            : ""
        }`}
      >
        {isSource ? "Source" : isDestination ? "Destination" : ""}
      </h1>

      <button
        className="flex justify-center items-center h-full w-full"
        disabled={updateKey === "destination" && service === source}
        onClick={clickCard}
      >
        <Image
          src={`/assets/${service}.svg`}
          alt={`${service} logo`}
          height={34}
          width={34 * (559 / 168)}
        />
      </button>
    </div>
  );
}

export default function ServiceGrid(props: ServiceGridProps) {
  return (
    <div className="grid grid-cols-2 gap-8 pt-8">
      {Object.keys(Service).map(
        (serviceKey) =>
          serviceKey !== "None" && (
            <ServiceCard
              key={serviceKey}
              service={Service[serviceKey as keyof typeof Service]}
              {...props}
            />
          )
      )}
    </div>
  );
}
