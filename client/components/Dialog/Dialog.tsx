import { Callout, Card, Metric, Text } from '@tremor/react'
import React, { ElementType } from 'react'

interface IconProps {
  title: string
  icon: ElementType
  color: 'gray' | 'orange' | 'amber' | 'green' | 'indigo' | 'rose' | 'red'
  className: string
  message: string
}

export default function Dialog({ className, title, icon, color, message }: IconProps) {
  return (
    <>
      <Callout
        className={className}
        title={title}
        icon={icon}
        color={color}
      >
        { message }
      </Callout>
    </>
  )
}
