import ImageSection from "@/components/default/imageSection/ImageSection.component";
import Qa from "@/components/default/qa/Qa.Component";
import askData from "./ask.db";
import "./style.scss";

const Ask = () => {
  return (
    <section id="Ask">
      <ImageSection
        title="Let's untangle your questions together!"
        animationType="ask"
      >
        <Qa data={askData} />
      </ImageSection>
    </section>
  );
};

export default Ask;
