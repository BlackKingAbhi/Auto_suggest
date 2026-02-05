import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';


function Stars(props: any) {
    const ref = useRef<any>(null);

    const sphere = useMemo(() => {
        const temp = [];
        for (let i = 0; i < 1500; i++) {
            // Random points in a sphere approximation
            const theta = Math.random() * 2 * Math.PI;
            const phi = Math.acos(2 * Math.random() - 1);
            const r = Math.cbrt(Math.random()) * 1.5; // Radius 1.5

            const x = r * Math.sin(phi) * Math.cos(theta);
            const y = r * Math.sin(phi) * Math.sin(theta);
            const z = r * Math.cos(phi);
            temp.push(x, y, z);
        }
        return new Float32Array(temp);
    }, []);

    useFrame((_state, delta) => {
        if (ref.current) {
            ref.current.rotation.x -= delta / 10;
            ref.current.rotation.y -= delta / 15;
        }
    })

    return (
        <group rotation={[0, 0, Math.PI / 4]}>
            <Points ref={ref} positions={sphere} stride={3} frustumCulled={false} {...props}>
                <PointMaterial
                    transparent
                    color={props.color}
                    size={0.005}
                    sizeAttenuation={true}
                    depthWrite={false}
                />
            </Points>
        </group>
    )
}

export default function ThreeBackground() {

    const particleColor = '#ffffff';

    return (
        <div className="fixed inset-0 -z-10 h-full w-full pointer-events-none opacity-40">
            <Canvas camera={{ position: [0, 0, 1] }}>
                <Stars color={particleColor} />
            </Canvas>
        </div>
    )
}
