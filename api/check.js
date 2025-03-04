export default async function handler(req, res) {
    const { wallet } = req.query;

    if (!wallet) {
        return res.status(400).json({ error: "Wallet address is required." });
    }

    const apiUrl = "https://soneium.blockscout.com/api?module=token&action=getTokenHolders&contractaddress=0x2A21B17E366836e5FFB19bd47edB03b4b551C89d";
    
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (!data.result || !Array.isArray(data.result)) {
            return res.status(500).json({ error: "Failed to fetch token holders." });
        }

        const holders = data.result.map(holder => holder.address.toLowerCase());

        return res.json({ eligible: holders.includes(wallet) });
    } catch (error) {
        return res.status(500).json({ error: "Error fetching data." });
    }
}
