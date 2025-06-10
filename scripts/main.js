import { sdk } from 'https://esm.sh/@farcaster/frame-sdk';

// Wu-Tang name generation data
const prefixes = [
  "Ol'", "Mighty", "Ghost", "Divine", "Master", "Dirty", "Rebel", "Golden",
  "Rogue", "Shadow", "Mystic", "Thunder", "Silent", "Cunning", "Furious",
  "Iron", "Swift", "Mysterious", "Ruthless", "Venomous", "Savage", "Crimson",
  "Arcane", "Stealthy", "Wicked", "Blazing", "Storm", "Supreme", "Royal",
  "Turbo", "Mega", "Ultra", "Hyper", "Wild", "Enigmatic", "Radiant", "Celestial",
  "Dragon", "Tiger", "Wolf", "Lion", "Panther", "Falcon", "Viper", "Cobra",
  "Eagle", "Hawk", "Phoenix", "Alpha", "Omega", "Gamma", "Sigma",
  "Vortex", "Shadowborn", "Lunar", "Ironclad", "Obsidian", "Turbocharged",
  "Solar", "Frostborn", "Infernal", "Wildstyle", "Dynamic", "Warborn", "Titan",
  "Quantum", "Echo", "Phantom", "Zen", "Thunderous", "Untamed", "Savage",
  "Majestic", "Slick", "Ghostly", "Cybernetic", "Magnetic", "Stormborn",
  "Electric", "Merciless", "Monolithic", "Blazing", "Perpetual", "Neo",
  "Spectral", "Volcanic", "Runic", "Titanic", "Elemental", "Omniscient",
  "Draconic", "Epoch", "Spartan", "Nomadic", "Tectonic", "Feral", "Zealous",
  "Dagger", "Warped", "Frost", "Mirrored", "Eldritch", "Crystalline", "Meteoric",
  "Interstellar", "Crimson", "Scarlet", "Azure", "Emerald", "Sapphire", "Ruby", "Ivory", "Onyx",
  "Golden", "Silver", "Bronze", "Copper", "Platinum", "Obsidian", "Pearl", "Cyan",
  "Vermilion", "Indigo", "Amethyst", "Turquoise", "Magenta", "Teal", "Coral",
  "Amber", "Topaz", "Jade", "Garnet"
];

const suffixes = [
  "Shogun", "Samurai", "Monk", "Assassin", "Ninja", "Warrior", "Scholar",
  "Sage", "Chef", "Disciple", "Bastard", "Genius", "Monarch", "Prophet",
  "Champion", "Sentinel", "Nomad", "Reaper", "Titan", "Vanguard",
  "Ronin", "Oracle", "Wanderer", "Mercenary", "Seer", "Gladiator",
  "Alchemist", "Scribe", "Juggernaut", "Phoenix", "Sultan", "Baron", "Outlaw",
  "Leader", "Demon", "Wizard", "Gravedigger", "Wayfarer", "Shepherd"
];

// Generate a Wu-Tang name from user input
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
  img.src = 'assets/wu-logo.png';

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

// Minting an NFT on Base Chain
document.getElementById('mintBtn').addEventListener('click', async (e) => {
  const wuName = e.target.dataset.wuname;
  const mintStatus = document.getElementById('mintStatus');
  const canvas = document.getElementById('wuCanvas');

  if (!canvas) {
    mintStatus.textContent = "Canvas image not found!";
    return;
  }

  // Convert canvas image to base64
  const imageData = canvas.toDataURL("image/png");
  mintStatus.textContent = "Generating NFT data...";

  try {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();

    const contract = new ethers.Contract(contractAddress, abi, signer);
    const tx = await contract.mintTo(await signer.getAddress(), imageData);
    await tx.wait();

    mintStatus.textContent = `NFT minted successfully for "${wuName}"!`;
  } catch (error) {
    mintStatus.textContent = `Minting failed: ${error.message}`;
  }
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

// Initialize Farcaster functionality
async function initializeFarcaster() {
  await sdk.actions.ready();
  const context = await sdk.context;

  async function getFarcasterUsername() {
    return context.user.username;
  }

  const username = await getFarcasterUsername();
  document.getElementById('usernameDisplay').innerHTML = `${username}`;

  document.getElementById('generateBtn')?.addEventListener('click', async () => {
    const username = await getFarcasterUsername();
    if (!username) {
      document.getElementById('result').textContent = "Could not retrieve Farcaster username!";
      return;
    }

    document.getElementById('generateBtn').remove();
    const wuTangName = generateWuTangName(username);
    document.getElementById('result').innerHTML = `From this day forward,<br>you will also be known as<br><br><span>${wuTangName}</span>`;
    drawWuTangImage(wuTangName);
  });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeFarcaster);