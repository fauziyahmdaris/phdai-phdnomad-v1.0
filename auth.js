// auth.js

// We assume the plan.ts is already included in the project and the functions are available.

function checkAuthStatus() {
    // Use the existing plan system to check if the user has an active plan.
    const planInfo = getPlan();
    if (isActive(planInfo)) {
        grantFullAccess();
        return true;
    } else {
        showPaywall();
        return false;
    }
}

function showPaywall() {
    // This will hide the main app and show the paywall/sales page
    document.getElementById('main-app').style.display = 'none';
    document.getElementById('paywall').style.display = 'block';
}

function grantFullAccess() {
    // This will hide the paywall and show the full app
    document.getElementById('paywall').style.display = 'none';
    document.getElementById('main-app').style.display = 'block';
}

function handleLicenseSubmit(event) {
    event.preventDefault();
    const inputKey = document.getElementById('licenseKeyInput').value;

    if (validateLicenseKey(inputKey)) {
        // Set the plan to 'mvp' without expiration (one-time fee, lifetime access)
        setPlan('mvp'); // This will set the plan to 'mvp' and no expiration, so isActive() returns true.
        grantFullAccess();
        alert("Welcome! Full access granted.");
    } else {
        alert("Invalid license key. Please try again.");
    }
}

function logout() {
    // Clear the plan from localStorage
    clearPlan();
    checkAuthStatus(); // This will revert to the paywall view
}

// Check authentication status when the page loads
document.addEventListener('DOMContentLoaded', checkAuthStatus);