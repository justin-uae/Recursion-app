interface DubaiSkylineIconProps {
    className?: string;
}

export default function DubaiSkylineIcon({ className = "w-12 h-12" }: DubaiSkylineIconProps) {
    return (
        <svg
            viewBox="0 0 80 85"
            className={className}
        >
            {/* Airplane */}
            <g transform="translate(58, 6) rotate(10)">
                <path d="M0,0 L10,0 L12,1.2 L10,2.4 L0,2.4 L-1.2,1.2 Z" fill="#1f2937" />
                <path d="M6,1.2 L7.5,-2.5 L8.5,-2.5 L7.5,1.2 Z" fill="#1f2937" />
            </g>

            {/* Emirates Towers (left) */}
            <rect x="8" y="22" width="8" height="38" fill="#1f2937" />
            <rect x="9" y="18" width="6" height="4" fill="#1f2937" />
            <rect x="10" y="15" width="4" height="3" fill="#1f2937" />
            <rect x="11" y="12" width="2" height="3" fill="#1f2937" />

            {/* Burj Khalifa (center - tallest) */}
            <path d="M34,60 L34,16 L36,8 L38,16 L38,60 Z" fill="#1f2937" />
            <rect x="32" y="25" width="8" height="35" fill="#1f2937" />
            <rect x="30" y="32" width="12" height="28" fill="#1f2937" />
            <rect x="28" y="40" width="16" height="20" fill="#1f2937" />
            <rect x="26" y="48" width="20" height="12" fill="#1f2937" />

            {/* Burj Al Arab (right - sail shaped) */}
            <path d="M52,60 L52,35 L66,27 L70,29 L70,60 Z" fill="#1f2937" />
            <path d="M52,35 L66,27 L66,33 L56,40 Z" fill="#4b5563" />
            <ellipse cx="60" cy="44" rx="5" ry="6" fill="#f3f4f6" stroke="#1f2937" strokeWidth="1" />
            <path d="M70,29 L75,35 L75,60 L70,60 Z" fill="#1f2937" />

            {/* Red Banner */}
            <path d="M3,62 L77,62 L74,67 L77,72 L3,72 L6,67 Z" fill="#dc2626" />

            {/* DUBAI Text */}
            <text
                x="40"
                y="69.5"
                textAnchor="middle"
                fill="white"
                fontSize="9"
                fontWeight="900"
                fontFamily="Arial Black, Arial, sans-serif"
                letterSpacing="0.5"
            >
                DUBAI
            </text>

            {/* United Arab Emirates - INCREASED SIZE */}
            <text
                x="40"
                y="82"
                textAnchor="middle"
                fill="#dc2626"
                fontSize="8"
                fontWeight="700"
                fontFamily="Arial, sans-serif"
                letterSpacing="0.3"
            >
                United Arab Emirates
            </text>
        </svg>
    );
}