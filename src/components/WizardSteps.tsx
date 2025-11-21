// =====================================================
// WIZARD STEPS INDICATOR
// Indicador visual de progreso del formulario
// =====================================================

'use client'

import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { WizardStep } from '@/types'

interface WizardStepsProps {
  steps: WizardStep[]
  currentStep: number
}

export function WizardSteps({ steps, currentStep }: WizardStepsProps) {
  return (
    <div className="w-full">
      <nav aria-label="Progress">
        <ol className="flex items-center justify-between">
          {steps.map((step, index) => (
            <li key={step.id} className={cn('relative', index !== steps.length - 1 && 'flex-1')}>
              <div className="flex items-center">
                {/* Circle indicator */}
                <div className="flex flex-col items-center">
                  <div
                    className={cn(
                      'flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all',
                      step.status === 'completed' &&
                        'bg-primary-500 border-primary-500',
                      step.status === 'current' &&
                        'border-primary-500 bg-white',
                      step.status === 'pending' &&
                        'border-gray-300 bg-white'
                    )}
                  >
                    {step.status === 'completed' ? (
                      <Check className="h-5 w-5 text-white" />
                    ) : (
                      <span
                        className={cn(
                          'text-sm font-medium',
                          step.status === 'current' && 'text-primary-500',
                          step.status === 'pending' && 'text-gray-500'
                        )}
                      >
                        {step.id}
                      </span>
                    )}
                  </div>

                  {/* Label */}
                  <div className="mt-2 text-center">
                    <p
                      className={cn(
                        'text-xs font-medium',
                        step.status === 'current' && 'text-primary-600',
                        step.status === 'completed' && 'text-gray-900',
                        step.status === 'pending' && 'text-gray-500'
                      )}
                    >
                      {step.title}
                    </p>
                  </div>
                </div>

                {/* Connector line */}
                {index !== steps.length - 1 && (
                  <div
                    className={cn(
                      'h-0.5 w-full mx-4 transition-all',
                      step.status === 'completed'
                        ? 'bg-primary-500'
                        : 'bg-gray-300'
                    )}
                  />
                )}
              </div>
            </li>
          ))}
        </ol>
      </nav>
    </div>
  )
}
