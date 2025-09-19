interface FlashOverlayProps {
  isFlashing: boolean;
}

export function FlashOverlay({ isFlashing }: FlashOverlayProps) {
  return (
    <div 
      className={`flash-overlay ${isFlashing ? 'flashing' : ''}`}
      data-testid="flash-overlay"
    />
  );
}
