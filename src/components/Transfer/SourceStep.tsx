import ServiceGrid from "./ServiceGrid";
import { TransferData } from "@/types/transfer";

type SourceStepProps = TransferData & {
  updateData: (data: Partial<TransferData>) => void;
};

export default function SourceStep({
  source,
  destination,
  updateData,
}: SourceStepProps) {
  return (
    <ServiceGrid
      updateKey="source"
      source={source}
      destination={destination}
      updateData={updateData}
    />
  );
}
