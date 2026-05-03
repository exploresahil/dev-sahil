"use client";

import {
  ArrowUpFromLine,
  Pause,
  Play,
  SquarePen,
  Volume2,
  VolumeX,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import "./style.scss";
import { OrbitControls } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import useResponsive from "@/hooks/useResponsive.hook";

// ── THREE.Clock deprecation suppressor ────────────────────────────────────────
// three.js ≥ r170 deprecated Clock in favour of Timer, but @react-three/fiber
// still creates `new THREE.Clock()` internally (fix is pending upstream).
// This intercept drops only that specific warning; every other warn passes through.
if (globalThis.window !== undefined) {
  const _warn = console.warn.bind(console);
  console.warn = (...args: unknown[]) => {
    if (typeof args[0] === "string" && args[0].includes("THREE.Clock:")) return;
    _warn(...args);
  };
}

// ─── 3-D bar visualizer ───────────────────────────────────────────────────────

const BAR_COUNT = 64;

interface BarsProps {
  analyserRef: React.RefObject<AnalyserNode | null>;
  sensitivity: number;
  color: string;
}

const Bars = ({ analyserRef, sensitivity, color }: BarsProps) => {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dataArray = useRef(new Uint8Array(BAR_COUNT));
  const dummy = useRef(new THREE.Object3D());
  const threeColor = useRef(new THREE.Color(color));

  // keep colour in sync without remounting
  useEffect(() => {
    threeColor.current.set(color);
    if (meshRef.current) {
      for (let i = 0; i < BAR_COUNT; i++) {
        meshRef.current.setColorAt(i, threeColor.current);
      }
      if (meshRef.current.instanceColor) {
        meshRef.current.instanceColor.needsUpdate = true;
      }
    }
  }, [color]);

  useFrame(() => {
    const mesh = meshRef.current;
    const analyser = analyserRef.current;
    if (!mesh || !analyser) return;

    analyser.getByteFrequencyData(dataArray.current);

    const totalWidth = BAR_COUNT * 0.18;
    const startX = -totalWidth / 2;

    for (let i = 0; i < BAR_COUNT; i++) {
      const normalised = dataArray.current[i] / 255;
      const scaleY = Math.max(0.01, normalised * sensitivity * 6);
      const x = startX + i * 0.18;

      dummy.current.position.set(x, scaleY / 2 - 1.5, 0);
      dummy.current.scale.set(0.14, scaleY, 1); // z=1 — no depth on a plane
      dummy.current.updateMatrix();
      mesh.setMatrixAt(i, dummy.current.matrix);
    }

    mesh.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, BAR_COUNT]}>
      <planeGeometry args={[1, 1]} />
      <meshBasicMaterial color={color} />
    </instancedMesh>
  );
};

// ─── 3-D wave visualizer ─────────────────────────────────────────────────────

interface WaveProps {
  analyserRef: React.RefObject<AnalyserNode | null>;
  sensitivity: number;
  color: string;
}

export const Wave = ({ analyserRef, sensitivity, color }: WaveProps) => {
  const lineRef = useRef<THREE.Line>(null);
  const geoRef = useRef<THREE.BufferGeometry>(null);
  const dataArray = useRef(new Uint8Array(BAR_COUNT));

  const initialPositions = useMemo(() => new Float32Array(BAR_COUNT * 3), []);

  useFrame(() => {
    const analyser = analyserRef.current;
    const geo = geoRef.current;

    if (!analyser || !geo) return;

    analyser.getByteFrequencyData(dataArray.current);

    const totalWidth = 10;
    const startX = -totalWidth / 2;
    const step = totalWidth / (BAR_COUNT - 1);

    const posAttr = geo.attributes.position;
    const positions = posAttr.array as Float32Array;

    for (let i = 0; i < BAR_COUNT; i++) {
      const normalised = dataArray.current[i] / 255;
      const x = startX + i * step;
      const y = normalised * sensitivity * 4 - 1.5;

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = 0;
    }

    posAttr.needsUpdate = true;
  });

  return (
    // @ts-expect-error — primitive line is valid R3F JSX
    <line ref={lineRef}>
      <bufferGeometry ref={geoRef}>
        {/* Pass constructor arguments via 'args' */}
        <bufferAttribute
          attach="attributes-position"
          args={[initialPositions, 3]}
          usage={THREE.DynamicDrawUsage}
        />
      </bufferGeometry>
      <lineBasicMaterial color={color} linewidth={2} />
    </line>
  );
};

// ─── 3-D Cube / terrain visualizer ───────────────────────────────────────────

const CUBE_COLS = 32; // freq bins across X
const CUBE_ROWS = 16; // depth slices along Z

interface CubeTerrainProps {
  analyserRef: React.RefObject<AnalyserNode | null>;
  sensitivity: number;
  color: string;
}

const CubeTerrain = ({ analyserRef, sensitivity, color }: CubeTerrainProps) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const dataArray = useRef(new Uint8Array(BAR_COUNT));

  const geometry = useMemo(() => {
    const geo = new THREE.PlaneGeometry(6, 4, CUBE_COLS - 1, CUBE_ROWS - 1);
    geo.rotateX(-Math.PI / 2);
    return geo;
  }, []);

  useFrame(() => {
    const analyser = analyserRef.current;
    const mesh = meshRef.current;
    if (!analyser || !mesh) return;

    analyser.getByteFrequencyData(dataArray.current);

    const pos = mesh.geometry.attributes.position;
    const vertCount = CUBE_COLS * CUBE_ROWS;

    for (let v = 0; v < vertCount; v++) {
      const col = v % CUBE_COLS;
      const row = Math.floor(v / CUBE_COLS);
      const freqIndex = Math.floor((col / CUBE_COLS) * BAR_COUNT);
      const normalised = dataArray.current[freqIndex] / 255;
      // rows further back get less amplitude — depth attenuation
      const rowFactor = 0.25 + 0.75 * (row / (CUBE_ROWS - 1));
      pos.setY(v, normalised * sensitivity * 3.5 * rowFactor);
    }

    pos.needsUpdate = true;
    mesh.geometry.computeVertexNormals();
  });

  return (
    <mesh ref={meshRef} geometry={geometry} position={[0, -1.5, 0]}>
      <meshStandardMaterial
        color={color}
        side={THREE.DoubleSide}
        roughness={0.5}
        metalness={0.4}
      />
    </mesh>
  );
};

// ─── Outer wireframe cube ─────────────────────────────────────────────────────

const CubeFrame = () => {
  const edges = useMemo(
    () => new THREE.EdgesGeometry(new THREE.BoxGeometry(7.4, 5, 5)),
    [],
  );
  return (
    <lineSegments geometry={edges} position={[0, 0.3, 0]}>
      <lineBasicMaterial color="#ffffff" opacity={0.8} transparent />
    </lineSegments>
  );
};

// ─── Concentric neon floor rings ──────────────────────────────────────────────

const RING_COUNT = 10;

const ConcentricRings = ({ color }: { color: string }) => {
  // Pre-build ring geometries once; include a stable id so the key is not the map index
  const ringData = useMemo(
    () =>
      Array.from({ length: RING_COUNT }, (_, i) => {
        const scale = 1 - i * 0.07;
        const hw = 3.4 * scale;
        const hd = 2.3 * scale;
        const y = -1.5 + i * 0.14;
        const pts = [
          new THREE.Vector3(-hw, y, -hd),
          new THREE.Vector3(hw, y, -hd),
          new THREE.Vector3(hw, y, hd),
          new THREE.Vector3(-hw, y, hd),
          new THREE.Vector3(-hw, y, -hd),
        ];
        return {
          id: `ring-y${y.toFixed(3)}`,
          geo: new THREE.BufferGeometry().setFromPoints(pts),
          // gradient: fiery orange at base → user colour → cool violet at top
          ringColor:
            i === 0 ? "#ff5500" : i < 3 ? color : i < 7 ? "#aa44ff" : "#3399ff",
          opacity: 1 - (i / RING_COUNT) * 0.55,
        };
      }),
    [color],
  );

  return (
    <>
      {ringData.map(({ id, geo, ringColor, opacity }) => (
        // @ts-expect-error — line is valid R3F
        <line key={id} geometry={geo}>
          <lineBasicMaterial color={ringColor} opacity={opacity} transparent />
        </line>
      ))}
    </>
  );
};

// ─── Shared canvas wrapper ────────────────────────────────────────────────────

interface VisualizerCanvasProps {
  analyserRef: React.RefObject<AnalyserNode | null>;
  sensitivity: number;
  color: string;
  mode: "bar" | "wave" | "cube";
}

const VisualizerCanvas = ({
  analyserRef,
  sensitivity,
  color,
  mode,
}: VisualizerCanvasProps) => {
  const [isReady, setIsReady] = useState(false);
  const isCube = mode === "cube";

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      {/* Loading overlay — visible until WebGL context is ready */}
      {!isReady && (
        <div className="canvas_loading">
          <span>Loading 3D scene…</span>
        </div>
      )}

      <Canvas
        onCreated={() => setIsReady(true)}
        camera={{
          position: isCube ? [7, 5.5, 7] : [0, 0, 8],
          fov: isCube ? 42 : 50,
        }}
        style={{
          width: "100%",
          height: "100%",
          opacity: isReady ? 1 : 0,
          transition: "opacity 0.35s ease",
        }}
        gl={{ antialias: true }}
      >
        <ambientLight intensity={isCube ? 0.3 : 0.6} />
        <directionalLight position={[5, 5, 5]} intensity={isCube ? 0.8 : 1} />
        {isCube && (
          <pointLight
            position={[0, 4, 0]}
            color={color}
            intensity={2}
            distance={12}
          />
        )}

        {mode === "bar" && (
          <Bars
            analyserRef={analyserRef}
            sensitivity={sensitivity}
            color={color}
          />
        )}
        {mode === "wave" && (
          <Wave
            analyserRef={analyserRef}
            sensitivity={sensitivity}
            color={color}
          />
        )}
        {mode === "cube" && (
          <>
            <CubeFrame />
            <CubeTerrain
              analyserRef={analyserRef}
              sensitivity={sensitivity}
              color={color}
            />
            <ConcentricRings color={color} />
          </>
        )}

        <OrbitControls
          enablePan={false}
          enableZoom={false}
          autoRotate={isCube}
          autoRotateSpeed={0.6}
          enableRotate={isCube}
        />
      </Canvas>
    </div>
  );
};

// ─── Main component ───────────────────────────────────────────────────────────

const AudioVisualizer = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const sourceRef = useRef<MediaElementAudioSourceNode | null>(null);

  const [audioSrc, setAudioSrc] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [sensitivity, setSensitivity] = useState<number>(0.5);
  const [barColor, setBarColor] = useState<string>("#d92e1c");
  const [visualMode, setVisualMode] = useState<"bar" | "wave" | "cube">("bar");

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);

  const { isMounted } = useResponsive();

  // ── Audio context wiring ──────────────────────────────────────────────────
  useEffect(() => {
    if (!audioSrc || !audioRef.current) return;

    const audio = audioRef.current;

    if (!audioContextRef.current) {
      audioContextRef.current = new (
        globalThis.AudioContext ||
        // biome-ignore lint/suspicious/noExplicitAny: vendor prefix
        (globalThis as any).webkitAudioContext
      )();
    }

    if (!analyserRef.current) {
      analyserRef.current = audioContextRef.current.createAnalyser();
      analyserRef.current.fftSize = BAR_COUNT * 2;
    }

    if (!sourceRef.current) {
      sourceRef.current =
        audioContextRef.current.createMediaElementSource(audio);
      sourceRef.current.connect(analyserRef.current);
      analyserRef.current.connect(audioContextRef.current.destination);
    }
  }, [audioSrc]);

  // ── Playback event listeners ──────────────────────────────────────────────
  // biome-ignore lint/correctness/useExhaustiveDependencies: audioRef is a ref
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    setIsMuted(false);

    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    const onEnded = () => setIsPlaying(false);
    const onTimeUpdate = () => setCurrentTime(audio.currentTime);
    const onMetadata = () => setDuration(audio.duration);

    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);
    audio.addEventListener("ended", onEnded);
    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("loadedmetadata", onMetadata);

    return () => {
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
      audio.removeEventListener("ended", onEnded);
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("loadedmetadata", onMetadata);
    };
  }, [audioSrc]);

  // ── Handlers ─────────────────────────────────────────────────────────────
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setAudioSrc(URL.createObjectURL(file));
    setFileName(file.name);
  };

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      audio.play();
    } else {
      audio.pause();
    }
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.muted = !audio.muted;
    setIsMuted(audio.muted);
  };

  const formatTime = (t: number) => {
    const m = Math.floor(t / 60);
    const s = Math.floor(t % 60);
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  type VisualMode = "bar" | "wave" | "cube";

  const modeClassMap: Record<VisualMode, string> = {
    bar: "bar-active",
    wave: "wave-active",
    cube: "cube-active",
  };

  const activeClass = modeClassMap[visualMode];

  if (!isMounted) return null;

  return (
    <section id="AudioVisualizer">
      <h2>Audio Visualizer</h2>
      <div className="player_container">
        {/* Hidden file input */}
        <input
          type="file"
          accept="audio/*"
          onChange={handleFileUpload}
          ref={fileInputRef}
          style={{ display: "none" }}
        />
        <button
          type="button"
          className="uploadBtn"
          onClick={() => fileInputRef.current?.click()}
        >
          {audioSrc ? <SquarePen size={16} /> : <ArrowUpFromLine size={16} />}
        </button>

        <div className="player">
          {/* ── R3F canvas ── */}
          <div className="canvas_container">
            <VisualizerCanvas
              key={visualMode}
              analyserRef={analyserRef}
              sensitivity={sensitivity}
              color={barColor}
              mode={visualMode}
            />
          </div>

          <p className="fileName">{fileName ?? "Upload an audio"}</p>

          {/* Hidden native audio element — used only as source node */}
          <audio ref={audioRef} src={audioSrc ?? undefined}>
            <track kind="captions" srcLang="en" label="English" default />
          </audio>

          {/* ── Playback controls ── */}
          <div className={`audioBtns ${audioSrc ? "" : "disabled"}`}>
            <button
              type="button"
              className="play"
              onClick={togglePlay}
              disabled={!audioSrc}
            >
              {isPlaying ? <Pause size={16} /> : <Play size={16} />}
            </button>

            <div className="progress">
              <p>
                {formatTime(currentTime)} / {formatTime(duration)}
              </p>
              <input
                type="range"
                value={currentTime}
                max={duration || 0}
                onChange={(e) => {
                  const t = Number.parseFloat(e.target.value);
                  setCurrentTime(t);
                  if (audioRef.current) audioRef.current.currentTime = t;
                }}
              />
            </div>

            <button type="button" className="mute" onClick={toggleMute}>
              {isMuted ? <VolumeX /> : <Volume2 />}
            </button>
          </div>
        </div>

        {/* ── Settings panel ── */}
        <div className={`settings ${audioSrc ? "" : "disabled"}`}>
          <h3>Settings</h3>

          <div className="sensitivity">
            <label htmlFor="sensitivity">Sensitivity: </label>
            <input
              id="sensitivity"
              type="range"
              min="0.1"
              max={visualMode === "wave" ? "0.5" : "1"}
              step="0.05"
              value={sensitivity}
              onChange={(e) =>
                setSensitivity(Number.parseFloat(e.target.value))
              }
            />
          </div>

          <div className="bottom">
            <div className="visualMode">
              <label htmlFor="visualMode">Mode: </label>
              <div className={`buttons ${activeClass}`}>
                <button
                  type="button"
                  className="bar"
                  onClick={() => setVisualMode("bar")}
                >
                  Bar
                </button>
                <button
                  type="button"
                  className="wave"
                  onClick={() => setVisualMode("wave")}
                >
                  Wave
                </button>
                <button
                  type="button"
                  className="cube"
                  onClick={() => setVisualMode("cube")}
                >
                  3D Cube
                </button>
              </div>
            </div>

            <div className="barColor">
              <label htmlFor="barColor">Color: </label>
              <input
                id="barColor"
                type="color"
                value={barColor}
                onChange={(e) => setBarColor(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AudioVisualizer;
