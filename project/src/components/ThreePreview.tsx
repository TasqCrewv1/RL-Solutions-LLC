import {
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useId,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import * as THREE from 'three';
import { Canvas, useThree } from '@react-three/fiber';
import { OrbitControls, DragControls, Html } from '@react-three/drei';
import { RotateCcw, RotateCw, ZoomIn, ZoomOut, Maximize2 } from 'lucide-react';

// ─── Generic 3D preview with interaction polish ──────────────────────────────
// ThreePreview is shape-agnostic. It provides the canvas, lighting, orbit
// controls, drag-and-drop (via <Draggable>), hover/selection effects, a
// control bar (reset / auto-rotate / zoom / fit), a drag shadow, and a
// skeleton loading state. Every estimator builds its own meshes as children.

export interface ThreePreviewHandle {
  capture: () => string | null;
  resetCamera: () => void;
  zoomIn: () => void;
  zoomOut: () => void;
  fitToView: () => void;
}

export interface ThreePreviewProps {
  cameraPosition?: [number, number, number];
  children?: React.ReactNode;
}

// ─── Context: drag state + selection ─────────────────────────────────────────
interface DragContextValue {
  setIsDragging: (v: boolean) => void;
  selectedId: string | null;
  setSelectedId: (id: string | null) => void;
}

const DragContext = createContext<DragContextValue>({
  setIsDragging: () => {},
  selectedId: null,
  setSelectedId: () => {},
});

export function useDragContext() {
  return useContext(DragContext);
}

// ─── SceneCapture: stash renderer/scene/camera for imperative use ────────────
function SceneCapture({
  onReady,
}: {
  onReady: (gl: THREE.WebGLRenderer, scene: THREE.Scene, camera: THREE.Camera) => void;
}) {
  const { gl, scene, camera } = useThree();
  useEffect(() => {
    onReady(gl, scene, camera);
  }, [gl, scene, camera, onReady]);
  return null;
}

// ─── Skeleton loading state ──────────────────────────────────────────────────
function SkeletonLoader() {
  return (
    <div
      className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 bg-slate-50"
      role="status"
      aria-live="polite"
    >
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-slate-200 border-t-orange-500" />
      <span className="text-sm font-600 text-slate-400">Loading 3D Preview…</span>
      <span className="sr-only">Loading 3D scene</span>
    </div>
  );
}

// ─── Control bar (reset / auto-rotate / zoom / fit) ──────────────────────────
const CTRL_BTN =
  'flex h-8 w-8 items-center justify-center rounded-lg text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500/40';
const CTRL_BTN_ACTIVE =
  'flex h-8 w-8 items-center justify-center rounded-lg bg-orange-50 text-orange-600 transition-colors hover:bg-orange-100 hover:text-orange-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500/40';
const CTRL_DIVIDER = 'h-5 w-px bg-slate-200';

function ControlBar({
  autoRotate,
  onToggleAutoRotate,
  onReset,
  onZoomIn,
  onZoomOut,
  onFit,
}: {
  autoRotate: boolean;
  onToggleAutoRotate: () => void;
  onReset: () => void;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onFit: () => void;
}) {
  return (
    <div className="flex items-center gap-1 border-t border-slate-200 bg-white px-2 py-1.5">
      <button type="button" onClick={onReset} title="Reset camera" aria-label="Reset camera" className={CTRL_BTN}>
        <RotateCcw className="h-4 w-4" />
      </button>
      <button
        type="button"
        onClick={onToggleAutoRotate}
        title="Toggle auto-rotate"
        aria-label="Toggle auto-rotate"
        aria-pressed={autoRotate}
        className={autoRotate ? CTRL_BTN_ACTIVE : CTRL_BTN}
      >
        <RotateCw className="h-4 w-4" />
      </button>
      <div className={CTRL_DIVIDER} />
      <button type="button" onClick={onZoomIn} title="Zoom in" aria-label="Zoom in" className={CTRL_BTN}>
        <ZoomIn className="h-4 w-4" />
      </button>
      <button type="button" onClick={onZoomOut} title="Zoom out" aria-label="Zoom out" className={CTRL_BTN}>
        <ZoomOut className="h-4 w-4" />
      </button>
      <div className={CTRL_DIVIDER} />
      <button type="button" onClick={onFit} title="Fit to view" aria-label="Fit to view" className={CTRL_BTN}>
        <Maximize2 className="h-4 w-4" />
      </button>
    </div>
  );
}

// ─── Draggable: hover + selection + drag shadow + tooltip ────────────────────
export function Draggable({
  position = [0, 0, 0],
  label,
  price,
  onRemove,
  children,
}: {
  position?: [number, number, number];
  label?: string;
  price?: string;
  onRemove?: () => void;
  children: React.ReactNode;
}) {
  const { setIsDragging, selectedId, setSelectedId } = useDragContext();
  const id = useId();
  const [hovered, setHovered] = useState(false);
  const [localDragging, setLocalDragging] = useState(false);
  const groupRef = useRef<THREE.Group>(null);
  const didDrag = useRef(false);
  const selected = selectedId === id;

  // Apply emissive glow based on hover/selection state by traversing child meshes.
  useEffect(() => {
    if (!groupRef.current) return;
    const intensity = selected ? 0.35 : hovered ? 0.15 : 0;
    groupRef.current.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        const mat = child.material;
        if (mat instanceof THREE.MeshStandardMaterial || mat instanceof THREE.MeshPhysicalMaterial) {
          if (intensity > 0) {
            mat.emissive.setHex(0xff8c00);
            mat.emissiveIntensity = intensity;
          } else {
            mat.emissive.setHex(0x000000);
            mat.emissiveIntensity = 0;
          }
        }
      }
    });
  }, [hovered, selected]);

  return (
    <DragControls
      autoTransform
      onDragStart={() => {
        setIsDragging(true);
        setLocalDragging(true);
        setHovered(false);
        didDrag.current = false;
        document.body.style.cursor = 'grabbing';
      }}
      onDrag={() => {
        didDrag.current = true;
        // Clamp Y to original height so objects stay on their plane.
        if (groupRef.current) {
          groupRef.current.position.y = position[1];
        }
      }}
      onDragEnd={() => {
        setIsDragging(false);
        setLocalDragging(false);
        document.body.style.cursor = 'auto';
      }}
    >
      <group
        ref={groupRef}
        position={position}
        onPointerOver={(e) => {
          e.stopPropagation();
          if (!localDragging) {
            setHovered(true);
            document.body.style.cursor = 'pointer';
          }
        }}
        onPointerOut={(e) => {
          e.stopPropagation();
          setHovered(false);
          document.body.style.cursor = 'auto';
        }}
        onClick={(e) => {
          e.stopPropagation();
          if (!didDrag.current) {
            setSelectedId(selected ? null : id);
          }
        }}
      >
        {children}

        {/* Drag shadow — flat circle on the floor following XZ position */}
        {localDragging && (
          <mesh position={[0, -position[1] + 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <circleGeometry args={[0.9, 32]} />
            <meshBasicMaterial color="#1e293b" transparent opacity={0.25} />
          </mesh>
        )}

        {/* Floating label + price tooltip (always visible; styled by state) */}
        {(label || onRemove) && (
          <Html position={[0, 1.2, 0]} center distanceFactor={10} pointerEvents="auto">
            <div
              className="flex flex-col items-center gap-1 whitespace-nowrap select-none"
              style={{ pointerEvents: 'none' }}
            >
              {label && (
                <div
                  className={`rounded-full px-2 py-0.5 text-[11px] font-700 shadow-md ring-1 transition-colors ${
                    selected
                      ? 'bg-orange-500 text-white ring-orange-400'
                      : 'bg-white/95 text-slate-800 ring-slate-200'
                  }`}
                >
                  {label}
                  {selected && price && <span className="ml-1 opacity-80">· {price}</span>}
                </div>
              )}
              {onRemove && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onRemove();
                  }}
                  style={{ pointerEvents: 'auto' }}
                  className="flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-white shadow-md transition-transform hover:scale-110"
                  aria-label={`Remove ${label ?? 'item'}`}
                >
                  <span className="text-[10px] leading-none">x</span>
                </button>
              )}
            </div>
          </Html>
        )}
      </group>
    </DragControls>
  );
}

// ─── ThreePreview main component ─────────────────────────────────────────────
const ThreePreview = forwardRef<ThreePreviewHandle, ThreePreviewProps>(function ThreePreview(
  { cameraPosition = [14, 10, 14], children }: ThreePreviewProps,
  ref,
) {
  const [isDragging, setIsDragging] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [autoRotate, setAutoRotate] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const glRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.Camera | null>(null);
  const controlsRef = useRef<any>(null);
  const contentRef = useRef<THREE.Group>(null);
  const initialCamPos = useRef(new THREE.Vector3(...cameraPosition));

  const handleContextReady = useCallback(
    (gl: THREE.WebGLRenderer, scene: THREE.Scene, camera: THREE.Camera) => {
      glRef.current = gl;
      sceneRef.current = scene;
      cameraRef.current = camera;
    },
    [],
  );

  const resetCamera = useCallback(() => {
    const camera = cameraRef.current as THREE.PerspectiveCamera | null;
    const controls = controlsRef.current;
    if (!camera || !controls) return;
    camera.position.copy(initialCamPos.current);
    controls.target.set(0, 0, 0);
    controls.update();
  }, []);

  const zoomIn = useCallback(() => {
    const camera = cameraRef.current as THREE.PerspectiveCamera | null;
    const controls = controlsRef.current;
    if (!camera || !controls) return;
    const dir = new THREE.Vector3().subVectors(controls.target, camera.position);
    dir.multiplyScalar(0.2);
    camera.position.add(dir);
    controls.update();
  }, []);

  const zoomOut = useCallback(() => {
    const camera = cameraRef.current as THREE.PerspectiveCamera | null;
    const controls = controlsRef.current;
    if (!camera || !controls) return;
    const dir = new THREE.Vector3().subVectors(controls.target, camera.position);
    dir.multiplyScalar(-0.25);
    camera.position.add(dir);
    controls.update();
  }, []);

  const fitToView = useCallback(() => {
    const content = contentRef.current;
    const camera = cameraRef.current as THREE.PerspectiveCamera | null;
    const controls = controlsRef.current;
    if (!content || !camera || !controls) return;
    const box = new THREE.Box3().setFromObject(content);
    if (box.isEmpty()) {
      resetCamera();
      return;
    }
    const center = box.getCenter(new THREE.Vector3());
    const size = box.getSize(new THREE.Vector3());
    const maxDim = Math.max(size.x, size.y, size.z, 5);
    const fov = camera.fov * (Math.PI / 180);
    const distance = (maxDim / 2) / Math.tan(fov / 2) * 1.8;
    camera.position.set(
      center.x + distance * 0.7,
      center.y + distance * 0.5,
      center.z + distance * 0.7,
    );
    camera.lookAt(center);
    controls.target.copy(center);
    controls.update();
  }, [resetCamera]);

  useImperativeHandle(
    ref,
    () => ({
      capture: () => {
        const gl = glRef.current;
        const scene = sceneRef.current;
        const camera = cameraRef.current;
        if (!gl || !scene || !camera) return null;
        gl.render(scene, camera);
        return gl.domElement.toDataURL('image/png');
      },
      resetCamera,
      zoomIn,
      zoomOut,
      fitToView,
    }),
    [resetCamera, zoomIn, zoomOut, fitToView],
  );

  return (
    <div className="relative flex h-[460px] w-full flex-col overflow-hidden rounded-2xl bg-slate-50 ring-1 ring-slate-200">
      <div className="relative flex-1">
        {!loaded && <SkeletonLoader />}
        <Canvas
          camera={{ position: cameraPosition, fov: 45 }}
          gl={{ preserveDrawingBuffer: true, alpha: true }}
          shadows
          onCreated={({ gl }) => {
            gl.shadowMap.enabled = true;
            gl.shadowMap.type = THREE.PCFSoftShadowMap;
            setLoaded(true);
          }}
          onPointerMissed={() => setSelectedId(null)}
          className="h-full w-full"
        >
          <SceneCapture onReady={handleContextReady} />
          <ambientLight intensity={0.5} />
          <directionalLight
            position={[10, 16, 8]}
            intensity={1.2}
            castShadow
            shadow-mapSize-width={1024}
            shadow-mapSize-height={1024}
            shadow-camera-left={-20}
            shadow-camera-right={20}
            shadow-camera-top={20}
            shadow-camera-bottom={-20}
            shadow-camera-near={0.5}
            shadow-camera-far={60}
            shadow-bias={-0.0005}
          />
          {/* Soft shadow contact plane */}
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]} receiveShadow>
            <planeGeometry args={[60, 60]} />
            <shadowMaterial opacity={0.18} />
          </mesh>
          <DragContext.Provider value={{ setIsDragging, selectedId, setSelectedId }}>
            <group ref={contentRef}>{children}</group>
          </DragContext.Provider>
          <OrbitControls
            ref={controlsRef}
            target={[0, 0, 0]}
            enabled={!isDragging}
            autoRotate={autoRotate}
            autoRotateSpeed={4}
            makeDefault
          />
        </Canvas>
      </div>
      <ControlBar
        autoRotate={autoRotate}
        onToggleAutoRotate={() => setAutoRotate((v) => !v)}
        onReset={resetCamera}
        onZoomIn={zoomIn}
        onZoomOut={zoomOut}
        onFit={fitToView}
      />
    </div>
  );
});

export default ThreePreview;
