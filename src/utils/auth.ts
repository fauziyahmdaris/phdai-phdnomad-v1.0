// auth.ts
import { hasMVPAccess, activateWithLicenseKey, clearPlan } from '../plan';

export function checkAuthStatus(): boolean {
  if (hasMVPAccess()) {
    grantFullAccess();
    return true;
  } else {
    showPaywall();
    return false;
  }
}

export function showPaywall() {
  // Hide main app, show paywall
  const mainApp = document.getElementById('main-app');
  const paywall = document.getElementById('paywall');
  
  if (mainApp) mainApp.style.display = 'none';
  if (paywall) paywall.style.display = 'block';
}

export function grantFullAccess() {
  // Hide paywall, show main app
  const mainApp = document.getElementById('main-app');
  const paywall = document.getElementById('paywall');
  
  if (paywall) paywall.style.display = 'none';
  if (mainApp) mainApp.style.display = 'block';
}

export function handleLicenseSubmit(event: Event) {
  event.preventDefault();
  const inputElement = document.getElementById('licenseKeyInput') as HTMLInputElement;
  
  if (!inputElement) return;
  
  const inputKey = inputElement.value;

  if (activateWithLicenseKey(inputKey)) {
    grantFullAccess();
    alert("Welcome! Full MVP access granted.");
  } else {
    alert("Invalid license key. Please check your email for the correct key or contact support.");
  }
}

export function logout() {
  clearPlan();
  checkAuthStatus();
}

// Initialize auth when page loads
document.addEventListener('DOMContentLoaded', checkAuthStatus);