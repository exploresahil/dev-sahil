import CommonHeader from "@/components/default/commonHeader/CommonHeader.section";

export default function DesignLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <CommonHeader
        title="Projects"
        subTitle="Design"
        href="/projects"
        selectedData="Logo Design"
      />
      {children}
    </>
  );
}
