"use client";

import { useState, useCallback, type CSSProperties } from "react";
import { Copy, Check } from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ToolEvents } from "@/lib/analytics";

type Direction =
  | "up"
  | "down"
  | "left"
  | "right"
  | "top-left"
  | "top-right"
  | "bottom-left"
  | "bottom-right";

type Method = "border" | "clip-path";

interface DirectionCell {
  value: Direction;
  label: string;
}

const DIRECTION_GRID: (DirectionCell | null)[] = [
  { value: "top-left", label: "◸" },
  { value: "up", label: "▲" },
  { value: "top-right", label: "◹" },
  { value: "left", label: "◀" },
  null,
  { value: "right", label: "▶" },
  { value: "bottom-left", label: "◺" },
  { value: "down", label: "▼" },
  { value: "bottom-right", label: "◿" },
];

const CLIP_PATH_POLYGONS: Record<Direction, string> = {
  up: "polygon(50% 0%, 0% 100%, 100% 100%)",
  down: "polygon(0% 0%, 100% 0%, 50% 100%)",
  left: "polygon(0% 50%, 100% 0%, 100% 100%)",
  right: "polygon(0% 0%, 0% 100%, 100% 50%)",
  "top-left": "polygon(0% 0%, 100% 0%, 0% 100%)",
  "top-right": "polygon(0% 0%, 100% 0%, 100% 100%)",
  "bottom-left": "polygon(0% 0%, 0% 100%, 100% 100%)",
  "bottom-right": "polygon(100% 0%, 100% 100%, 0% 100%)",
};

const DIRECTION_LABELS: Record<Direction, string> = {
  up: "Up",
  down: "Down",
  left: "Left",
  right: "Right",
  "top-left": "Top Left",
  "top-right": "Top Right",
  "bottom-left": "Bottom Left",
  "bottom-right": "Bottom Right",
};

const PRESET_COLORS = [
  "#3b82f6",
  "#6366f1",
  "#10b981",
  "#f59e0b",
  "#ef4444",
  "#8b5cf6",
  "#ec4899",
  "#14b8a6",
  "#1e293b",
  "#f1f5f9",
];

function getBorderStyles(
  direction: Direction,
  size: number,
  color: string
): CSSProperties {
  const half = Math.round(size / 2);
  const t = "transparent";

  switch (direction) {
    case "up":
      return {
        width: 0,
        height: 0,
        borderLeft: `${half}px solid ${t}`,
        borderRight: `${half}px solid ${t}`,
        borderBottom: `${size}px solid ${color}`,
      };
    case "down":
      return {
        width: 0,
        height: 0,
        borderLeft: `${half}px solid ${t}`,
        borderRight: `${half}px solid ${t}`,
        borderTop: `${size}px solid ${color}`,
      };
    case "left":
      return {
        width: 0,
        height: 0,
        borderTop: `${half}px solid ${t}`,
        borderBottom: `${half}px solid ${t}`,
        borderRight: `${size}px solid ${color}`,
      };
    case "right":
      return {
        width: 0,
        height: 0,
        borderTop: `${half}px solid ${t}`,
        borderBottom: `${half}px solid ${t}`,
        borderLeft: `${size}px solid ${color}`,
      };
    case "top-left":
      return {
        width: 0,
        height: 0,
        borderTop: `${size}px solid ${color}`,
        borderRight: `${size}px solid ${t}`,
      };
    case "top-right":
      return {
        width: 0,
        height: 0,
        borderTop: `${size}px solid ${color}`,
        borderLeft: `${size}px solid ${t}`,
      };
    case "bottom-left":
      return {
        width: 0,
        height: 0,
        borderBottom: `${size}px solid ${color}`,
        borderRight: `${size}px solid ${t}`,
      };
    case "bottom-right":
      return {
        width: 0,
        height: 0,
        borderBottom: `${size}px solid ${color}`,
        borderLeft: `${size}px solid ${t}`,
      };
  }
}

function generateBorderCSS(
  direction: Direction,
  size: number,
  color: string
): string {
  const half = Math.round(size / 2);
  const cssLines: Record<Direction, string[]> = {
    up: [
      `border-left: ${half}px solid transparent;`,
      `border-right: ${half}px solid transparent;`,
      `border-bottom: ${size}px solid ${color};`,
    ],
    down: [
      `border-left: ${half}px solid transparent;`,
      `border-right: ${half}px solid transparent;`,
      `border-top: ${size}px solid ${color};`,
    ],
    left: [
      `border-top: ${half}px solid transparent;`,
      `border-bottom: ${half}px solid transparent;`,
      `border-right: ${size}px solid ${color};`,
    ],
    right: [
      `border-top: ${half}px solid transparent;`,
      `border-bottom: ${half}px solid transparent;`,
      `border-left: ${size}px solid ${color};`,
    ],
    "top-left": [
      `border-top: ${size}px solid ${color};`,
      `border-right: ${size}px solid transparent;`,
    ],
    "top-right": [
      `border-top: ${size}px solid ${color};`,
      `border-left: ${size}px solid transparent;`,
    ],
    "bottom-left": [
      `border-bottom: ${size}px solid ${color};`,
      `border-right: ${size}px solid transparent;`,
    ],
    "bottom-right": [
      `border-bottom: ${size}px solid ${color};`,
      `border-left: ${size}px solid transparent;`,
    ],
  };

  const lines = cssLines[direction].map((l) => `  ${l}`).join("\n");
  return `.triangle {\n  width: 0;\n  height: 0;\n${lines}\n}`;
}

function generateClipPathCSS(
  direction: Direction,
  size: number,
  color: string
): string {
  return `.triangle {\n  width: ${size}px;\n  height: ${size}px;\n  background-color: ${color};\n  clip-path: ${CLIP_PATH_POLYGONS[direction]};\n}`;
}

export function CssTriangleGeneratorTool() {
  const [direction, setDirection] = useState<Direction>("up");
  const [method, setMethod] = useState<Method>("border");
  const [size, setSize] = useState(80);
  const [color, setColor] = useState("#3b82f6");
  const [hexInput, setHexInput] = useState("#3b82f6");
  const [copied, setCopied] = useState(false);

  const css =
    method === "border"
      ? generateBorderCSS(direction, size, color)
      : generateClipPathCSS(direction, size, color);

  const previewStyle: CSSProperties =
    method === "border"
      ? getBorderStyles(direction, size, color)
      : {
          width: size,
          height: size,
          backgroundColor: color,
          clipPath: CLIP_PATH_POLYGONS[direction],
        };

  const handleCopy = useCallback(async () => {
    await navigator.clipboard.writeText(css);
    setCopied(true);
    toast.success("CSS copied to clipboard!");
    ToolEvents.resultCopied();
    setTimeout(() => setCopied(false), 2000);
  }, [css]);

  const handleDirectionChange = useCallback((dir: Direction) => {
    setDirection(dir);
    ToolEvents.toolUsed("direction-changed");
  }, []);

  const handleMethodChange = useCallback((m: Method) => {
    setMethod(m);
    ToolEvents.toolUsed("method-changed");
  }, []);

  const handleColorChange = useCallback((val: string) => {
    setColor(val);
    setHexInput(val);
  }, []);

  const handleHexInput = useCallback((val: string) => {
    setHexInput(val);
    if (/^#[0-9a-fA-F]{6}$/.test(val)) {
      setColor(val);
    }
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="max-w-5xl mx-auto"
    >
      <div className="grid lg:grid-cols-2 gap-8 items-start">
        {/* Controls */}
        <div className="space-y-7 rounded-2xl border border-border/50 bg-muted/20 p-6">
          {/* Direction picker */}
          <div>
            <p className="text-sm font-semibold mb-3">
              Direction —{" "}
              <span className="text-brand font-normal">
                {DIRECTION_LABELS[direction]}
              </span>
            </p>
            <div
              className="grid gap-2"
              style={{ gridTemplateColumns: "repeat(3, 3rem)" }}
            >
              {DIRECTION_GRID.map((item, i) =>
                item === null ? (
                  <div
                    key={i}
                    className="w-12 h-12 rounded-lg bg-muted/30 flex items-center justify-center"
                  >
                    <div className="w-2 h-2 rounded-full bg-border" />
                  </div>
                ) : (
                  <button
                    key={item.value}
                    onClick={() => handleDirectionChange(item.value)}
                    className={`w-12 h-12 rounded-lg text-xl flex items-center justify-center transition-all border font-bold ${
                      direction === item.value
                        ? "bg-brand/15 border-brand text-brand"
                        : "bg-muted/30 border-border/50 hover:border-brand/50 hover:bg-brand/10 text-muted-foreground hover:text-foreground"
                    }`}
                    aria-label={item.value}
                    title={DIRECTION_LABELS[item.value]}
                  >
                    {item.label}
                  </button>
                )
              )}
            </div>
          </div>

          {/* Method toggle */}
          <div>
            <p className="text-sm font-semibold mb-3">CSS Method</p>
            <div className="flex gap-2">
              {(["border", "clip-path"] as Method[]).map((m) => (
                <button
                  key={m}
                  onClick={() => handleMethodChange(m)}
                  className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all border ${
                    method === m
                      ? "bg-brand/15 border-brand text-brand"
                      : "bg-muted/30 border-border/50 hover:border-brand/50 text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {m === "border" ? "Border Trick" : "Clip-path"}
                </button>
              ))}
            </div>
            <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
              {method === "border"
                ? "Zero-size element. Diagonal directions produce right isosceles triangles."
                : "Clips a filled box. Works with background-image, gradients, and shadows."}
            </p>
          </div>

          {/* Size */}
          <div>
            <p className="text-sm font-semibold mb-3">
              Size —{" "}
              <span className="text-brand font-mono font-normal">{size}px</span>
            </p>
            <input
              type="range"
              min={20}
              max={200}
              step={5}
              value={size}
              onChange={(e) => setSize(Number(e.target.value))}
              className="w-full accent-brand cursor-pointer"
              aria-label="Triangle size in pixels"
            />
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>20px</span>
              <span>200px</span>
            </div>
          </div>

          {/* Color */}
          <div>
            <p className="text-sm font-semibold mb-3">Color</p>
            <div className="flex gap-3 items-center mb-3">
              <input
                type="color"
                value={color}
                onChange={(e) => handleColorChange(e.target.value)}
                className="w-12 h-10 rounded-lg cursor-pointer border border-border/50 p-0.5 bg-transparent"
                aria-label="Triangle color picker"
              />
              <input
                type="text"
                value={hexInput}
                onChange={(e) => handleHexInput(e.target.value)}
                className="flex-1 px-3 py-2 rounded-lg border border-border/50 bg-muted/30 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-brand/50"
                placeholder="#3b82f6"
                maxLength={7}
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              {PRESET_COLORS.map((c) => (
                <button
                  key={c}
                  onClick={() => handleColorChange(c)}
                  className="w-7 h-7 rounded-full border-2 transition-transform hover:scale-110"
                  style={{
                    backgroundColor: c,
                    borderColor: color === c ? "#6366f1" : "transparent",
                    outline:
                      c === "#f1f5f9" ? "1px solid #cbd5e1" : "none",
                  }}
                  aria-label={`Set color to ${c}`}
                  title={c}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Preview + Code */}
        <div className="space-y-6">
          {/* Preview */}
          <div>
            <p className="text-sm font-semibold mb-3">Preview</p>
            <div className="rounded-2xl border border-border/50 bg-muted/20 flex items-center justify-center min-h-[220px] relative overflow-hidden">
              <div className="absolute inset-0 dot-pattern opacity-30" />
              <div style={previewStyle} />
            </div>
          </div>

          {/* CSS Output */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-semibold">Generated CSS</p>
              <Button
                size="sm"
                onClick={handleCopy}
                variant="outline"
                className="gap-1.5 text-sm h-8"
              >
                {copied ? (
                  <Check className="h-3.5 w-3.5" />
                ) : (
                  <Copy className="h-3.5 w-3.5" />
                )}
                {copied ? "Copied!" : "Copy CSS"}
              </Button>
            </div>
            <pre className="rounded-xl border border-border/50 bg-muted/40 p-4 text-sm font-mono overflow-x-auto text-foreground whitespace-pre leading-relaxed">
              {css}
            </pre>
          </div>

          {/* Usage tip */}
          <div className="rounded-xl border border-brand/20 bg-brand/5 p-4">
            <p className="text-xs text-muted-foreground leading-relaxed">
              <span className="font-semibold text-brand">Tip:</span>{" "}
              {method === "border"
                ? "Add this class to an empty <div> or a ::before / ::after pseudo-element to keep your HTML clean."
                : "The clip-path method lets you add box-shadow or use a background-image inside the triangle shape."}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
