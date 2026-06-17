import React, { useRef, useState } from "react";

interface ThreeDContainerProps {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
  showShine?: boolean;
}

export const ThreeDContainer: React.FC<ThreeDContainerProps> = ({
  children,
  className = "",
  intensity = 12,
  showShine = true,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [shine, setShine] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    
    // Relative mouse position from center (-1 to 1)
    const x = (e.clientX - left - width / 2) / (width / 2);
    const y = (e.clientY - top - height / 2) / (height / 2);
    
    // Shine reflection coordinates (0 to 100)
    const shineX = ((e.clientX - left) / width) * 100;
    const shineY = ((e.clientY - top) / height) * 100;

    setRotate({ x: x * intensity, y: -y * intensity });
    setShine({ x: shineX, y: shineY });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotate({ x: 0, y: 0 });
    setShine({ x: 50, y: 50 });
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative transition-all duration-300 ease-out overflow-hidden ${className}`}
      style={{
        perspective: "1000px",
        transformStyle: "preserve-3d",
        transform: isHovered
          ? `perspective(1000px) rotateX(${rotate.y.toFixed(2)}deg) rotateY(${rotate.x.toFixed(2)}deg) scale3d(1.02, 1.02, 1.02)`
          : "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)",
      }}
    >
      {/* 3D Depth backplane projection */}
      <div 
        style={{ transform: "translateZ(10px)", transformStyle: "preserve-3d" }}
        className="w-full h-full"
      >
        {children}
      </div>

      {/* Glossy Dynamic Light Shine Overlay */}
      {showShine && isHovered && (
        <div
          className="absolute inset-0 pointer-events-none mix-blend-overlay transition-opacity duration-300 pointer-events-none z-30"
          style={{
            background: `radial-gradient(circle at ${shine.x}% ${shine.y}%, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0) 60%)`,
          }}
        />
      )}
    </div>
  );
};
