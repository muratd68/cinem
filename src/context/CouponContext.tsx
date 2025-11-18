'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Coupon {
  code: string;
  discount: number; // Percentage
  minAmount: number;
  maxDiscount: number;
  validUntil: string;
  description: string;
}

// Sample coupons
const availableCoupons: Coupon[] = [
  {
    code: 'HOSGELDIN',
    discount: 20,
    minAmount: 100,
    maxDiscount: 50,
    validUntil: '2025-12-31',
    description: 'Yeni üyelere %20 indirim',
  },
  {
    code: 'SINEMA10',
    discount: 10,
    minAmount: 50,
    maxDiscount: 30,
    validUntil: '2025-12-31',
    description: 'Tüm filmlerde %10 indirim',
  },
  {
    code: 'VIP25',
    discount: 25,
    minAmount: 200,
    maxDiscount: 100,
    validUntil: '2025-06-30',
    description: 'VIP koltuklarda %25 indirim',
  },
  {
    code: 'OGRENCI15',
    discount: 15,
    minAmount: 0,
    maxDiscount: 40,
    validUntil: '2025-12-31',
    description: 'Öğrencilere özel %15 indirim',
  },
];

interface CouponContextType {
  appliedCoupon: Coupon | null;
  applyCoupon: (code: string, amount: number) => { success: boolean; message: string; discount: number };
  removeCoupon: () => void;
  calculateDiscount: (amount: number) => number;
  availableCoupons: Coupon[];
}

const CouponContext = createContext<CouponContextType | undefined>(undefined);

export function CouponProvider({ children }: { children: ReactNode }) {
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);

  const applyCoupon = (code: string, amount: number): { success: boolean; message: string; discount: number } => {
    const coupon = availableCoupons.find(
      (c) => c.code.toLowerCase() === code.toLowerCase()
    );

    if (!coupon) {
      return { success: false, message: 'Geçersiz kupon kodu', discount: 0 };
    }

    const now = new Date();
    const validUntil = new Date(coupon.validUntil);
    if (now > validUntil) {
      return { success: false, message: 'Bu kuponun süresi dolmuş', discount: 0 };
    }

    if (amount < coupon.minAmount) {
      return {
        success: false,
        message: `Minimum sepet tutarı ${coupon.minAmount} TL olmalıdır`,
        discount: 0,
      };
    }

    const discount = Math.min((amount * coupon.discount) / 100, coupon.maxDiscount);
    setAppliedCoupon(coupon);

    return {
      success: true,
      message: `${coupon.code} kuponu uygulandı! ${discount.toFixed(0)} TL indirim`,
      discount,
    };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
  };

  const calculateDiscount = (amount: number): number => {
    if (!appliedCoupon) return 0;
    return Math.min((amount * appliedCoupon.discount) / 100, appliedCoupon.maxDiscount);
  };

  return (
    <CouponContext.Provider
      value={{ appliedCoupon, applyCoupon, removeCoupon, calculateDiscount, availableCoupons }}
    >
      {children}
    </CouponContext.Provider>
  );
}

export function useCoupon() {
  const context = useContext(CouponContext);
  if (context === undefined) {
    throw new Error('useCoupon must be used within a CouponProvider');
  }
  return context;
}
