import DesignHeader from "@/components/projects/design/header/DesignHeader";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <DesignHeader />
      {children}
    </>
  );
}
