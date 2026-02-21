import React from 'react';

interface Props {
  size?: number;
  className?: string;
}

const OwlIcon: React.FC<Props> = ({ size = 18, className }) => (
  <img
    src="/icons/owl.svg"
    width={size}
    height={size}
    alt="DrPhDAI Owl"
    className={className || 'inline-block'}
    loading="lazy"
  />
);

export default OwlIcon;
