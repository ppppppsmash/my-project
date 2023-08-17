import { Callout, Card, Metric, Text } from '@tremor/react'
import React, { ElementType } from 'react'

interface IconProps {
  title: string
  icon: ElementType
  color: 'gray' | 'orange' | 'amber' | 'green' | 'indigo' | 'rose'
  className: string
}

export default function PsiDialog({ className, title, icon, color }: IconProps) {
  return (
    <>
      <Callout
        className={className}
        title={title}
        icon={icon}
        color={color}
      ></Callout>
    </>
  )
}
