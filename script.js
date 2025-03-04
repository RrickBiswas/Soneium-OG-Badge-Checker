async function checkEligibility() {
    const wallet = document.getElementById("wallet").value.trim().toLowerCase();
    const resultDiv = document.getElementById("result");

    if (!wallet) {
        resultDiv.innerHTML = "❌ Please enter a wallet address.";
        return;
    }

    try {
        const response = await fetch("/api/check?wallet=" + wallet);
        const data = await response.json();

        if (data.eligible) {
            resultDiv.innerHTML = `<span style="color:green;">✅ Eligible: You have received the Soneium OG Badge.</span>`;
        } else {
            resultDiv.innerHTML = `<span style="color:red;">❌ Not Eligible: You have not received the badge.</span>`;
        }
    } catch (error) {
        resultDiv.innerHTML = "❌ Error checking eligibility.";
        console.error("Fetch Error:", error);
    }
}
