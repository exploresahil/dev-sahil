import Image from "next/image";
import Noise from "@/components/animations/noise/Noise";
import { ImageSize } from "@/utils/image.util";
import "./style.scss";

type Props = {
  img: string;
  title: string;
  desc: string;
};

const ProjectsTitlecard = ({ img, title, desc }: Props) => {
  return (
    <div className="title_container">
      <div className="img_container">
        <Image src={img} fill sizes={ImageSize.banner} alt="Gradient Imaeg" />
        <Noise />
        <div className="text">
          <h2>{title}</h2>
          <p>{desc}</p>
        </div>
      </div>
    </div>
  );
};

export default ProjectsTitlecard;
