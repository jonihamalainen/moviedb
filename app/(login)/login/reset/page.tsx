import Salasanareset from "@/components/Salasanareset";

export default async function ResetPage(): Promise<React.ReactElement> {
  return (
      <div className="flex items-center min-h-screen flex-col">
      <div>
        <h1 className="text-3xl">Salasanan palautus</h1>
      </div>
      <div>
        <Salasanareset/>
      </div>
    </div>
  );
}
