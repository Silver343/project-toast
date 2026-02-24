import React from 'react';
import UseEscapeKey from '../../hooks/UseEscapeKey'

export const ToastContext = React.createContext();

function ToastProvider({ children }) {
    const [toasts, setToasts] = React.useState([
    {
        id: crypto.randomUUID(),
        message: 'Oh no!',
        variant: 'error',
    },
    {
        id: crypto.randomUUID(),
        message: 'Logged in',
        variant: 'success',
    },
    ]);

    function createToast(message, variant) {

        const nextToasts = [
        ...toasts,
        {
            id: crypto.randomUUID(),
            message,
            variant,
        },
        ];

        setToasts(nextToasts);
  }

    function dismissToast(id) {
        const nextToasts = toasts.filter((toast) => {
        return toast.id !== id;
        });

        setToasts(nextToasts);
  }

  const handleEscape = React.useCallback(() => {
  setToasts([]);
}, []);

UseEscapeKey(handleEscape);

    return (
        <ToastContext.Provider value={{ toasts, createToast, dismissToast }}>
            {children}
        </ToastContext.Provider>
    )

}

export default ToastProvider;
