import React, { ButtonHTMLAttributes } from 'react';

import './Button.scss';

/**
 * Button component props.
 */
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Button variant.
   */
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning';
  /**
   * Button size.
   */
  size?: 'sm' | 'md' | 'lg';
}

/**
 * Button component.
 */
export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  ...rest
}) => {
  const buttonClass = `button button--${variant} button--${size}`;

  return (
    <button className={buttonClass} {...rest}>
      {children}
    </button>
  );
};
