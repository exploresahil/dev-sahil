import { Suspense } from "react";
import {
  type ComponentsType,
  componentsData,
} from "@/components/projects/components/components.db";

type Props = {
  params: Promise<{ component: string }>;
};

const page = async ({ params }: Props) => {
  const { component: slug } = await params;
  const data = componentsData.find((v: ComponentsType) => v.slug === slug);

  if (!data)
    return (
      <main>
        <p>No Data</p>
      </main>
    );

  return (
    <Suspense fallback={<div>Loading...</div>}>
      {data.component && <data.component />}
    </Suspense>
  );
};

export default page;
