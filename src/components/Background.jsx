import { useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

const Background = () => {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  if (!init) return <></>;

  return (
    <Particles
      style={{ position: "relative", top: 0, left: 0, width: "100vw", height: "100vh" }}
      id="tsparticles"
      options={{
        background: {
          color: {
            value: "#000000",
          },
        },
        fpsLimit: 30,
        interactivity: {
          detectsOn: "window",
          events: {
            onHover: {
              enable: true,
              mode: "repulse",
            },
            resize: {
              enable: true,
            },
          },
          modes: {
            repulse: {
              distance: 50,
              duration: 2,
            },
          },
        },
        particles: {
          color: {
            value: "#ffffff",
          },
          links: {
            color: "#ffffff",
            distance: 130,
            enable: true,
            opacity: 0.5,
            width: 1,
          },
          move: {
            direction: "none",
            enable: true,
            outModes: {
              default: "bounce",
            },
            random: true,
            speed: 1,
            straight: false,
          },
          number: {
            density: {
              enable: true,
              height: 900,
              width: 900,
            },
            value: 100,
          },
          opacity: {
            value: 0.3,
          },
          shape: {
            type: "triangle",
          },
          size: {
            value: 5,
          },
        },
        detectRetina: true,
      }}
    />
  );
};
export default Background;
