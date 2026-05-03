import ComponentHearder from "@/components/projects/components/componentHeader/ComponentHearder.section";

export default function ComponentLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <ComponentHearder />
      {children}
    </>
  );
}
