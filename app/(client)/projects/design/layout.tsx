import CommonHeader from "@/components/projects/components/header/commonHeader/CommonHeader";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <CommonHeader
        title="Projects"
        subTitle="Design"
        link="/projects"
        selectedData="Logo Design"
      />
      {children}
    </>
  );
}
