import React, { Fragment } from 'react';
import { XIcon } from 'lucide-react';
import Button from './Button';
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  size?: 'small' | 'medium' | 'large';
  closeOnOverlayClick?: boolean;
}
const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  footer,
  size = 'medium',
  closeOnOverlayClick = true
}) => {
  if (!isOpen) return null;
  const sizeClasses = {
    small: 'max-w-md',
    medium: 'max-w-lg',
    large: 'max-w-2xl'
  };
  const handleOverlayClick = (e: React.MouseEvent) => {
    if (closeOnOverlayClick && e.target === e.currentTarget) {
      onClose();
    }
  };
  return <Fragment>
      <div className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity" onClick={handleOverlayClick} />
      <div className="fixed inset-0 z-50 overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <div className={`
              relative transform overflow-hidden rounded-lg bg-white dark:bg-gray-800 
              text-left shadow-xl transition-all sm:my-8 w-full
              ${sizeClasses[size]}
            `}>
            {/* Header */}
            {title && <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                    {title}
                  </h3>
                  <Button variant="ghost" size="sm" onClick={onClose} className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300">
                    <XIcon size={20} />
                  </Button>
                </div>
              </div>}
            {/* Content */}
            <div className="px-6 py-4">{children}</div>
            {/* Footer */}
            {footer && <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700/50 border-t border-gray-200 dark:border-gray-700">
                {footer}
              </div>}
          </div>
        </div>
      </div>
    </Fragment>;
};
export default Modal;