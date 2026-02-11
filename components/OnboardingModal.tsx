import React, { useState, useEffect } from 'react';
import { User, Dices, ChevronRight, Check, Rocket, Briefcase, Palette } from 'lucide-react';
import { Player } from '../types';

interface OnboardingModalProps {
    onComplete: (player: Player) => void;
    isOpen: boolean;
}

const AVATAR_OPTIONS = [
    'pixel-1', 'pixel-2', 'pixel-3', 'pixel-4', 'pixel-5', 'pixel-6'
];

const COLOR_OPTIONS = [
    '#ef4444', '#f97316', '#f59e0b', '#84cc16', '#10b981',
    '#06b6d4', '#3b82f6', '#6366f1', '#8b5cf6', '#d946ef', '#f43f5e'
];

const LOGO_ICONS = ['zap', 'crown', 'star', 'shield', 'sword', 'anchor', 'heart', 'droplet', 'sun', 'moon', 'cloud', 'camera', 'music', 'code'];

export default function OnboardingModal({ onComplete, isOpen }: OnboardingModalProps) {
    const [step, setStep] = useState(0);
    const [name, setName] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [avatarId, setAvatarId] = useState('pixel-1');
    const [color, setColor] = useState('#3b82f6');
    const [logoId, setLogoId] = useState('zap');
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Generate random initial values
    useEffect(() => {
        if (isOpen) {
            setName(`Player_${Math.floor(Math.random() * 9999)}`);
            setCompanyName(`Corp_${Math.floor(Math.random() * 999)}`);
            setColor(COLOR_OPTIONS[Math.floor(Math.random() * COLOR_OPTIONS.length)]);
        }
    }, [isOpen]);

    const handleRandomLogo = () => {
        const random = LOGO_ICONS[Math.floor(Math.random() * LOGO_ICONS.length)];
        setLogoId(random);
    };

    const handleComplete = () => {
        if (!name || !companyName) return;

        setIsSubmitting(true);

        // Simulate API call / processing
        setTimeout(() => {
            const newPlayer: Player = {
                id: `user_${Date.now()}`,
                name,
                company: companyName,
                color,
                logoId,
                unlockedPlates: ['N1'],
                // avatarId would be added here if defined in types
            };
            onComplete(newPlayer);
            setIsSubmitting(false);
        }, 800);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md animate-in fade-in duration-300">
            <div className="w-full max-w-md bg-slate-900 border border-slate-700 rounded-3xl shadow-2xl overflow-hidden flex flex-col relative">

                {/* Progress Bar */}
                <div className="absolute top-0 left-0 w-full h-1 bg-slate-800">
                    <div
                        className="h-full bg-blue-500 transition-all duration-500"
                        style={{ width: step === 0 ? '50%' : '100%' }}
                    />
                </div>

                <div className="p-8 flex flex-col gap-6">
                    <div className="text-center space-y-2">
                        <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-blue-500/30 shadow-[0_0_15px_rgba(59,130,246,0.5)]">
                            <Rocket className="text-blue-400" size={32} />
                        </div>
                        <h2 className="text-2xl font-black text-white uppercase tracking-wider">
                            {step === 0 ? "Identify Yourself" : "Establish Company"}
                        </h2>
                        <p className="text-slate-400 text-sm">
                            {step === 0 ? "Enter the digital frontier." : "Build your corporate identity."}
                        </p>
                    </div>

                    {step === 0 && (
                        <div className="space-y-6 animate-in slide-in-from-right-4 fade-in duration-300">
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-500 uppercase flex items-center gap-2">
                                    <User size={14} /> Agent Name
                                </label>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full bg-slate-800 border-2 border-slate-700 rounded-xl px-4 py-3 text-white focus:border-blue-500 focus:outline-none transition font-mono shadow-inner"
                                    placeholder="Enter your name..."
                                />
                            </div>

                            <div className="space-y-3">
                                <label className="text-xs font-bold text-slate-500 uppercase flex items-center gap-2">
                                    Avatar Appearance
                                </label>
                                <div className="grid grid-cols-6 gap-2">
                                    {AVATAR_OPTIONS.map((opt, i) => (
                                        <button
                                            key={opt}
                                            onClick={() => setAvatarId(opt)}
                                            className={`aspect-square rounded-lg border-2 transition-all overflow-hidden relative group
                                        ${avatarId === opt
                                                    ? 'border-blue-500 bg-blue-500/20 shadow-[0_0_10px_rgba(59,130,246,0.3)] scale-110 z-10'
                                                    : 'border-slate-700 bg-slate-800 hover:border-slate-500 opacity-70 hover:opacity-100'}`}
                                        >
                                            {/* Placeholder for SVG Avatar - using colored blocks for now based on index */}
                                            <div
                                                className="w-full h-full"
                                                style={{
                                                    backgroundColor: `hsl(${i * 60}, 70%, 60%)`,
                                                    opacity: 0.8
                                                }}
                                            />
                                            {avatarId === opt && (
                                                <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                                                    <Check size={16} className="text-white drop-shadow-md" />
                                                </div>
                                            )}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <button
                                onClick={() => { if (name) setStep(1); }}
                                disabled={!name}
                                className={`w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all mt-4
                            ${name
                                        ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/20 translate-y-0'
                                        : 'bg-slate-800 text-slate-600 cursor-not-allowed'}`}
                            >
                                Next Step <ChevronRight size={18} />
                            </button>
                        </div>
                    )}

                    {step === 1 && (
                        <div className="space-y-6 animate-in slide-in-from-right-4 fade-in duration-300">
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-500 uppercase flex items-center gap-2">
                                    <Briefcase size={14} /> Company Name
                                </label>
                                <input
                                    type="text"
                                    value={companyName}
                                    onChange={(e) => setCompanyName(e.target.value)}
                                    className="w-full bg-slate-800 border-2 border-slate-700 rounded-xl px-4 py-3 text-white focus:border-blue-500 focus:outline-none transition font-mono shadow-inner"
                                    placeholder="Enter company name..."
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-500 uppercase flex items-center gap-2">
                                    <Palette size={14} /> Brand Identity
                                </label>
                                <div className="p-4 bg-slate-800 rounded-xl border border-slate-700 flex flex-col gap-4">
                                    <div className="flex items-center justify-between">
                                        <div className="text-sm text-slate-400">Primary Color</div>
                                        <div className="flex gap-2">
                                            {COLOR_OPTIONS.slice(0, 5).map(c => (
                                                <button
                                                    key={c}
                                                    onClick={() => setColor(c)}
                                                    className={`w-6 h-6 rounded-full border-2 transition-transform ${color === c ? 'border-white scale-125' : 'border-transparent hover:scale-110'}`}
                                                    style={{ backgroundColor: c }}
                                                />
                                            ))}
                                            {/* More colors could be a dropdown, keeping it simple */}
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between border-t border-slate-700 pt-4">
                                        <div className="text-sm text-slate-400">Create Logo</div>
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-lg flex items-center justify-center shadow-inner bg-slate-900 border border-slate-700">
                                                {/* Mock icon rendering */}
                                                <div style={{ color }}>
                                                    {/* We can't render dynamic Lucide icons easily here without a map, using generic for now unless passed */}
                                                    <Dices size={20} />
                                                </div>
                                            </div>
                                            <button
                                                onClick={handleRandomLogo}
                                                className="text-xs bg-slate-700 hover:bg-slate-600 text-white px-3 py-2 rounded-lg transition flex items-center gap-2"
                                            >
                                                <Dices size={14} /> Randomize
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex gap-3 mt-4">
                                <button
                                    onClick={() => setStep(0)}
                                    className="bg-slate-800 hover:bg-slate-700 text-slate-300 px-6 py-4 rounded-xl font-bold transition"
                                >
                                    Back
                                </button>
                                <button
                                    onClick={handleComplete}
                                    disabled={!companyName || isSubmitting}
                                    className={`flex-1 py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all
                                ${companyName && !isSubmitting
                                            ? 'bg-green-600 hover:bg-green-500 text-white shadow-lg shadow-green-600/20'
                                            : 'bg-slate-800 text-slate-600 cursor-not-allowed'}`}
                                >
                                    {isSubmitting ? (
                                        <span className="animate-pulse">Creating...</span>
                                    ) : (
                                        <>Initialize System <Rocket size={18} /></>
                                    )}
                                </button>
                            </div>
                        </div>
                    )}

                    <div className="text-center text-xs text-slate-600">
                        v0.9.2 • Stack City Protocol
                    </div>
                </div>
            </div>
        </div>
    );
}
