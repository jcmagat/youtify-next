import ServiceGrid from "./ServiceGrid";
import { TransferStepProps } from "@/types/transfer";

export default function SourceStep(props: TransferStepProps) {
  return <ServiceGrid step="source" {...props} />;
}
