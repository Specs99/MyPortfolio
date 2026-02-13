import { useCallback, useRef } from 'react';

export function useSound() {
  const soundsRef = useRef<Record<string, HTMLAudioElement>>({});
  const enabledRef = useRef(true);

  const playSound = useCallback((soundName: string, volume: number = 0.3) => {
    if (!enabledRef.current) return;

    if (!soundsRef.current[soundName]) {
      soundsRef.current[soundName] = new Audio(`/sounds/${soundName}.mp3`);
    }

    const sound = soundsRef.current[soundName];
    sound.volume = volume;
    sound.currentTime = 0;
    sound.play().catch(() => {
      // Ignore autoplay errors
    });
  }, []);

  const toggleSound = useCallback(() => {
    enabledRef.current = !enabledRef.current;
    return enabledRef.current;
  }, []);

  return { playSound, toggleSound };
}
