import { ImageSize } from "@/utils/image.util";
import ProjectWarning from "../../warning/ProjectWarning";
import { teamMembers } from "./teamMember.db";
import "./style.scss";

const HoverImageSlideMenu = () => {
  return (
    <section id="HoverImageSlideMenu">
      <ProjectWarning type="responsive" />
      <div className="menu_container">
        <h1>Team</h1>
        <div className="team_container">
          <ul>
            {teamMembers.map((member) => (
              <li key={member.name}>
                <h5>{member.name}</h5>
                <div className="img_container">
                  <img
                    src={member.image}
                    alt={member.altText}
                    sizes={ImageSize.card}
                  />
                </div>
                <h5>{member.surname}</h5>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default HoverImageSlideMenu;
