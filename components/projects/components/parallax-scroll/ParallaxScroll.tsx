"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import "./style.scss";

const imagesData = {
  img1: "https://images.unsplash.com/photo-1561901272-531c936c9b85?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8d2VzJTIwYW5kZXJzb258ZW58MHx8MHx8fDA%3D",
  img2: "https://images.unsplash.com/photo-1633118920370-01c8e343cca8?q=80&w=1972&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  img3: "https://images.unsplash.com/photo-1698341286246-bca2f2deb7fa?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fHdlcyUyMGFuZGVyc29ufGVufDB8fDB8fHww",
  img4: "https://images.unsplash.com/photo-1707053322060-5aeb735ce267?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzV8fHdlcyUyMGFuZGVyc29ufGVufDB8fDB8fHww",
  img5: "https://images.unsplash.com/photo-1691490996255-462399e356bf?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8d2VzJTIwYW5kZXJzb258ZW58MHwxfDB8fHww",
  img6: "https://images.unsplash.com/photo-1682234833754-a5debf56f8db?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjh8fHdlcyUyMGFuZGVyc29ufGVufDB8MXwwfHx8MA%3D%3D",
};

const ParallaxScroll = () => {
  const container = useRef<HTMLDivElement>(null);

  gsap.registerPlugin(useGSAP);
  gsap.registerPlugin(ScrollTrigger);

  useGSAP(
    () => {
      gsap.fromTo(
        ".img1",
        {
          y: 0,
        },
        {
          y: -50,
          scrollTrigger: {
            trigger: container.current,
            start: "top 40%",
            end: "100% 50%",
            scrub: true,
            markers: false,
          },
        }
      );

      gsap.fromTo(
        ".img1 img",
        {
          objectPosition: "50% 50%",
        },
        {
          objectPosition: "50% 100%",
          ease: "power1.inOut",
          scrollTrigger: {
            trigger: container.current,
            start: "top 40%",
            end: "20% 50%",
            scrub: true,
            markers: false,
          },
        }
      );

      gsap.fromTo(
        ".img2",
        {
          y: 0,
        },
        {
          y: 20,
          scrollTrigger: {
            trigger: container.current,
            start: "top 40%",
            end: "100% 50%",
            scrub: true,
            markers: false,
          },
        }
      );

      gsap.fromTo(
        ".img2 img",
        {
          objectPosition: "50% 100%",
        },
        {
          objectPosition: "50% 0%",
          ease: "power1.inOut",
          scrollTrigger: {
            trigger: container.current,
            start: "-10% 40%",
            end: "60% 50%",
            scrub: true,
            markers: false,
          },
        }
      );

      gsap.fromTo(
        ".img3",
        {
          y: 50,
        },
        {
          y: -20,
          scrollTrigger: {
            trigger: container.current,
            start: "top 40%",
            end: "100% 50%",
            scrub: true,
            markers: false,
          },
        }
      );

      gsap.fromTo(
        ".img3 img",
        {
          objectPosition: "50% 0%",
        },
        {
          objectPosition: "50% 100%",
          ease: "power1.inOut",
          scrollTrigger: {
            trigger: container.current,
            start: "0% 45%",
            end: "80% 50%",
            scrub: true,
            markers: false,
          },
        }
      );

      gsap.fromTo(
        ".img4",
        {
          y: -50,
        },
        {
          y: 0,
          scrollTrigger: {
            trigger: container.current,
            start: "top 40%",
            end: "100% 0%",
            scrub: true,
            markers: false,
          },
        }
      );

      gsap.fromTo(
        ".img4 img",
        {
          objectPosition: "50% 100%",
        },
        {
          objectPosition: "50% 0%",
          ease: "power1.inOut",
          scrollTrigger: {
            trigger: container.current,
            start: "0% 45%",
            end: "90% 50%",
            scrub: true,
            markers: false,
          },
        }
      );

      gsap.fromTo(
        ".img5",
        {
          y: 40,
        },
        {
          y: -40,
          scrollTrigger: {
            trigger: container.current,
            start: "top 40%",
            end: "100% 0%",
            scrub: true,
            markers: false,
          },
        }
      );

      gsap.fromTo(
        ".img5 img",
        {
          objectPosition: "50% 0%",
        },
        {
          objectPosition: "50% 100%",
          ease: "power1.inOut",
          scrollTrigger: {
            trigger: container.current,
            start: "0% 45%",
            end: "100% 50%",
            scrub: true,
            markers: false,
          },
        }
      );

      gsap.fromTo(
        ".img6",
        {
          y: 100,
        },
        {
          y: 0,
          scrollTrigger: {
            trigger: container.current,
            start: "top 40%",
            end: "100% 80%",
            scrub: true,
            markers: false,
          },
        }
      );

      gsap.fromTo(
        ".img6 img",
        {
          objectPosition: "50% 100%",
        },
        {
          objectPosition: "50% 0%",
          ease: "power1.inOut",
          scrollTrigger: {
            trigger: container.current,
            start: "40% 45%",
            end: "100% 50%",
            scrub: true,
            markers: false,
          },
        }
      );
    },

    { scope: container }
  );

  return (
    <section id="ParallaxScroll">
      <div className="title">
        <h1>Explore Wes Anderson Inspired Gallary</h1>
      </div>
      <div className="images_container" ref={container}>
        <div className="image img1">
          <img src={imagesData.img1} alt="wes anderson inspired image" />
        </div>
        <div className="image img2">
          <img src={imagesData.img2} alt="wes anderson inspired image" />
        </div>
        <div className="image img3">
          <img src={imagesData.img3} alt="wes anderson inspired image" />
        </div>
        <div className="image img4">
          <img src={imagesData.img4} alt="wes anderson inspired image" />
        </div>
        <div className="image img5">
          <img src={imagesData.img5} alt="wes anderson inspired image" />
        </div>
        <div className="image img6">
          <img src={imagesData.img6} alt="wes anderson inspired image" />
        </div>
      </div>
    </section>
  );
};

export default ParallaxScroll;
