/**
 * © 2026 Bernie Vorster / WebWizSystems
 * 
 * Project: Ayoba Scrollytelling
 * File: Jukebox.tsx
 * 
 * This codebase is proprietary and confidential.
 * Unauthorized use, copying, modification, or distribution is strictly prohibited.
 * 
 * Built & maintained by WebWizSystems
 * https://webwizsystems.com
 * 
 * Created: 2026-04-07
 * Last Updated: 2026-04-15
 * Signature ID: WWZ-AYOBA-SCROLLYTELLING-2026-911
 */

"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Play, Pause, SkipBack, SkipForward, Volume2, Minus, Maximize2, Music } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const tracks = [
    { title: "Ayoba Hobo Intro", artist: "Ayoba Hobo", file: "/Audio/Ayoba_hobo_intro.mp3" },
    { title: "Ayoba Hobo #2", artist: "Ayoba Hobo", file: "/Audio/Ayoba_hobo_2.mp3" },
    { title: "Ayoba Hobo #3", artist: "Ayoba Hobo", file: "/Audio/Ayoba_hobo_3.mp3" },
    { title: "Ayoba Hobo #4", artist: "Ayoba Hobo", file: "/Audio/Ayoba_hobo_4.mp3" },
    { title: "Ayoba Hobo #5", artist: "Ayoba Hobo", file: "/Audio/Ayoba_hobo_5.mp3" },
    { title: "Ayoba Hobo #6", artist: "Ayoba Hobo", file: "/Audio/Ayoba_hobo_6.mp3" },
];

export default function Jukebox({ isFixed = false, onClose }: { isFixed?: boolean; onClose?: () => void }) {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMinimized, setIsMinimized] = useState(false);
    const [currentTrack, setCurrentTrack] = useState(0);
    const [volume, setVolume] = useState(0.8);
    const [progress, setProgress] = useState(0);
    const [rotation, setRotation] = useState(0);
    const audioRef = useRef<HTMLAudioElement>(null);
    const animRef = useRef<number>();
    const rotationRef = useRef(0);

    const spin = useCallback(() => {
        rotationRef.current += 0.5;
        setRotation(rotationRef.current);
        animRef.current = requestAnimationFrame(spin);
    }, []);

    useEffect(() => {
        if (isPlaying) {
            animRef.current = requestAnimationFrame(spin);
        } else {
            if (animRef.current) cancelAnimationFrame(animRef.current);
        }
        return () => {
            if (animRef.current) cancelAnimationFrame(animRef.current);
        };
    }, [isPlaying, spin]);

    useEffect(() => {
        if (audioRef.current) audioRef.current.volume = volume;
    }, [volume]);

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;
        const update = () => {
            if (audio.duration) setProgress((audio.currentTime / audio.duration) * 100);
        };
        audio.addEventListener("timeupdate", update);
        return () => audio.removeEventListener("timeupdate", update);
    }, []);

    const togglePlay = () => {
        if (!audioRef.current) return;
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };

    const skipTrack = () => {
        const next = (currentTrack + 1) % tracks.length;
        setCurrentTrack(next);
        setIsPlaying(false);
        setTimeout(() => { audioRef.current?.play(); setIsPlaying(true); }, 100);
    };

    const prevTrack = () => {
        const prev = (currentTrack - 1 + tracks.length) % tracks.length;
        setCurrentTrack(prev);
        setIsPlaying(false);
        setTimeout(() => { audioRef.current?.play(); setIsPlaying(true); }, 100);
    };

    const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
        const audio = audioRef.current;
        if (!audio || !audio.duration) return;
        const val = parseFloat(e.target.value);
        audio.currentTime = (val / 100) * audio.duration;
        setProgress(val);
    };

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;
        audio.src = tracks[currentTrack].file;
        audio.load();
    }, [currentTrack]);


    return (
        <div style={{
            position: isFixed ? "fixed" : "relative",
            top: isFixed ? "var(--jukebox-top, 100px)" : "auto",
            bottom: isFixed ? "var(--jukebox-bottom, auto)" : "auto",
            right: isFixed ? "var(--jukebox-right, 32px)" : "auto",
            left: isFixed ? "var(--jukebox-left, auto)" : "auto",
            transform: isFixed ? "var(--jukebox-transform, none)" : "none",
            zIndex: isFixed ? 2000 : "auto",
            pointerEvents: "auto"
        }}>
            <AnimatePresence mode="wait">
                {!isMinimized ? (
                    <motion.div
                        key="expanded"
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        style={{
                            background: "rgba(18, 18, 10, 0.98)",
                            backdropFilter: "blur(20px)",
                            border: "1px solid #c9a84c44",
                            borderRadius: "24px",
                            padding: "16px",
                            width: isFixed ? "280px" : "100%",
                            maxWidth: "92vw",
                            boxShadow: "0 20px 80px rgba(0,0,0,0.8), inset 0 0 40px rgba(201, 168, 76, 0.05)",
                            fontFamily: "Inter, sans-serif",
                            color: "#c9a84c",
                            display: "flex",
                            flexDirection: "column",
                            gap: "12px",
                            position: "relative",
                        }}
                    >
                        {/* Header Actions */}
                        <div className="flex justify-end gap-2 absolute top-3 right-3">
                            <button
                                onClick={() => setIsMinimized(true)}
                                className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-gold/60 hover:text-gold transition-all"
                                title="Minimize"
                            >
                                <Minus size={14} />
                            </button>
                            {isFixed && (
                                <button
                                    onClick={onClose}
                                    className="w-8 h-8 rounded-full bg-[#c9a84c] hover:bg-white flex items-center justify-center text-[#1a1a0e] transition-all font-black"
                                >
                                    ×
                                </button>
                            )}
                        </div>

                        <div className="flex items-center justify-center mt-2">
                            <motion.div 
                                style={{
                                    width: "60px",
                                    height: "60px",
                                    flexShrink: 0,
                                    rotate: rotation,
                                }}
                            >
                                <svg width="60" height="60" viewBox="0 0 44 44">
                                    <circle cx="22" cy="22" r="21" fill="#000" stroke="#c9a84c" strokeWidth="1" />
                                    <circle cx="22" cy="22" r="16" fill="#111" stroke="#222" strokeWidth="0.5" />
                                    <circle cx="22" cy="22" r="11" fill="#000" stroke="#222" strokeWidth="0.5" />
                                    <circle cx="22" cy="22" r="6" fill="#111" stroke="#333" strokeWidth="0.5" />
                                    <circle cx="22" cy="22" r="3" fill="#c9a84c" />
                                    <circle cx="22" cy="22" r="1.2" fill="#1a1a0e" />
                                </svg>
                            </motion.div>
                        </div>

                        <div className="w-full">
                            <input
                                type="range"
                                min="0"
                                max="100"
                                step="0.1"
                                value={progress}
                                onChange={handleSeek}
                                className="w-full accent-gold cursor-pointer h-1.5 bg-white/5 rounded-full overflow-hidden"
                                style={{ accentColor: "#c9a84c" }}
                            />
                        </div>

                        <div className="flex items-center justify-between gap-4">
                            <div className="flex items-center gap-4">
                                <button onClick={prevTrack} className="text-gold/60 hover:text-gold transition-colors">
                                    <SkipBack size={20} fill="currentColor" />
                                </button>

                                <button onClick={togglePlay} className="w-14 h-14 bg-gold hover:bg-white rounded-full flex items-center justify-center text-black transition-all shadow-lg hover:scale-105 active:scale-95">
                                    {isPlaying ? <Pause size={28} fill="currentColor" /> : <Play size={28} fill="currentColor" className="ml-1" />}
                                </button>

                                <button onClick={skipTrack} className="text-gold/60 hover:text-gold transition-colors">
                                    <SkipForward size={20} fill="currentColor" />
                                </button>
                            </div>

                            <div className="flex items-center gap-2">
                                <Volume2 size={12} className="text-gold/40" />
                                <input
                                    type="range" min="0" max="1" step="0.01" value={volume}
                                    onChange={(e) => setVolume(parseFloat(e.target.value))}
                                    className="w-12 accent-gold h-1 cursor-pointer"
                                />
                            </div>
                        </div>
                    </motion.div>
                ) : (
                    <motion.div
                        key="minimized"
                        initial={{ opacity: 0, scale: 0.5, rotate: -90 }}
                        animate={{ opacity: 1, scale: 1, rotate: 0 }}
                        exit={{ opacity: 0, scale: 0.5, rotate: 90 }}
                        onClick={() => setIsMinimized(false)}
                        className="group relative cursor-pointer"
                        style={{
                            width: "80px",
                            height: "80px",
                        }}
                    >
                        <div className="absolute inset-0 bg-gold/20 rounded-full blur-xl group-hover:bg-gold/40 transition-all animate-pulse" />
                        <div className="relative w-full h-full bg-black border-2 border-gold/40 rounded-full flex items-center justify-center overflow-hidden shadow-2xl transition-transform group-hover:scale-110 group-active:scale-95">
                            <motion.div 
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    rotate: rotation,
                                }}
                            >
                                <svg width="80" height="80" viewBox="0 0 44 44" className="opacity-90">
                                    <circle cx="22" cy="22" r="21" fill="#000" stroke="#c9a84c" strokeWidth="1" />
                                    <circle cx="22" cy="22" r="16" fill="#111" stroke="#222" strokeWidth="0.5" />
                                    <circle cx="22" cy="22" r="11" fill="#000" stroke="#222" strokeWidth="0.5" />
                                    <circle cx="22" cy="22" r="3" fill="#c9a84c" />
                                </svg>
                            </motion.div>
                            
                            <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
                                <Maximize2 size={24} className="text-white" />
                            </div>

                            {/* Playing indicator */}
                            {isPlaying && (
                                <div className="absolute bottom-2 right-2 w-4 h-4 bg-gold rounded-full flex items-center justify-center animate-bounce shadow-lg">
                                    <Music size={10} className="text-black" />
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <audio ref={audioRef} src={tracks[currentTrack].file} onEnded={skipTrack} />
        </div>
    );
}