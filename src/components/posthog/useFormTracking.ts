import { usePostHog } from 'posthog-js/react'
import { useEffect, useRef } from 'react'

export function useFormTracking(stepNumber: number, stepName: string) {
    const posthog = usePostHog()
    const startTime = useRef(Date.now())

    useEffect(() => {
        startTime.current = Date.now() // reset when step mounts
    }, [stepNumber])

    const posthogCaptureStepCompleted = () => {
        posthog.capture('form_step_completed', {
            step_number: stepNumber,
            step_name: stepName,
            time_spent_seconds: Math.round((Date.now() - startTime.current) / 1000),
        })
    }

    return { posthogCaptureStepCompleted: posthogCaptureStepCompleted }
}