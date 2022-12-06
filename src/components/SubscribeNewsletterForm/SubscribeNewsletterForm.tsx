import React, { useState } from 'react'
import classNames from 'classnames'
import Button from '../common/Button'
import { FormState } from '../../types/FormState'
import { Forms, useForm } from '../../hooks/useForm'
import { subscribeToNewsletter } from '../../helpers/api'
import { useViewTracking } from '../../context/HistoryListener'

import styles from './SubscribeNewsletterForm.module.scss'

import { ReactComponent as ArrowSVG } from './ArrowSVG.svg'
import { ReactComponent as TickSVG } from './TickSVG.svg'
import { ReactComponent as ErrorSVG } from './ErrorSVG.svg'

interface SubscribeNewsletterFormProps {
  variant?: 'primary' | 'white' | 'dark'
  size?: 'small' | 'big'
  origin: Forms
}

export default function SubscribeNewsletterForm({
  variant = 'primary',
  origin,
  size = 'small',
}: SubscribeNewsletterFormProps) {
  const [email, setEmail] = useState('')
  const { formState, errorMessage, updateFormState, updateErrorMessage } = useForm(origin)
  const { utmParams } = useViewTracking()

  async function handleSubmit(e) {
    e.preventDefault()

    try {
      updateFormState(FormState.Loading)
      const response = await subscribeToNewsletter(email, utmParams)
      const status = response.status
      const { ok, error } = await response.json()

      if (status !== 200 || !ok) {
        onError(error)
      } else {
        updateFormState(FormState.Success)
      }
    } catch (error) {
      onError()
    }

    function onError(error?) {
      updateFormState(FormState.Failed)
      if (error?.message) {
        if (error?.data?.[0]?.instancePath) {
          updateErrorMessage(`Validation error for ${error?.data[0]?.instancePath.substring(1)}`)
        } else if (error?.param === 'Email') {
          updateErrorMessage('Invalid email')
        } else {
          updateErrorMessage('Please try again')
        }
      }
      setTimeout(() => {
        updateFormState(FormState.Default)
      }, 10000)
    }
  }

  return size === 'small' ? (
    <div
      className={classNames(
        styles.wrapper,
        { [styles.primary]: variant === 'primary' },
        { [styles.white]: variant === 'white' }
      )}
    >
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          className={styles.input}
          id='email'
          maxLength={64}
          name='email'
          size={20}
          type='email'
          placeholder='john@company.com'
          onChange={(e) => setEmail(e.target.value)}
          disabled={formState === FormState.Loading}
          required
        />
        <Button
          type='submit'
          size={variant === 'primary' ? 'big' : 'medium'}
          className={classNames(styles.button, { [styles.loadingButton]: formState === FormState.Loading })}
          disabled={formState === FormState.Loading}
          variant={variant === 'primary' ? 'primary' : 'white'}
        >
          Subscribe
        </Button>
      </form>
      {formState === FormState.Loading && <span className={styles.message}>Please wait...</span>}
      {formState === FormState.Success && (
        <span className={styles.message}>You have been successfully subscribed!</span>
      )}
      {formState === FormState.Failed && <span className={styles.failedMessage}>{errorMessage}</span>}
    </div>
  ) : (
    <div
      className={classNames(
        styles.widgetBig,
        { [styles.white]: variant === 'white' },
        { [styles.dark]: variant === 'dark' }
      )}
    >
      {formState === FormState.Default && (
        <form className={styles.form} onSubmit={handleSubmit}>
          <input
            className={styles.input}
            id='email'
            maxLength={64}
            name='email'
            size={20}
            type='email'
            placeholder='Email address*'
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button className={styles.arrowButton}>
            <ArrowSVG className={styles.arrow} />
          </button>
        </form>
      )}

      {formState === FormState.Loading && <span className={styles.message}>Please wait...</span>}
      {formState === FormState.Success && (
        <span className={styles.message}>
          You are now subscribed
          <TickSVG />
        </span>
      )}
      {formState === FormState.Failed && (
        <span className={styles.failedMessage}>
          <ErrorSVG />
          Something went wrong
        </span>
      )}
    </div>
  )
}
