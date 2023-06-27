import Logo from "public/logo.png";
import Image from "next/image";
import Loginbox from "@/components/Loginbox";
import Link from "next/link";


function LoginPage(): React.ReactElement {
  return (
    <div className="flex items-center justify-center min-h-screen flex-col">
      <div>
        <Image src={Logo} alt="Logo" width={225} height={275} />
      </div>
      <div>
        <Loginbox />
      </div>
      <Link href={"/login/reset"}>
        Unohtuiko salasana?
      </Link>
      <Link href={"/login/register"}>
        Rekisteröidy
      </Link>
    </div>
  );
}

export default LoginPage;
