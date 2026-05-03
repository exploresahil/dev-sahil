import CommonHeader from "@/components/default/commonHeader/CommonHeader.section";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <CommonHeader
        title="Home"
        subTitle="Reduce Animation"
        href="/"
        selectedData="Reduce Motion Sensitivity"
      />
      {children}
    </>
  );
}
