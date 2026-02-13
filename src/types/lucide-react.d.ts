declare module 'lucide-react' {
    import { FC, SVGProps } from 'react';

    export interface LucideProps extends SVGProps<SVGSVGElement> {
        size?: number | string;
        color?: string;
        strokeWidth?: number | string;
        absoluteStrokeWidth?: boolean;
        fill?: string;
    }

    export type LucideIcon = FC<LucideProps>;

    export const Send: LucideIcon;
    export const Mail: LucideIcon;
    export const User: LucideIcon;
    export const MessageSquare: LucideIcon;
    export const Sparkles: LucideIcon;
    export const CheckCircle: LucideIcon;
    export const Zap: LucideIcon;
    export const ChevronDown: LucideIcon;
    export const Volume2: LucideIcon;
    export const VolumeX: LucideIcon;
    export const Sun: LucideIcon;
    export const Moon: LucideIcon;
    export const MapPin: LucideIcon;
    export const Calendar: LucideIcon;
    export const Briefcase: LucideIcon;
    export const Heart: LucideIcon;
    export const Code: LucideIcon;
    export const Lightbulb: LucideIcon;
    export const ExternalLink: LucideIcon;
    export const Github: LucideIcon;
    export const ArrowRight: LucideIcon;
    export const Lock: LucideIcon;
    export const Palette: LucideIcon;
    export const Brain: LucideIcon;
    export const Instagram: LucideIcon;
    export const Youtube: LucideIcon;
    export const Linkedin: LucideIcon;
    export const Link2: LucideIcon;
    export const Building2: LucideIcon;
    export const Play: LucideIcon;
    export const Pause: LucideIcon;
    export const SkipForward: LucideIcon;
    export const Music: LucideIcon;
}
