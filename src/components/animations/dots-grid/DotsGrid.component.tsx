"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import "./style.scss";

// ── Pixel font: 7 rows × 5 cols, digits + uppercase letters ─────────────────

const PIXEL_FONT: Record<string, number[][]> = {
  " ": [
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
  ],
  "0": [
    [0, 1, 1, 1, 0],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 1, 1],
    [1, 0, 1, 0, 1],
    [1, 1, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [0, 1, 1, 1, 0],
  ],
  "1": [
    [0, 0, 1, 0, 0],
    [0, 1, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 1, 1, 1, 0],
  ],
  "2": [
    [0, 1, 1, 1, 0],
    [1, 0, 0, 0, 1],
    [0, 0, 0, 0, 1],
    [0, 0, 0, 1, 0],
    [0, 0, 1, 0, 0],
    [0, 1, 0, 0, 0],
    [1, 1, 1, 1, 1],
  ],
  "3": [
    [1, 1, 1, 1, 0],
    [0, 0, 0, 0, 1],
    [0, 0, 0, 0, 1],
    [0, 1, 1, 1, 0],
    [0, 0, 0, 0, 1],
    [0, 0, 0, 0, 1],
    [1, 1, 1, 1, 0],
  ],
  "4": [
    [1, 0, 0, 1, 0],
    [1, 0, 0, 1, 0],
    [1, 1, 1, 1, 1],
    [0, 0, 0, 1, 0],
    [0, 0, 0, 1, 0],
    [0, 0, 0, 1, 0],
    [0, 0, 0, 1, 0],
  ],
  "5": [
    [1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0],
    [1, 0, 0, 0, 0],
    [1, 1, 1, 1, 0],
    [0, 0, 0, 0, 1],
    [0, 0, 0, 0, 1],
    [1, 1, 1, 1, 0],
  ],
  "6": [
    [0, 1, 1, 1, 0],
    [1, 0, 0, 0, 0],
    [1, 0, 0, 0, 0],
    [1, 1, 1, 1, 0],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [0, 1, 1, 1, 0],
  ],
  "7": [
    [1, 1, 1, 1, 1],
    [0, 0, 0, 0, 1],
    [0, 0, 0, 1, 0],
    [0, 0, 1, 0, 0],
    [0, 1, 0, 0, 0],
    [0, 1, 0, 0, 0],
    [0, 1, 0, 0, 0],
  ],
  "8": [
    [0, 1, 1, 1, 0],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [0, 1, 1, 1, 0],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [0, 1, 1, 1, 0],
  ],
  "9": [
    [0, 1, 1, 1, 0],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [0, 1, 1, 1, 1],
    [0, 0, 0, 0, 1],
    [0, 0, 0, 0, 1],
    [0, 1, 1, 1, 0],
  ],
  A: [
    [0, 0, 1, 0, 0],
    [0, 1, 0, 1, 0],
    [1, 0, 0, 0, 1],
    [1, 1, 1, 1, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
  ],
  B: [
    [1, 1, 1, 1, 0],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 1, 1, 1, 0],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 1, 1, 1, 0],
  ],
  C: [
    [0, 1, 1, 1, 0],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 0],
    [1, 0, 0, 0, 0],
    [1, 0, 0, 0, 0],
    [1, 0, 0, 0, 1],
    [0, 1, 1, 1, 0],
  ],
  D: [
    [1, 1, 1, 0, 0],
    [1, 0, 0, 1, 0],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 1, 0],
    [1, 1, 1, 0, 0],
  ],
  E: [
    [1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0],
    [1, 0, 0, 0, 0],
    [1, 1, 1, 1, 0],
    [1, 0, 0, 0, 0],
    [1, 0, 0, 0, 0],
    [1, 1, 1, 1, 1],
  ],
  F: [
    [1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0],
    [1, 0, 0, 0, 0],
    [1, 1, 1, 1, 0],
    [1, 0, 0, 0, 0],
    [1, 0, 0, 0, 0],
    [1, 0, 0, 0, 0],
  ],
  G: [
    [0, 1, 1, 1, 0],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 0],
    [1, 0, 1, 1, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [0, 1, 1, 1, 0],
  ],
  H: [
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 1, 1, 1, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
  ],
  I: [
    [0, 1, 1, 1, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 1, 1, 1, 0],
  ],
  J: [
    [0, 0, 1, 1, 1],
    [0, 0, 0, 1, 0],
    [0, 0, 0, 1, 0],
    [0, 0, 0, 1, 0],
    [0, 0, 0, 1, 0],
    [1, 0, 0, 1, 0],
    [0, 1, 1, 0, 0],
  ],
  K: [
    [1, 0, 0, 0, 1],
    [1, 0, 0, 1, 0],
    [1, 0, 1, 0, 0],
    [1, 1, 0, 0, 0],
    [1, 0, 1, 0, 0],
    [1, 0, 0, 1, 0],
    [1, 0, 0, 0, 1],
  ],
  L: [
    [1, 0, 0, 0, 0],
    [1, 0, 0, 0, 0],
    [1, 0, 0, 0, 0],
    [1, 0, 0, 0, 0],
    [1, 0, 0, 0, 0],
    [1, 0, 0, 0, 0],
    [1, 1, 1, 1, 1],
  ],
  M: [
    [1, 0, 0, 0, 1],
    [1, 1, 0, 1, 1],
    [1, 0, 1, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
  ],
  N: [
    [1, 0, 0, 0, 1],
    [1, 1, 0, 0, 1],
    [1, 0, 1, 0, 1],
    [1, 0, 0, 1, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
  ],
  O: [
    [0, 1, 1, 1, 0],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [0, 1, 1, 1, 0],
  ],
  P: [
    [1, 1, 1, 1, 0],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 1, 1, 1, 0],
    [1, 0, 0, 0, 0],
    [1, 0, 0, 0, 0],
    [1, 0, 0, 0, 0],
  ],
  Q: [
    [0, 1, 1, 1, 0],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 1, 0, 1],
    [1, 0, 0, 1, 0],
    [0, 1, 1, 0, 1],
  ],
  R: [
    [1, 1, 1, 1, 0],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 1, 1, 1, 0],
    [1, 0, 1, 0, 0],
    [1, 0, 0, 1, 0],
    [1, 0, 0, 0, 1],
  ],
  S: [
    [0, 1, 1, 1, 1],
    [1, 0, 0, 0, 0],
    [1, 0, 0, 0, 0],
    [0, 1, 1, 1, 0],
    [0, 0, 0, 0, 1],
    [0, 0, 0, 0, 1],
    [1, 1, 1, 1, 0],
  ],
  T: [
    [1, 1, 1, 1, 1],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
  ],
  U: [
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [0, 1, 1, 1, 0],
  ],
  V: [
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [0, 1, 0, 1, 0],
    [0, 0, 1, 0, 0],
  ],
  W: [
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 1, 0, 1],
    [1, 1, 0, 1, 1],
    [1, 0, 0, 0, 1],
  ],
  X: [
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [0, 1, 0, 1, 0],
    [0, 0, 1, 0, 0],
    [0, 1, 0, 1, 0],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
  ],
  Y: [
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [0, 1, 0, 1, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
  ],
  Z: [
    [1, 1, 1, 1, 1],
    [0, 0, 0, 0, 1],
    [0, 0, 0, 1, 0],
    [0, 0, 1, 0, 0],
    [0, 1, 0, 0, 0],
    [1, 0, 0, 0, 0],
    [1, 1, 1, 1, 1],
  ],
};

// ── Constants ────────────────────────────────────────────────────────────────

const FONT_ROWS = 7;
const FONT_CHAR_COLS = 5;
const CHAR_GAP_FP = 1;
const MAX_INSTANCES = 100_000;

// ── Pattern builder ──────────────────────────────────────────────────────────

interface Pattern {
  fontMap: number[][];
  patternFPCols: number;
  patternDotCols: number;
  patternDotRows: number;
}

function buildPattern(
  text: string,
  charScale: number,
  trailGapFP: number,
): Pattern {
  const chars = text.toUpperCase().split("");
  const n = chars.length;
  const patternFPCols =
    n * FONT_CHAR_COLS + Math.max(0, n - 1) * CHAR_GAP_FP + trailGapFP;

  const fontMap: number[][] = Array.from({ length: FONT_ROWS }, () =>
    new Array(patternFPCols).fill(0),
  );

  let fc = 0;
  for (let i = 0; i < n; i++) {
    const glyph = PIXEL_FONT[chars[i]] ?? PIXEL_FONT[" "];
    for (let r = 0; r < FONT_ROWS; r++) {
      for (let c = 0; c < FONT_CHAR_COLS; c++) {
        fontMap[r][fc + c] = glyph[r][c];
      }
    }
    fc += FONT_CHAR_COLS + (i < n - 1 ? CHAR_GAP_FP : 0);
  }

  return {
    fontMap,
    patternFPCols,
    patternDotCols: patternFPCols * charScale,
    patternDotRows: FONT_ROWS * charScale,
  };
}

// ── Public component ─────────────────────────────────────────────────────────

// ── Rover helpers ─────────────────────────────────────────────────────────────

const DIRS = [
  [1, 0],
  [-1, 0],
  [0, 1],
  [0, -1],
] as const;

interface Rover {
  /** Grid column index (float, interpolating) */
  col: number;
  /** Grid row index (float, interpolating) */
  row: number;
  /** Current direction [dc, dr] */
  dc: number;
  dr: number;
  /** Steps remaining before direction change */
  stepsLeft: number;
  /** Movement speed in grid-cells per second */
  cellSpeed: number;
}

function makeRovers(count: number, cols: number, rows: number): Rover[] {
  return Array.from({ length: count }, () => {
    const dir = DIRS[Math.floor(Math.random() * DIRS.length)];
    return {
      col: Math.floor(Math.random() * cols),
      row: Math.floor(Math.random() * rows),
      dc: dir[0],
      dr: dir[1],
      stepsLeft: 3 + Math.floor(Math.random() * 8),
      cellSpeed: 2 + Math.random() * 4,
    };
  });
}

// ── Public component ─────────────────────────────────────────────────────────

export interface DotsGridProps {
  /** Text rendered as negative space in the scrolling dot grid. Supports 0–9 and A–Z. */
  text?: string;
  /** Dot radius in pixels. Default: 2 */
  dotSize?: number;
  /** Centre-to-centre distance between dots in pixels. Controls density. Default: 20 */
  dotSpacing?: number;
  /**
   * Dots per font pixel. Font height in px = 7 × charScale × dotSpacing.
   * Default: 5 → ~700 px tall at dotSpacing 20.
   */
  charScale?: number;
  /** Dot fill colour — any valid CSS colour string. Default: "#1d1d1f" */
  dotColor?: string;
  /**
   * Gap between the end of one text loop and the start of the next,
   * in font-pixel units. Default: 6
   */
  trailGap?: number;
  /**
   * Scrolling speed in world-units (pixels) per second.
   * Default: 45
   */
  speed?: number;
  /**
   * Colour of the roving highlight dots — any valid CSS colour string.
   * Default: "#ff3b30"
   */
  roverColor?: string;
  /**
   * Fraction of grid cells that become roving dots (0 = none, 1 = all).
   * Default: 0.003
   */
  roverDensity?: number;
  /**
   * Colour of dots drawn inside the text mask — any valid CSS colour string.
   * Default: "#1d1d1f" (same as dotColor, i.e. invisible by default)
   */
  textDotColor?: string;
  /**
   * Opacity of the text-mask dots (0 = fully transparent / classic negative-space
   * look, 1 = fully opaque). Default: 0
   */
  textDotOpacity?: number;
  /** className forwarded to the container div. */
  className?: string;
}

const DotsGrid = ({
  text = "404",
  dotSize = 2,
  dotSpacing = 20,
  charScale = 5,
  dotColor = "#1d1d1f",
  trailGap = 6,
  speed = 45,
  roverColor = "#ff3b30",
  roverDensity = 0.003,
  textDotColor = "#1d1d1f",
  textDotOpacity = 0,
  className,
}: DotsGridProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // ── Three.js setup ──────────────────────────────────────────────────────
    let width = container.clientWidth;
    let height = container.clientHeight;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height, false);
    container.appendChild(renderer.domElement);

    const camera = new THREE.OrthographicCamera(
      -width / 2,
      width / 2,
      height / 2,
      -height / 2,
      -1000,
      1000,
    );
    camera.position.z = 5;

    const scene = new THREE.Scene();

    const { fontMap, patternDotCols, patternDotRows, patternFPCols } =
      buildPattern(text, charScale, trailGap);

    const geometry = new THREE.CircleGeometry(dotSize, 12);
    const material = new THREE.MeshBasicMaterial({ color: dotColor });
    const mesh = new THREE.InstancedMesh(geometry, material, MAX_INSTANCES);
    mesh.count = 0;
    scene.add(mesh);

    const roverMaterial = new THREE.MeshBasicMaterial({ color: roverColor });
    const roverMesh = new THREE.InstancedMesh(geometry, roverMaterial, 10_000);
    roverMesh.count = 0;
    scene.add(roverMesh);

    const textDotMaterial = new THREE.MeshBasicMaterial({
      color: textDotColor,
      transparent: true,
      opacity: textDotOpacity,
    });
    const textDotMesh = new THREE.InstancedMesh(
      geometry,
      textDotMaterial,
      MAX_INSTANCES,
    );
    textDotMesh.count = 0;
    scene.add(textDotMesh);

    // ── Roving-dot state ────────────────────────────────────────────────────
    const getCols = () => Math.ceil(width / dotSpacing) + 2;
    const getRows = () => Math.ceil(height / dotSpacing) + 2;
    let rovers: Rover[] = makeRovers(
      Math.max(1, Math.round(getCols() * getRows() * roverDensity)),
      getCols(),
      getRows(),
    );

    const timer = new THREE.Timer();
    const dummy = new THREE.Object3D();
    let offset = 0;
    let frameId: number;

    // ── Render loop ─────────────────────────────────────────────────────────
    type Rover = {
      col: number;
      row: number;
      dc: number;
      dr: number;
      cellSpeed: number;
      stepsLeft: number;
    };

    type MaskFn = (r: number, c: number) => boolean;

    const updateRovers = (
      rovers: Rover[],
      cols: number,
      rows: number,
      delta: number,
    ): void => {
      for (const rv of rovers) {
        rv.col += rv.dc * rv.cellSpeed * delta;
        rv.row += rv.dr * rv.cellSpeed * delta;
        rv.stepsLeft -= rv.cellSpeed * delta;

        rv.col = ((((rv.col + 1) % (cols + 2)) + (cols + 2)) % (cols + 2)) - 1;
        rv.row = ((rv.row % rows) + rows) % rows;

        if (rv.stepsLeft <= 0) {
          const dir = DIRS[Math.floor(Math.random() * DIRS.length)];
          rv.dc = dir[0];
          rv.dr = dir[1];
          rv.stepsLeft = 3 + Math.floor(Math.random() * 8);
          rv.cellSpeed = 2 + Math.random() * 4;
          rv.col = Math.round(rv.col);
          rv.row = Math.round(rv.row);
        }
      }
    };

    const buildRoverSet = (
      rovers: Rover[],
      cols: number,
      rows: number,
    ): Set<number> => {
      const set = new Set<number>();

      for (const rv of rovers) {
        const rc = Math.round(rv.col);
        const rr = Math.round(rv.row);

        if (rc >= -1 && rc <= cols && rr >= 0 && rr < rows) {
          set.add(rr * (cols + 3) + (rc + 1));
        }
      }

      return set;
    };

    const createMaskChecker = (
      patternRowStart: number,
      dotColShift: number,
      patternDotRows: number,
      charScale: number,
      patternDotCols: number,
      patternFPCols: number,
      fontMap: number[][],
    ): MaskFn => {
      return (r: number, c: number): boolean => {
        const dotRow = r - patternRowStart;
        if (dotRow < 0 || dotRow >= patternDotRows) return false;

        const fontRow = Math.floor(dotRow / charScale);
        const worldDotCol = c + dotColShift;

        const patternDotCol =
          ((worldDotCol % patternDotCols) + patternDotCols) % patternDotCols;

        const fontCol = Math.floor(patternDotCol / charScale);

        return fontCol < patternFPCols && fontMap[fontRow][fontCol] === 1;
      };
    };

    type GridConfig = {
      rows: number;
      cols: number;
      width: number;
      height: number;
      dotSpacing: number;
    };

    type RenderBaseDotsParams = {
      mesh: THREE.InstancedMesh;
      dummy: THREE.Object3D;
      grid: GridConfig;
      isMasked: MaskFn;
      roverSet: Set<number>;
    };

    const renderBaseDots = ({
      mesh,
      dummy,
      grid,
      isMasked,
      roverSet,
    }: RenderBaseDotsParams): void => {
      const { rows, cols, width, height, dotSpacing } = grid;

      let count = 0;

      for (let r = 0; r < rows; r++) {
        for (let c = -1; c <= cols; c++) {
          if (count >= MAX_INSTANCES) break;
          if (isMasked(r, c)) continue;
          if (roverSet.has(r * (cols + 3) + (c + 1))) continue;

          const x = c * dotSpacing + dotSpacing / 2 - width / 2;
          const y = height / 2 - (r * dotSpacing + dotSpacing / 2);

          dummy.position.set(x, y, 0);
          dummy.updateMatrix();
          mesh.setMatrixAt(count++, dummy.matrix);
        }
      }

      mesh.count = count;
      mesh.instanceMatrix.needsUpdate = true;
    };

    type RenderTextDotsParams = {
      mesh: THREE.InstancedMesh;
      dummy: THREE.Object3D;
      grid: GridConfig;
      isMasked: MaskFn;
    };

    const renderTextDots = ({
      mesh,
      dummy,
      grid,
      isMasked,
    }: RenderTextDotsParams): void => {
      const { rows, cols, width, height, dotSpacing } = grid;

      let count = 0;

      for (let r = 0; r < rows; r++) {
        for (let c = -1; c <= cols; c++) {
          if (count >= MAX_INSTANCES) break;
          if (!isMasked(r, c)) continue;

          const x = c * dotSpacing + dotSpacing / 2 - width / 2;
          const y = height / 2 - (r * dotSpacing + dotSpacing / 2);

          dummy.position.set(x, y, 0);
          dummy.updateMatrix();
          mesh.setMatrixAt(count++, dummy.matrix);
        }
      }

      mesh.count = count;
      mesh.instanceMatrix.needsUpdate = true;
    };

    type RenderRoversParams = {
      mesh: THREE.InstancedMesh;
      dummy: THREE.Object3D;
      rovers: Rover[];
      grid: GridConfig;
      isMasked: MaskFn;
    };

    const renderRovers = ({
      mesh,
      dummy,
      rovers,
      grid,
      isMasked,
    }: RenderRoversParams): void => {
      const { rows, cols, width, height, dotSpacing } = grid;

      let count = 0;

      for (const rv of rovers) {
        if (count >= 10_000) break;

        const rc = Math.round(rv.col);
        const rr = Math.round(rv.row);

        if (rc < -1 || rc > cols || rr < 0 || rr >= rows) continue;
        if (isMasked(rr, rc)) continue;

        const x = rc * dotSpacing + dotSpacing / 2 - width / 2;
        const y = height / 2 - (rr * dotSpacing + dotSpacing / 2);

        dummy.position.set(x, y, 0);
        dummy.updateMatrix();
        mesh.setMatrixAt(count++, dummy.matrix);
      }

      mesh.count = count;
      mesh.instanceMatrix.needsUpdate = true;
    };

    const draw = (): void => {
      timer.update();
      const delta: number = timer.getDelta();
      offset += speed * delta;

      const cols: number = Math.ceil(width / dotSpacing) + 2;
      const rows: number = Math.ceil(height / dotSpacing) + 2;
      const patternRowStart: number = Math.floor((rows - patternDotRows) / 2);
      const dotColShift: number = Math.floor(offset / dotSpacing);

      updateRovers(rovers, cols, rows, delta);

      const roverSet = buildRoverSet(rovers, cols, rows);

      const isMasked = createMaskChecker(
        patternRowStart,
        dotColShift,
        patternDotRows,
        charScale,
        patternDotCols,
        patternFPCols,
        fontMap,
      );

      renderBaseDots({
        mesh,
        dummy,
        grid: { rows, cols, width, height, dotSpacing },
        isMasked,
        roverSet,
      });

      renderRovers({
        mesh: roverMesh,
        dummy,
        rovers,
        grid: { rows, cols, width, height, dotSpacing },
        isMasked,
      });

      renderTextDots({
        mesh: textDotMesh,
        dummy,
        grid: { rows, cols, width, height, dotSpacing },
        isMasked,
      });

      renderer.render(scene, camera);
      frameId = requestAnimationFrame(draw);
    };

    frameId = requestAnimationFrame(draw);

    // ── Resize ──────────────────────────────────────────────────────────────
    const observer = new ResizeObserver(() => {
      width = container.clientWidth;
      height = container.clientHeight;
      renderer.setSize(width, height, false);
      camera.left = -width / 2;
      camera.right = width / 2;
      camera.top = height / 2;
      camera.bottom = -height / 2;
      camera.updateProjectionMatrix();
      const nc = Math.ceil(width / dotSpacing) + 2;
      const nr = Math.ceil(height / dotSpacing) + 2;
      rovers = makeRovers(
        Math.max(1, Math.round(nc * nr * roverDensity)),
        nc,
        nr,
      );
    });
    observer.observe(container);

    return () => {
      cancelAnimationFrame(frameId);
      observer.disconnect();
      geometry.dispose();
      material.dispose();
      roverMaterial.dispose();
      textDotMaterial.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, [
    text,
    dotSize,
    dotSpacing,
    charScale,
    dotColor,
    trailGap,
    speed,
    roverColor,
    roverDensity,
    textDotColor,
    textDotOpacity,
  ]);

  return (
    <div
      ref={containerRef}
      className={`dot_grid ${className}`}
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
    />
  );
};

export default DotsGrid;
