import ImageSection from "@/components/default/imageSection/ImageSection.component";
import "./style.scss";
import Qa from "@/components/default/qa/Qa.Component";
import WorkflowData from "./workflow.db";

const Workflow = () => {
  return (
    <section id="Workflow">
      <ImageSection title="Workflow" variant="right" animationType="workflow">
        <Qa data={WorkflowData} />
      </ImageSection>
    </section>
  );
};

export default Workflow;
