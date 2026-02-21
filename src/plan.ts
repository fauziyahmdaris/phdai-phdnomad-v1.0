export type PlanType = 'trial' | 'mvp' | 'freemium' | null;

export interface PlanInfo {
  plan: PlanType;
  expiresAt?: number; // epoch ms
  licenseKey?: string;
}

const KEY = 'drphdai_plan';

// Add your valid license keys here - UPDATE THIS ARRAY WHEN YOU GET NEW CUSTOMERS
const VALID_LICENSE_KEYS = [
  "DRPHD-AI9X-7B2C-8D3E", // Example key - replace with real ones
  "DRPHD-AIF1-5G6H-7I8J",
  "DRPHD2-1125-phd8-ABYZ",
  "DRPHD3-1125-rx29-XYWE",
  "DRPHD4-1125-kpl3-WQRT",
  "DRPHD5-1125-bv7x-ZMNC",
  "DRPHD6-1125-xd91-PLOK",
  "DRPHD7-1125-zq83-VBNM",
  "DRPHD8-1125-mkw4-ASDF",
  "DRPHD9-1125-ibc2-LKJH",
  "DRPHD10-1125-qnp0-RTYU"
  // Add more keys here as customers purchase
];

export function getPlan(): PlanInfo {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return { plan: null };
    const parsed = JSON.parse(raw) as PlanInfo;
    return parsed;
  } catch {
    return { plan: null };
  }
}

export function setPlan(plan: PlanType, expiresAt?: number) {
  const info: PlanInfo = { plan, expiresAt };
  localStorage.setItem(KEY, JSON.stringify(info));
}

// NEW: Activate with license key
export function activateWithLicenseKey(licenseKey: string): boolean {
  const normalizedKey = licenseKey.toUpperCase().trim();
  
  if (VALID_LICENSE_KEYS.includes(normalizedKey)) {
    const info: PlanInfo = { 
      plan: 'mvp', 
      expiresAt: undefined, // No expiration = lifetime
      licenseKey: normalizedKey 
    };
    localStorage.setItem(KEY, JSON.stringify(info));
    return true;
  }
  return false;
}

export function clearPlan() {
  localStorage.removeItem(KEY);
}

export function isActive(info: PlanInfo = getPlan()): boolean {
  if (!info.plan) return false;
  if (!info.expiresAt) return true;
  return Date.now() < info.expiresAt;
}

export function daysLeft(info: PlanInfo = getPlan()): number | null {
  if (!info.expiresAt) return null;
  const msLeft = info.expiresAt - Date.now();
  return Math.max(0, Math.ceil(msLeft / (1000 * 60 * 60 * 24)));
}

export function extendDays(days: number, base?: number) {
  const start = base ?? Date.now();
  const ms = days * 24 * 60 * 60 * 1000;
  return start + ms;
}

// NEW: Check if user has paid MVP access
export function hasMVPAccess(): boolean {
  const plan = getPlan();
  return plan.plan === 'mvp' && isActive(plan);
}