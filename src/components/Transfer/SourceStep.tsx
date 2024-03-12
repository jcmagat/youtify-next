import ServiceGrid from "./ServiceGrid";
import { TransferData } from "@/types/transfer";

type SourceStepProps = {
  updateData: (data: Partial<TransferData>) => void;
};

export default function SourceStep({ updateData }: SourceStepProps) {
  return <ServiceGrid updateKey="source" updateData={updateData} />;
}
