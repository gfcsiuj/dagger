import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { MeshDistortMaterial, Environment, Float, Sparkles } from '@react-three/drei';
import { motion } from 'framer-motion';
import * as THREE from 'three';

const MercuryBlob = () => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.1;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.15;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={meshRef} scale={1.2}>
        <sphereGeometry args={[1, 128, 128]} />
        <MeshDistortMaterial
          color="#e0e0e0"
          envMapIntensity={3}
          clearcoat={1}
          clearcoatRoughness={0.1}
          metalness={1}
          roughness={0.1}
          distort={0.4}
          speed={3}
        />
      </mesh>
    </Float>
  );
};

const MercurySection: React.FC = () => {
  return (
    <section className="relative py-32 bg-dagger-black overflow-hidden border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Text Content */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="z-10 order-2 lg:order-1"
          >
            <h2 className="text-5xl md:text-7xl font-black mb-6 uppercase tracking-tighter leading-tight">
              تشكيل <br />
              <span className="text-dagger-yellow stroke-text">المستقبل</span>
            </h2>
            <p className="text-xl text-gray-400 mb-8 max-w-lg leading-relaxed font-light">
              مثل الزئبق، نحن نتكيف ونتشكل مع كل تحدي جديد. نبتكر حلولاً مرنة وقوية تعكس رؤيتك وتتجاوز التوقعات، لنصنع تأثيراً لا يُنسى.
            </p>
            <button className="px-8 py-4 bg-dagger-yellow text-dagger-black font-bold uppercase tracking-wider rounded-full hover:bg-white hover:scale-105 transition-all duration-300">
              اكتشف المزيد
            </button>
          </motion.div>

          {/* 3D Canvas */}
          <div className="h-[500px] lg:h-[600px] w-full relative order-1 lg:order-2">
            {/* Background Glow */}
            <div className="absolute inset-0 bg-dagger-yellow/10 rounded-full blur-[100px] transform scale-75"></div>
            
            <Canvas camera={{ position: [0, 0, 4], fov: 45 }} className="z-10">
              <ambientLight intensity={0.5} />
              <directionalLight position={[10, 10, 5]} intensity={2} />
              <directionalLight position={[-10, -10, -5]} intensity={1} color="#FFD700" />
              
              <MercuryBlob />
              
              <Sparkles count={50} scale={5} size={2} speed={0.4} opacity={0.5} color="#FFD700" />
              
              <Environment preset="city" />
            </Canvas>
          </div>

        </div>
      </div>
    </section>
  );
};

export default MercurySection;
