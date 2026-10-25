import type { ButtonNumber } from './input'

// What each button number stands for on a controller, as the design's legend
// writes it (1 front punch, 2 back punch, 3 front kick, 4 back kick).
export function buttonLabel(button: ButtonNumber): string {
  const labels: Record<ButtonNumber, string> = {
    '1': 'LP / SQUARE',
    '2': 'HP / TRIANGLE',
    '3': 'LK / X',
    '4': 'HK / CIRCLE',
  }
  return labels[button]
}
