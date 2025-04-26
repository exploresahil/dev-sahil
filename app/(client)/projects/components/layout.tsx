import ComponentHeader from "@/components/projects/components/header/ComponentHeader";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <ComponentHeader />
      {children}
    </>
  );
}
