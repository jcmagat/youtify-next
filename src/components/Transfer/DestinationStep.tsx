import ServiceGrid from "./ServiceGrid";
import { TransferData } from "@/types/transfer";

type DestinationStepProps = TransferData & {
  updateData: (data: Partial<TransferData>) => void;
};

export default function DestinationStep({
  source,
  destination,
  updateData,
}: DestinationStepProps) {
  return (
    <ServiceGrid
      updateKey="destination"
      source={source}
      destination={destination}
      updateData={updateData}
    />
  );
}
