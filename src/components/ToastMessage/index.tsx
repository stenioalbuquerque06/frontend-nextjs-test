import React, { useEffect } from 'react'

import styles from './style.module.css'
import { useToast } from '@/contexts/ToastContext'

export const ToastMessage: React.FC = () => {
  const { toastMessages, removeToast } = useToast()

  useEffect(() => {
    const lastToastInList = toastMessages[toastMessages.length - 1]
    if (!lastToastInList) return
    setTimeout(() => {
      removeToast(lastToastInList.id)
    }, lastToastInList.duration)
  }, [toastMessages])
  return (
    <>
      {toastMessages.map(data => (
        <div key={data.id} className={styles.container} data-toast-type={data.type} data-toast-id={data.id}>
          <span data-content>{data.message}</span>
          <span data-close onClick={() => removeToast(data.id)}>
            ╳
          </span>
        </div>
      ))}
    </>
  )
}
