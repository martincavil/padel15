import type { SanityDailySpecial } from "@/sanity/client";

interface Props {
  specials: SanityDailySpecial[];
}

export function ChalkboardSpecials({ specials }: Props) {
  if (!specials.length) return null;

  const chalkText: React.CSSProperties = {
    fontFamily: "var(--font-chalk)",
    color: "rgba(240,234,214,0.92)",
    textShadow:
      "0 0 6px rgba(240,234,214,0.25), 0 0 2px rgba(240,234,214,0.15)",
  };

  return (
    <div
      style={{
        borderRadius: "14px",
        overflow: "hidden",
        boxShadow:
          "0 24px 64px rgba(0,0,0,0.65), 0 4px 16px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.05)",
        border: "2px solid rgba(255,255,255,0.07)",
      }}
    >
      {/* Surface ardoise noire texturée */}
      <div
        style={{
          backgroundColor: "#101010",
          backgroundImage: [
            /* grain diagonal fin — strates naturelles de l'ardoise */
            "repeating-linear-gradient(-58deg, transparent 0px, transparent 1px, rgba(255,255,255,0.007) 1px, rgba(255,255,255,0.007) 2px)",
            "repeating-linear-gradient(32deg,  transparent 0px, transparent 2px, rgba(0,0,0,0.07) 2px, rgba(0,0,0,0.07) 3px)",
            /* légère variation de luminosité pour le relief */
            "linear-gradient(160deg, rgba(255,255,255,0.025) 0%, transparent 45%, rgba(0,0,0,0.12) 100%)",
          ].join(", "),
          padding: "32px 28px 26px",
          position: "relative",
        }}
      >
        {/* Vignette — assombrissement sur les bords */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse 90% 85% at 50% 45%, transparent 35%, rgba(0,0,0,0.55) 100%)",
            pointerEvents: "none",
          }}
        />

        {/* Encadré chalk intérieur pointillé */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: "10px",
            border: "1px dashed rgba(240,234,214,0.12)",
            borderRadius: "8px",
            pointerEvents: "none",
          }}
        />

        {/* Contenu */}
        <div style={{ position: "relative" }}>
          {/* Titre */}
          <div className="text-center mb-6">
            <p
              style={{
                ...chalkText,
                fontSize: "11px",
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                color: "rgba(240,234,214,0.38)",
                fontFamily: "var(--font-chalk)",
                marginBottom: "6px",
              }}
            >
              ✦ &nbsp; aujourd&apos;hui &nbsp; ✦
            </p>
            <h3
              style={{
                ...chalkText,
                fontSize: "32px",
                fontWeight: 700,
                lineHeight: 1.1,
                letterSpacing: "0.01em",
              }}
            >
              Menu du jour
            </h3>

            {/* Ligne chalk sous le titre */}
            <div
              style={{
                height: "1.5px",
                marginTop: "12px",
                marginLeft: "20px",
                marginRight: "20px",
                background:
                  "repeating-linear-gradient(90deg, transparent 0, transparent 4px, rgba(240,234,214,0.28) 4px, rgba(240,234,214,0.28) 10px)",
                borderRadius: "2px",
              }}
            />
          </div>

          {/* Plats */}
          <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
            {specials.map((special, idx) => (
              <div key={special._id}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "baseline",
                    justifyContent: "space-between",
                    gap: "12px",
                  }}
                >
                  <p style={{ ...chalkText, fontSize: "22px", lineHeight: 1.2 }}>
                    {special.title}
                  </p>
                  <span
                    style={{
                      ...chalkText,
                      fontSize: "24px",
                      fontWeight: 700,
                      whiteSpace: "nowrap",
                      flexShrink: 0,
                    }}
                  >
                    {special.price}&thinsp;€
                  </span>
                </div>
                {special.description && (
                  <p
                    style={{
                      fontFamily: "var(--font-chalk)",
                      fontSize: "16px",
                      color: "rgba(240,234,214,0.48)",
                      marginTop: "2px",
                      lineHeight: 1.35,
                    }}
                  >
                    {special.description}
                  </p>
                )}

                {/* Séparateur pointillé entre items */}
                {idx < specials.length - 1 && (
                  <div
                    style={{
                      height: "1px",
                      marginTop: "16px",
                      background:
                        "repeating-linear-gradient(90deg, transparent 0, transparent 6px, rgba(240,234,214,0.12) 6px, rgba(240,234,214,0.12) 12px)",
                    }}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Petits points chalk décoratifs en bas */}
          <div
            aria-hidden
            style={{
              marginTop: "22px",
              display: "flex",
              justifyContent: "center",
              gap: "6px",
            }}
          >
            {[0.15, 0.22, 0.32, 0.22, 0.15].map((opacity, i) => (
              <span
                key={i}
                style={{
                  display: "inline-block",
                  width: i === 2 ? "5px" : "3.5px",
                  height: i === 2 ? "5px" : "3.5px",
                  borderRadius: "50%",
                  background: `rgba(240,234,214,${opacity})`,
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
