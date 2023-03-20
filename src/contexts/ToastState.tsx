import * as React from 'react';

const ToastContext = React.createContext<any>([]);

const ToastProvider = ({ children } : any) => {
  const [toastState, setToastState] = React.useState<object[]>([]);
  
  return <ToastContext.Provider value={{ toastState, setToastState }}>{children}</ToastContext.Provider>;
};

const useToast = () => {
  const context = React.useContext(ToastContext);

  if (context === undefined)
    throw new Error("useTheme must be within ToastProvider!");

  return context;
};

export { ToastProvider, useToast };