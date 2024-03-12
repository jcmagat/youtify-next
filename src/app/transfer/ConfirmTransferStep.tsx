import Button from "@/components/Button";
import axios from "axios";
import { TransferData } from "./types";

export default function ConfirmTransferStep({
  source,
  destination,
  playlists,
}: TransferData) {
  const transfer = async () => {
    if (!destination) return;
    if (!playlists || playlists.length === 0) return;

    console.log(playlists);
    const res = await axios.post(
      `https://localhost:8080/playlists/${destination}/create`,
      {
        playlists: playlists,
      },
      {
        withCredentials: true,
      }
    );

    console.log(res.data);
  };

  return (
    <div>
      <Button onClick={transfer} text="Transfer" />
    </div>
  );
}
