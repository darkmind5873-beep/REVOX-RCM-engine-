import { Moon, Shield, Sun } from "lucide-react";

type Props = {
  theme: "light" | "dark";
  onToggleTheme: () => void;
};

export default function AppHeader({ theme, onToggleTheme }: Props) {
  return (
    // Main header wrapper with 48px space below to prevent overlapping content
    <header style={{ width: "100%", marginBottom: "48px" }}>
      
      {/* Layout row pushing brand to the left and moon to the right edge */}
      <div style={{ display: "flex", width: "100%", alignItems: "center", justifyContent: "space-between" }}>
        
        {/* Left Side: Modern Landing Page Branding */}
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          
          {/* Brand Icon aligned clean and centered next to the text */}
          <div className="rounded-2xl theme-toggle-btn" style={{ width: "48px", height: "48px", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <Shield size={24} />
          </div>

          {/* Typography Section */}
          <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
            
            {/* Prominent High-Tech Landing Style Title */}
            <h1
              style={{ 
                fontSize: "36px", 
                fontWeight: "800", 
                margin: "0", 
                letterSpacing: "-0.5px",
                lineHeight: "1.1",
                backgroundImage: "linear-gradient(to right, #00f2fe, #4facfe)", /* Cool, energetic blue/cyan gradient highlight */
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              REVOX
            </h1>

            {/* Minimized & Clean Subtitle */}
            <p 
              style={{ 
                color: "var(--text-soft)", 
                fontSize: "13px", 
                fontWeight: "400",
                margin: "0",
                letterSpacing: "0.2px",
                opacity: "0.7"
              }}
            >
              Predictive Claim Intelligence for Revenue Cycle Teams
            </p>

          </div>
        </div>

        {/* Right Side: Theme Toggle Action pinned firmly to the edge */}
        <div style={{ marginLeft: "auto", flexShrink: 0 }}>
          <button
            type="button"
            className="theme-toggle-btn"
            onClick={onToggleTheme}
            aria-label="Toggle theme"
            title={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
            style={{ cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", padding: "10px", borderRadius: "12px" }}
          >
            {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
          </button>
        </div>

      </div>
    </header>
  );
}
