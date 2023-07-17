import Providers from "@/app/Providers";

interface Props {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: Props) {
  return (
    <Providers>
      <div>{children}</div>
    </Providers>
  );
}
