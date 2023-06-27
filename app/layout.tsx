import "./global.css";

interface Props {
  children: React.ReactNode;
}

export default function RootLayout({ children }: Props) {
  return (
    <html>
      <head />
      <body className="p-3 font-RobotoC bg-white text-black dark:text-white dark:bg-slate-800 min-h-screen">
        {children}
        <p>&copy; Joni H</p>
      </body>
    </html>
  );
}
