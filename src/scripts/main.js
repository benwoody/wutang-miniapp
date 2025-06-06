// Wu-Tang Name Generator logic and NFT mint button handling

const prefixes = [
  "Ol'", "Mighty", "Ghost", "Divine", "Master", "Dirty", "Rebel", "Golden",
  "Rogue", "Shadow", "Mystic", "Thunder", "Silent", "Cunning", "Furious",
  "Iron", "Swift", "Mysterious", "Ruthless", "Venomous", "Savage", "Crimson",
  "Arcane", "Stealthy", "Wicked", "Blazing", "Storm"
];
const suffixes = [
  "Shogun", "Samurai", "Monk", "Assassin", "Ninja", "Warrior", "Scholar",
  "Sage", "Chef", "Disciple", "Bastard", "Genius", "Monarch", "Tiger", "Dragon",
  "Prophet", "Champion", "Sentinel", "Nomad", "Reaper", "Titan", "Vanguard",
  "Ronin", "Oracle", "Wanderer", "Mercenary", "Seer", "Gladiator"
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

document.getElementById('generateBtn').addEventListener('click', () => {
  const userInput = document.getElementById('userInput').value.trim();
  const resultDiv = document.getElementById('result');
  const mintBtn = document.getElementById('mintBtn');
  const mintStatus = document.getElementById('mintStatus');
  const canvas = document.getElementById('wuCanvas');
  const downloadBtn = document.getElementById('downloadBtn');
  mintStatus.textContent = '';
  if (!userInput) {
    resultDiv.textContent = "Please enter a name or Farcaster ID!";
    mintBtn.style.display = "none";
    if (canvas) canvas.style.display = "none";
    if (downloadBtn) downloadBtn.style.display = "none";
    return;
  }
  const wuName = generateWuTangName(userInput);
  resultDiv.innerHTML = `Your Wu-Tang name:<br><span>${wuName}</span>`;
  mintBtn.style.display = "inline-block";
  mintBtn.dataset.wuname = wuName;
  drawWuTangImage(wuName);
  if (downloadBtn) downloadBtn.style.display = "inline-block";
});

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