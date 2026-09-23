// Curva de animação padrão do site: sai rápido e chega devagar, sem quicar
export const EASE = [0.22, 1, 0.36, 1]

// Transição usada por padrão em todos os componentes motion (via MotionConfig no App)
export const DEFAULT_TRANSITION = { duration: 0.7, ease: EASE }
