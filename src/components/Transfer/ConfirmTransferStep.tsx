import Button from "@/components/Button";
import axios from "axios";
import { TransferStepProps } from "@/types/transfer";

export default function ConfirmTransferStep({
  source,
  destination,
  playlists,
}: Omit<TransferStepProps, "updateData" | "stepForward">) {
  const transfer = async () => {
    if (!source || !destination || source === destination) return;
    if (!playlists || playlists.length === 0) return;

    try {
      const res = await axios.post(
        `/api/playlists/${destination}/create`,
        {
          playlists: playlists,
        },
        {
          withCredentials: true,
        }
      );

      // TODO: show success
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center gap-2">
      <h1>
        Transfering from {source} to {destination}
      </h1>

      <p>{playlists.length} playlists</p>

      <Button onClick={transfer} text="Transfer" />
    </div>
  );
}
