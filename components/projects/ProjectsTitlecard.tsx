import Noise from "@/components/animation/noise/Noise";
import "./projectsTitlecard.scss";

type Props = {
  img: string;
  title: string;
  desc: string;
};

const ProjectsTitlecard = ({ img, title, desc }: Props) => {
  return (
    <div className="title_container">
      <div className="img_container">
        <img src={img} alt="Gradient Imaeg" />
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
