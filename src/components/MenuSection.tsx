// src/components/MenuSection.tsx
'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import clsx from 'clsx';

type Section = { id: string; label: string };

const SECTIONS: Section[] = [
  { id: 'hero', label: 'Inicio' },
  { id: 'gallery', label: 'Galería' },
  { id: 'description', label: 'Descripción' },
  { id: 'neighborhood', label: 'Servicios' },
];

export function MenuSection() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>('hero');

  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // --- Track visible section to highlight active item ---
  useEffect(() => {
    const elements = SECTIONS.map((s) => document.getElementById(s.id)).filter(
      Boolean,
    ) as HTMLElement[];
    if (observerRef.current) observerRef.current.disconnect();

    observerRef.current = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { root: null, rootMargin: '-1px 0px -80% 0px', threshold: [0, 0.1, 0.25, 0.5, 1] },
    );
    elements.forEach((el) => observerRef.current!.observe(el));
    return () => observerRef.current?.disconnect();
  }, []);

  // --- Prevent body scroll when drawer is open ---
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  // --- Close on Esc while open ---
  useEffect(() => {
    if (!open) return;
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', onEsc);
    return () => document.removeEventListener('keydown', onEsc);
  }, [open]);

  // --- Focus management: move focus into drawer when open; restore to trigger when closed ---
  useEffect(() => {
    if (open) {
      const id = window.setTimeout(() => {
        const closeBtn = panelRef.current?.querySelector<HTMLButtonElement>(
          'button[aria-label="Cerrar menú"]',
        );
        (closeBtn ?? panelRef.current)?.focus?.();
      }, 0);
      return () => window.clearTimeout(id);
    } else {
      buttonRef.current?.focus?.();
    }
  }, [open]);

  const items = useMemo(() => SECTIONS, []);

  const handleClick = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top, behavior: 'smooth' });
    setOpen(false);
  };

  return (
    <div className="sticky top-0 z-40 h-0">
      <div className="relative">
        {/* Trigger kept mounted; hidden & non-interactive while open */}
        <button
          ref={buttonRef}
          type="button"
          aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={open}
          aria-controls="menu-drawer"
          onClick={() => setOpen((v) => !v)}
          className={clsx(
            'absolute right-0 translate-y-3',
            'h-10 w-10 rounded-md',
            'bg-white border border-gray-300 shadow-sm',
            'hover:bg-gray-50 active:bg-gray-100',
            'text-gray-800 select-none',
            'flex items-center justify-center',
            'focus:outline-none focus:ring-2 focus:ring-blue-500',
            'z-1002',
            open && 'opacity-0 pointer-events-none', // <-- hides when open
          )}
          aria-hidden={open ? true : undefined}
          tabIndex={open ? -1 : 0}
        >
          <span className="text-xl leading-none">≡</span>
        </button>
      </div>

      {/* Backdrop */}
      <div
        onClick={() => setOpen(false)}
        className={clsx(
          'fixed inset-0 bg-black/40 transition-opacity z-1000',
          open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none',
        )}
      />

      {/* Drawer panel */}
      <div
        id="menu-drawer"
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Menú de secciones"
        className={clsx(
          'fixed inset-y-0 right-0 w-[86vw] max-w-105', // narrower desktop width
          'bg-white shadow-2xl ring-1 ring-black/10',
          'transition-transform duration-300 ease-out',
          open ? 'translate-x-0' : 'translate-x-full',
          'flex flex-col',
          'z-1001',
        )}
        tabIndex={-1}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
          <span className="text-sm font-semibold text-gray-700">Menú</span>
          <button
            onClick={() => setOpen(false)}
            className="h-8 w-8 rounded-md flex items-center justify-center text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Cerrar menú"
          >
            ✕
          </button>
        </div>

        {/* Items */}
        <nav className="flex-1 overflow-y-auto py-2">
          <ul className="px-2 space-y-1">
            {items.map((item) => {
              const isActive = active === item.id;
              return (
                <li key={item.id}>
                  <button
                    onClick={() => handleClick(item.id)}
                    className={clsx(
                      'w-full text-left px-3 py-3 rounded-md text-[15px] font-medium transition border-l-2',
                      isActive
                        ? 'bg-blue-50 text-blue-700 border-blue-600'
                        : 'text-gray-700 hover:bg-gray-100 border-transparent',
                    )}
                  >
                    {item.label}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Footer helper */}
        <div className="px-4 py-3 border-t border-gray-100 text-xs text-gray-500">
          Usa Esc para cerrar • Pulsa en una sección para navegar
        </div>
      </div>
    </div>
  );
}
