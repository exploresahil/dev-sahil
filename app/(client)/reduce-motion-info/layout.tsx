import CommonHeader from "@/components/projects/components/header/commonHeader/CommonHeader";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <CommonHeader title="Home" subTitle="Reduce Animation" link="/" />
      {children}
    </>
  );
}
