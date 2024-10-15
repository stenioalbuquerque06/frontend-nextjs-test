import { createContext, useState, useContext, ReactNode } from 'react'
import { IToastMessage } from '@/types/toast-message'

interface ToastContextProps {
  toastMessages: IToastMessage[]
  addToast: (message: string, type: 'success' | 'error', duration?: number) => void
  removeToast: (id: number) => void
}

const ToastContext = createContext<ToastContextProps | undefined>(undefined)
let toastId = 0
export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toastMessages, setMessage] = useState<IToastMessage[]>([])

  const addToast = (message: string, type: 'success' | 'error', duration?: number) => {
    toastId += 1
    const newToastMessage: IToastMessage = {
      id: toastId,
      message: message,
      type: type,
      duration: duration || 5000,
    }
    setMessage(prevNotifications => [...prevNotifications, newToastMessage])
  }

  const removeToast = (id: number) => {
    setMessage(prevToasts => prevToasts.filter(toast => toast.id !== id))
  }

  return <ToastContext.Provider value={{ toastMessages, addToast, removeToast }}>{children}</ToastContext.Provider>
}

export const useToast = () => {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider.')
  }
  return context
}
