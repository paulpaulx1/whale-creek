'use client';
import { CaretUpIcon, CaretDownIcon } from '@phosphor-icons/react';

export default function GalleryCollapseToggle({ collapsed, onToggle }) {
  return (
    <button
      aria-label={collapsed ? 'Expand gallery' : 'Collapse gallery'}
      type='button'
      onClick={onToggle}
      style={{
        background: '#fff',
        border: '1px solid #e0e0e0',
        borderRadius: '50%',
        width: 45,
        height: 45,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        marginLeft: 10,
        color: '#333'
      }}
    >
      {collapsed ? <CaretUpIcon size={32} /> : <CaretDownIcon size={32} />}
    </button>
  );
}
