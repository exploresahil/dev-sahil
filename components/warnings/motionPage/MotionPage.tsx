import { osInstructions } from "./motionInfo.data";
import "./style.scss";

const MotionPage = () => {
  return (
    <section id="MotionPage">
      <h1>{osInstructions.title}</h1>
      {osInstructions.data.map((data, i) => (
        <div className={`for_${data.id} os`} key={`${data.id}-${i}`}>
          <h2>{data.title}</h2>
          <p>
            {data.descriptionStart} <span>{data.descriptionSpan}</span>
            {data.descriptionEnd}
          </p>
          <h3>Detailed Steps:</h3>
          <ol>
            {data.steps.map((steps, i) => (
              <li key={`${steps.title}-${i}`}>
                <span>{steps.title}</span> {steps.description}
              </li>
            ))}
          </ol>
        </div>
      ))}
      <p>{osInstructions.summery}</p>
    </section>
  );
};

export default MotionPage;
