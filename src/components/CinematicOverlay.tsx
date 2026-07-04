/**
 * CinematicOverlay — film-grain noise, letterbox bars, and vignette.
 * All purely decorative; disabled on mobile & reduced-motion via CSS.
 */
export function CinematicOverlay() {
  return (
    <>
      {/* Film grain — CSS animation in index.css */}
      <div className="film-grain" aria-hidden="true" />

      {/* Letterbox bars */}
      <div className="letterbox-top" aria-hidden="true" />
      <div className="letterbox-bottom" aria-hidden="true" />

      {/* Vignette */}
      <div className="vignette" aria-hidden="true" />
    </>
  );
}
