// Wu-Tang Name Generator logic and NFT mint button handling

import { sdk } from '@farcaster/frame-sdk'
await sdk.actions.ready();

const prefixes = [
  "Ol'", "Mighty", "Ghost", "Divine", "Master", "Dirty", "Rebel", "Golden",
  "Rogue", "Shadow", "Mystic", "Thunder", "Silent", "Cunning", "Furious",
  "Iron", "Swift", "Mysterious", "Ruthless", "Venomous", "Savage", "Crimson",
  "Arcane", "Stealthy", "Wicked", "Blazing", "Storm", "Supreme", "Royal",
  "Atomic", "Cosmic", "Electric", "Lyrical", "Infinite", "Dynamic", "Bronze",
  "Silver", "Platinum", "Diamond", "Obsidian", "Solar", "Lunar", "Frosty",
  "Icy", "Fire", "Shadowy", "Vicious", "Silent", "Rapid", "Majestic", "Noble",
  "Fearless", "Bold", "Ancient", "Modern", "Digital", "Analog", "Quantum",
  "Turbo", "Mega", "Ultra", "Hyper", "Wild", "Enigmatic", "Radiant", "Celestial",
  "Galactic", "Nebula", "Stellar", "Meteoric", "Eternal", "Sacred", "Blessed",
  "Cyborg", "Samurai", "Ninja", "Dragon", "Tiger", "Wolf", "Lion", "Panther",
  "Falcon", "Viper", "Cobra", "Jaguar", "Rhino", "Ox", "Bear", "Eagle", "Hawk",
  "Phoenix", "Grim", "Shadowfax", "Turbo", "Alpha", "Omega", "Beta", "Gamma",
  "Delta", "Sigma", "Zeta", "Razor", "Blade", "Steel", "Stone", "Brick", "Marble",
  "Ivory", "Onyx", "Pearl", "Ruby", "Sapphire", "Emerald", "Opal", "Topaz"
];
const suffixes = [
  "Shogun", "Samurai", "Monk", "Assassin", "Ninja", "Warrior", "Scholar",
  "Sage", "Chef", "Disciple", "Bastard", "Genius", "Monarch", "Tiger", "Dragon",
  "Prophet", "Champion", "Sentinel", "Nomad", "Reaper", "Titan", "Vanguard",
  "Ronin", "Oracle", "Wanderer", "Mercenary", "Seer", "Gladiator",
  "Alchemist", "Scribe", "Juggernaut", "Phoenix", "Sultan", "Baron", "Bandit", "Outlaw"
];

function generateWuTangName(seed) {
  if (!seed) return "";
  const hash = Array.from(seed).reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const prefix = prefixes[hash % prefixes.length];
  const suffix = suffixes[hash % suffixes.length];
  return `${prefix} ${suffix}`;
}

// Draws the Wu-Tang name on the Wu-Tang logo background
function drawWuTangImage(wuName) {
  const canvas = document.getElementById('wuCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const img = new Image();
  img.src = 'assets/wu-logo.png'; // Make sure this path is correct

  img.onload = function() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

    // Draw the Wu-Tang name text
    ctx.font = "bold 32px Impact, Arial Black, sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.lineWidth = 6;
    ctx.strokeStyle = "#181818";
    ctx.fillStyle = "#f1c40f";
    // Stroke for contrast
    ctx.strokeText(wuName, canvas.width / 2, canvas.height / 2 + 3);
    ctx.fillText(wuName, canvas.width / 2, canvas.height / 2 + 3);

    canvas.style.display = "block";
  };
}

// Get Farcaster username and generate Wu-Tang name
async function initWithFarcaster() {
  const resultDiv = document.getElementById('result');
  const mintBtn = document.getElementById('mintBtn');
  const mintStatus = document.getElementById('mintStatus');
  const canvas = document.getElementById('wuCanvas');
  const downloadBtn = document.getElementById('downloadBtn');

  try {
    const context = await sdk.getContext();
    const username = context?.user?.username;
    
    if (!username) {
      resultDiv.textContent = "Could not get Farcaster username";
      mintBtn.style.display = "none";
      if (canvas) canvas.style.display = "none";
      if (downloadBtn) downloadBtn.style.display = "none";
      return;
    }

    const wuName = generateWuTangName(username);
    resultDiv.innerHTML = `@${username}'s Wu-Tang name:<br><br><span>${wuName}</span>`;
    mintBtn.style.display = "inline-block";
    mintBtn.dataset.wuname = wuName;
    drawWuTangImage(wuName);
    if (downloadBtn) downloadBtn.style.display = "inline-block";

  } catch (err) {
    console.error("Error getting Farcaster context:", err);
    resultDiv.textContent = "Error getting Farcaster username";
    mintBtn.style.display = "none";
    if (canvas) canvas.style.display = "none";
    if (downloadBtn) downloadBtn.style.display = "none";
  }
}

// Initialize when the page loads
window.addEventListener('DOMContentLoaded', initWithFarcaster);

document.getElementById('mintBtn').addEventListener('click', async (e) => {
  const wuName = e.target.dataset.wuname;
  const mintStatus = document.getElementById('mintStatus');
  mintStatus.textContent = "Connecting wallet and minting NFT...";

  // Placeholder for wallet/NFT logic
  setTimeout(() => {
    mintStatus.textContent = `NFT minted for "${wuName}"! (Demo only)`;
  }, 2000);
});

// Download button logic
const downloadBtn = document.getElementById('downloadBtn');
if (downloadBtn) {
  downloadBtn.addEventListener('click', () => {
    const canvas = document.getElementById('wuCanvas');
    if (!canvas) return;
    const link = document.createElement('a');
    link.download = 'wu-tang-name.png';
    link.href = canvas.toDataURL();
    link.click();
  });
}