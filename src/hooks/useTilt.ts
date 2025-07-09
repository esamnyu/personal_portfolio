import { useRef, useEffect } from 'react';

interface TiltOptions {
  maxTilt?: number;
  perspective?: number;
  scale?: number;
  speed?: number;
  glare?: boolean;
  maxGlare?: number;
}

export const useTilt = (options: TiltOptions = {}) => {
  const {
    maxTilt = 10,
    perspective = 1000,
    scale = 1.05,
    speed = 300,
    glare = true,
    maxGlare = 0.3,
  } = options;

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    let updateCall: number | null = null;
    let glareElement: HTMLDivElement | null = null;

    if (glare) {
      glareElement = document.createElement('div');
      glareElement.classList.add('tilt-glare');
      glareElement.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        overflow: hidden;
        pointer-events: none;
        border-radius: inherit;
      `;

      const glareInner = document.createElement('div');
      glareInner.style.cssText = `
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%) rotate(45deg);
        width: 200%;
        height: 200%;
        background: linear-gradient(0deg, transparent 40%, rgba(255, 255, 255, ${maxGlare}) 50%, transparent 60%);
        opacity: 0;
        transition: opacity ${speed}ms cubic-bezier(0.4, 0, 0.2, 1);
      `;

      glareElement.appendChild(glareInner);
      element.appendChild(glareElement);
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (updateCall !== null) {
        cancelAnimationFrame(updateCall);
      }

      updateCall = requestAnimationFrame(() => {
        const rect = element.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const tiltX = ((y - centerY) / centerY) * maxTilt;
        const tiltY = ((centerX - x) / centerX) * maxTilt;

        element.style.transform = `
          perspective(${perspective}px)
          rotateX(${tiltX}deg)
          rotateY(${tiltY}deg)
          scale3d(${scale}, ${scale}, ${scale})
        `;

        if (glareElement) {
          const glareInner = glareElement.firstChild as HTMLDivElement;
          const glareOpacity = (Math.abs(tiltX) + Math.abs(tiltY)) / (maxTilt * 2);
          const glareX = ((x / rect.width) * 100 - 50) * 2;
          const glareY = ((y / rect.height) * 100 - 50) * 2;

          glareInner.style.opacity = glareOpacity.toString();
          glareInner.style.transform = `
            translate(-50%, -50%)
            translate(${glareX}%, ${glareY}%)
            rotate(45deg)
          `;
        }
      });
    };

    const handleMouseLeave = () => {
      if (updateCall !== null) {
        cancelAnimationFrame(updateCall);
      }

      element.style.transform = `
        perspective(${perspective}px)
        rotateX(0deg)
        rotateY(0deg)
        scale3d(1, 1, 1)
      `;

      if (glareElement) {
        const glareInner = glareElement.firstChild as HTMLDivElement;
        glareInner.style.opacity = '0';
      }
    };

    element.style.transition = `transform ${speed}ms cubic-bezier(0.4, 0, 0.2, 1)`;
    element.style.transformStyle = 'preserve-3d';

    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseleave', handleMouseLeave);
      if (updateCall !== null) {
        cancelAnimationFrame(updateCall);
      }
      if (glareElement && element.contains(glareElement)) {
        element.removeChild(glareElement);
      }
    };
  }, [maxTilt, perspective, scale, speed, glare, maxGlare]);

  return ref;
};