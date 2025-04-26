import { componentsData, componentsType } from "@/database/components";
import { use } from "react";

type Props = {
  params: Promise<{ component: string }>;
};

const page = ({ params }: Props) => {
  const { component: slug } = use(params);
  const data = componentsData
    .filter((v: componentsType) => v.slug == slug)
    .at(0);

  if (!data)
    return (
      <main>
        <p>No Data</p>
      </main>
    );

  return (
    <main>
      <data.component />
    </main>
  );
};

export default page;
