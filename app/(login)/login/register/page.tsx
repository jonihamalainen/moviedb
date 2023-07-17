import Register from "@/components/Register";

export default function RegisterPage(): React.ReactElement {

  return (
      <div className="flex items-center min-h-screen flex-col">
      <div>
        <h1 className="text-3xl">Rekisteröidy</h1>
      </div>
      <div>
        <Register/>
      </div>
    </div>
  );
}
