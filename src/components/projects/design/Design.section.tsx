import Link from "next/link";
import ProjectsTitlecard from "../projectsTitleCard/ProjectsTitlecard.component";
import { brandData } from "./design.db";
import "./style.scss";
import Image from "next/image";
import { ImageSize } from "@/utils/image.util";

const designData = {
  image:
    "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  title: "Design",
  description:
    "Our logo design is a blend of bold typography and minimal design. We believe that a strong visual identity is essential for any brand, and we strive to create a unique and memorable logo that stands out on the web and in print.",
};

const Design = () => {
  return (
    <section id="Design">
      <ProjectsTitlecard
        img={designData.image}
        title={designData.title}
        desc={designData.description}
      />
      <div className="designs">
        {brandData.map((brand, i) => (
          <div key={`${brand.title}-${i}`} className="brans_card">
            <div className="img_container">
              <Image
                fill
                src={brand.image}
                alt={brand.title}
                sizes={ImageSize.card}
              />
            </div>
            <h3>{brand.title}</h3>
            <p>{brand.desc}</p>
            {brand.extLink && (
              <Link href={brand.extLink} target="_blank">
                Visit
              </Link>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Design;
