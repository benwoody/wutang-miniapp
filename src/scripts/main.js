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

document.getElementById('generateBtn').addEventListener('click', () => {
  const userInput = document.getElementById('userInput').value.trim();
  const resultDiv = document.getElementById('result');
  const mintBtn = document.getElementById('mintBtn');
  const mintStatus = document.getElementById('mintStatus');
  mintStatus.textContent = '';
  if (!userInput) {
    resultDiv.textContent = "Please enter a name or Farcaster ID!";
    mintBtn.style.display = "none";
    return;
  }
  const wuName = generateWuTangName(userInput);
  resultDiv.textContent = `Your Wu-Tang name: ${wuName}`;
  mintBtn.style.display = "inline-block";
  mintBtn.dataset.wuname = wuName;
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