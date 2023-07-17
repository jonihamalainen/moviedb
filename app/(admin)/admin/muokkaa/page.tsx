import Muokkaaelokuva from "@/components/Muokkaaelokuva";
import TakaisinNappi from "@/components/TakaisinNappi";
import Link from "next/link";

function muokkaaPage(): React.ReactElement {
  return (
    <div className="flex items-center justify-center min-h-screen flex-col">
      <h1 className="text-3xl">Muokkaa elokuvaa</h1>
      <Muokkaaelokuva/>
      <Link href="/admin">
            <TakaisinNappi/>
      </Link>
    </div>
  );
}

export default muokkaaPage;
