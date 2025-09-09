export function installPreventZoomHandlers(): void {
  // Prevent zooming with more than one finger
  document.addEventListener('touchstart', function (e: TouchEvent) {
    if (e.touches.length > 1) {
      e.preventDefault(); // Prevent zoom
    }
  }, { passive: false });

  // Prevent pinch zooming with gestures
  document.addEventListener('gesturestart' as any, function (e: Event) {
    e.preventDefault(); // Prevent zoom gesture
  }, { passive: false });
}
document.addEventListener(
  "wheel",
  function (e) {
    if (e.ctrlKey) {
      e.preventDefault();
    }
  },
  {
    passive: false
  }
);
document.addEventListener("keydown", 
function (e) {
  if (
    e.ctrlKey &&
    (e.key === "+" ||
      e.key === "-" ||
      e.key === "=")
  ) {
    e.preventDefault();
  }
});