import React, { useState, useRef } from 'react'
import classNames from 'classnames'
import styles from './RangeSlider.module.scss'

export interface SliderValue {
  label: string
  value: number
}

interface RangeSliderProps {
  currentValue: number // index for range slider
  values: Array<SliderValue>
  config: {
    min: number
    max: number
  }
  handleValueChange: (arg0: number) => void
  labelsBelow?: boolean
}

export default function RangeSlider({
  currentValue,
  values,
  config: { min, max },
  handleValueChange,
  labelsBelow,
}: RangeSliderProps) {
  const thumbSize = labelsBelow ? 22 : 18
  const ref = useRef<HTMLInputElement | null>(null)

  const changeSliderValue = (value: number) => {
    handleValueChange(value)
    setSliderOffsetCss(calculateSliderOffset(min, max, value))
  }

  const handleSliderValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    ref.current?.setAttribute('step', 'any')
    const newValue = Number(e.target.value)
    changeSliderValue(newValue)
  }

  const moveToClosestValue = () => {
    ref.current?.setAttribute('step', '1')
    setSliderOffsetCss(calculateSliderOffset(min, max, Math.round(currentValue)))
  }

  const calculateSliderOffset = (min: number, max: number, value: number) => {
    const ratio = ((value - min) * 100) / (max - min)
    // Input thumb offset: https://stackoverflow.com/a/49122957
    const leftOffsetCss = `calc(${ratio}% + ${thumbSize / 2}px - ${(thumbSize * ratio) / 100}px)`

    return leftOffsetCss
  }

  const [sliderOffsetCss, setSliderOffsetCss] = useState(calculateSliderOffset(min, max, currentValue))

  return (
    <div
      className={classNames(styles.slider, { [styles.sliderLabelsBelow]: labelsBelow })}
      style={{ '--left': sliderOffsetCss, '--thumb-size': `${thumbSize}px` } as React.CSSProperties}
    >
      {!labelsBelow && (
        <>
          <label htmlFor='billingSlider' className={styles.label}>
            {values.map((value, index) => {
              return (
                <span
                  key={`slider_label_${value.label}`}
                  className={styles.text}
                  onClick={() => changeSliderValue(index)}
                >
                  {value.label}
                </span>
              )
            })}
          </label>
        </>
      )}
      <div className={classNames(styles.inputContainer, { [styles.containerLabelsBelow]: labelsBelow })}>
        <input
          className={classNames(styles.input, { [styles.inputLabelsBelow]: labelsBelow })}
          type='range'
          min={min}
          max={max}
          value={currentValue}
          name='billing-slider'
          aria-label='Price slider'
          onChange={handleSliderValueChange}
          step={'any'}
          onMouseUp={moveToClosestValue}
          onTouchEnd={moveToClosestValue}
          ref={ref}
        />
      </div>
      {labelsBelow && (
        <label htmlFor='billingSlider' className={styles.labelBelow}>
          {values.map((value, index) => {
            return (
              <span
                key={`slider_label_${value.label}`}
                className={styles.labelBelowText}
                onClick={() => changeSliderValue(index)}
              >
                {value.label}
              </span>
            )
          })}
        </label>
      )}
    </div>
  )
}
