import { WORKER_STRESS_MAX, WORKER_HAPINESS_MAX } from './constants'

export const stressPercentage = (stressLevel) => {
  return Math.ceil((stressLevel * 100) / WORKER_STRESS_MAX)
}

export const happinessPercentage = (happinessLevel) => {
  return Math.ceil((happinessLevel * 100) / WORKER_HAPINESS_MAX)
}
