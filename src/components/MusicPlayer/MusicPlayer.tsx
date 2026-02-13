import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, SkipForward, Volume2, VolumeX, Music } from 'lucide-react';
import './MusicPlayer.css';

const playlist = [
    'Forest of Little Wonders.mp3',
    'Skybound Overture (1).mp3',
    'Skybound Overture (2).mp3',
    'Skybound Overture.mp3',
    'Skyward Promis.mp3',
    'Skyward Promise (1).mp3',
    'Skyward Promise.mp3',
    'Skyward.mp3',
    'Untitled (4).mp3'
];

export const MusicPlayer: React.FC = () => {
    const [isOpen, setIsOpen] = useState(true);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
    const [volume, setVolume] = useState(() => {
        const saved = localStorage.getItem('music-player-volume');
        return saved !== null ? parseFloat(saved) : 0.5;
    });
    const [isMuted, setIsMuted] = useState(false);

    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        // Audio instance initialization
        audioRef.current = new Audio(`/music/${playlist[currentTrackIndex]}`);
        audioRef.current.volume = isMuted ? 0 : volume;

        const handleEnded = () => {
            skipToNext();
        };

        audioRef.current.addEventListener('ended', handleEnded);

        return () => {
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current.removeEventListener('ended', handleEnded);
                audioRef.current = null;
            }
        };
    }, []);

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.src = `/music/${playlist[currentTrackIndex]}`;
            if (isPlaying) {
                audioRef.current.play().catch((e: Error) => console.log("Autoplay blocked or error:", e));
            }
        }
    }, [currentTrackIndex]);

    useEffect(() => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.play().catch((e: Error) => console.log("Play failed:", e));
            } else {
                audioRef.current.pause();
            }
        }
    }, [isPlaying]);

    useEffect(() => {
        const resumeAudio = () => {
            if (isPlaying && audioRef.current && audioRef.current.paused) {
                audioRef.current.play().catch(e => console.log("Still blocked:", e));
            }
            window.removeEventListener('click', resumeAudio);
            window.removeEventListener('touchstart', resumeAudio);
        };

        if (isPlaying) {
            window.addEventListener('click', resumeAudio);
            window.addEventListener('touchstart', resumeAudio);
        }

        return () => {
            window.removeEventListener('click', resumeAudio);
            window.removeEventListener('touchstart', resumeAudio);
        };
    }, [isPlaying]);

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = isMuted ? 0 : volume;
            localStorage.setItem('music-player-volume', volume.toString());
        }
    }, [volume, isMuted]);

    const togglePlay = () => setIsPlaying(!isPlaying);

    const skipToNext = () => {
        setCurrentTrackIndex((prev: number) => (prev + 1) % playlist.length);
    };

    const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newVolume = parseFloat(e.target.value);
        setVolume(newVolume);
        if (newVolume > 0) setIsMuted(false);
    };

    const toggleMute = () => setIsMuted(!isMuted);

    const cleanTrackName = (name: string) => {
        return name.replace('.mp3', '').replace(/\(\d+\)/, '').trim();
    };

    return (
        <div className="music-player-container">
            {isOpen && (
                <div className={`music-player-widget ${isPlaying ? 'playing' : ''}`}>
                    <div className="player-header">
                        <span className="player-title">System Audio HUD</span>
                        <div className="visualizer">
                            <div className="vis-bar"></div>
                            <div className="vis-bar"></div>
                            <div className="vis-bar"></div>
                            <div className="vis-bar"></div>
                            <div className="vis-bar"></div>
                        </div>
                    </div>

                    <div className="track-info">
                        <span className="track-name">{cleanTrackName(playlist[currentTrackIndex])}</span>
                    </div>

                    <div className="controls-row">
                        <div className="main-controls">
                            <button
                                className="control-btn play-pause"
                                onClick={togglePlay}
                                title={isPlaying ? "Pause" : "Play"}
                            >
                                {isPlaying ? <Pause size={20} /> : <Play size={20} fill="currentColor" />}
                            </button>
                            <button
                                className="control-btn"
                                onClick={skipToNext}
                                title="Next Track"
                            >
                                <SkipForward size={18} fill="currentColor" />
                            </button>
                        </div>

                        <div className="volume-container">
                            <button className="text-primary/70 hover:text-gold transition-colors" onClick={toggleMute}>
                                {isMuted || volume === 0 ? <VolumeX size={16} /> : <Volume2 size={16} />}
                            </button>
                            <input
                                type="range"
                                min="0"
                                max="1"
                                step="0.01"
                                value={volume}
                                onChange={handleVolumeChange}
                                className="volume-slider"
                            />
                        </div>
                    </div>
                </div>
            )}

            <button
                className={`toggle-rune ${isOpen ? 'active' : ''}`}
                onClick={() => setIsOpen(!isOpen)}
                title={isOpen ? "Close Player" : "Open Music Player"}
            >
                <Music size={24} />
            </button>
        </div>
    );
};
