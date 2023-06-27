import Salasanapalautus from "@/components/Salasanapalautus";


export default function SalasananPalautusPage(): React.ReactElement {

  return (
      <div className="flex items-center min-h-screen flex-col">
      <div>
        <h1 className="text-3xl">Salasanan palautus</h1>
      </div>
      <div>
        <Salasanapalautus/>
      </div>
    </div>
  );
}
