import ServiceGrid from "./ServiceGrid";
import { TransferData } from "./types";

type DestinationStepProps = {
  updateData: (data: Partial<TransferData>) => void;
};

export default function DestinationStep({ updateData }: DestinationStepProps) {
  return <ServiceGrid updateKey="destination" updateData={updateData} />;
}
