"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import { TransferData, Service, TransferStepProps } from "@/types/transfer";

type ServiceGridProps = TransferStepProps & {
  step: keyof Omit<TransferData, "playlists">;
};

type ServiceCardProps = ServiceGridProps & {
  service: Service;
};

function ServiceCard({
  service,
  step,
  source,
  destination,
  updateData,
  stepForward,
}: ServiceCardProps) {
  const [isSource, setIsSource] = useState(false);
  const [isDestination, setIsDestination] = useState(false);

  useEffect(() => {
    setIsSource(service === source);
    setIsDestination(service === destination);
  }, [service, source, destination]);

  const clickCard = async () => {
    if (step === "destination" && service === source) return;
    if (step === "source" && destination !== Service.None)
      updateData({ destination: Service.None });

    updateData({ [step]: service });

    try {
      const status_res = await axios.get(`/api/oauth/${service}/status`, {
        withCredentials: true,
      });

      // If already logged in, don't attempt to login again
      if (status_res.data.is_logged_in) return stepForward();

      const login_res = await axios.get(`/api/oauth/${service}/login`, {
        withCredentials: true,
      });

      const auth_url = login_res.data.auth_url;
      if (auth_url)
        window.open(
          login_res.data.auth_url,
          "oauth",
          "popup=true,width=500,height=720"
        );

      // ********** TODO: stepForward after successful login **********
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <button
      className={`relative h-36 w-36 rounded-3xl shadow-lg overflow-hidden bg-primary
        ${isSource || isDestination ? "border-4 border-accent" : ""}`}
      disabled={step === "destination" && service === source}
      onClick={clickCard}
    >
      <h1
        className={`absolute left-1/2 -translate-x-1/2 text-xs leading-none select-none z-10
        ${
          isSource || isDestination
            ? "bg-accent text-primary px-2 pb-1 rounded-b-md"
            : ""
        }`}
      >
        {isSource ? "Source" : isDestination ? "Destination" : ""}
      </h1>

      <div className="relative h-full w-28 left-1/2 -translate-x-1/2">
        <Image src={`/assets/${service}.svg`} alt={`${service} logo`} fill />
      </div>
    </button>
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
