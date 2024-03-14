import ServiceGrid from "./ServiceGrid";
import { TransferStepProps } from "@/types/transfer";

export default function DestinationStep(props: TransferStepProps) {
  return <ServiceGrid updateKey="destination" {...props} />;
}
