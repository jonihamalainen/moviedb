import Providers from "@/app/Providers";

interface Props {
  children: React.ReactNode;
}

export default function LoginLayout({ children }: Props) {
  return (
    <Providers>
      <div>{children}</div>
    </Providers>
  );
}
