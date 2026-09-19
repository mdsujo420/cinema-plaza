// ==========================================
// MOVEBOX ADS CONFIGURATION & PLACEMENT
// ==========================================

// ১. এডসেন্স কনফিগারেশন (আপনার ক্লায়েন্ট আইডি দিন)
const ADSENSE_CLIENT_ID = "ca-pub-XXXXXXXXXXXXXXXX"; // <-- আপনার AdSense Publisher ID এখানে বসাবেন

// ২. অটো এডসেন্স স্ক্রিপ্ট লোডার
(function loadAdSense() {
    if(ADSENSE_CLIENT_ID && ADSENSE_CLIENT_ID !== "ca-pub-XXXXXXXXXXXXXXXX") {
        const script = document.createElement('script');
        script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT_ID}`;
        script.async = true;
        script.crossOrigin = "anonymous";
        document.head.appendChild(script);
    }
})();

// ৩. এড ব্যানার রেন্ডারিং ফাংশন
function renderAdBanner(containerId, adType = 'banner', slotId = '') {
    const container = document.getElementById(containerId);
    if (!container) return;

    // যদি এডসেন্স অ্যাক্টিভ না থাকে বা কাস্টম ব্যাকআপ এড (Adsterra/Native/Banner) দেখাতে চান:
    if (!slotId) {
        container.innerHTML = `
            <div class="movebox-ad-box ${adType}-ad">
                <div class="ad-tag">SPONSORED AD</div>
                <div class="ad-content-dummy">
                    <a href="https://example.com" target="_blank" rel="nofollow">
                        <img src="https://via.placeholder.com/${adType === 'leaderboard' ? '728x90' : '300x250'}?text=Your+Ad+Here" alt="Ad">
                    </a>
                </div>
            </div>
        `;
    } else {
        // রিয়েল গুগল এডসেন্স স্লট
        container.innerHTML = `
            <div class="movebox-ad-box">
                <div class="ad-tag">ADVERTISEMENT</div>
                <ins class="adsbygoogle"
                     style="display:block"
                     data-ad-client="${ADSENSE_CLIENT_ID}"
                     data-ad-slot="${slotId}"
                     data-ad-format="auto"
                     data-full-width-responsive="true"></ins>
            </div>
        `;
        try {
            (adsbygoogle = window.adsbygoogle || []).push({});
        } catch (e) {}
    }
}

// ৪. পপ-আপ / ডিরেক্ট লিংক এডস (Adsterra / Popunder Support)
function triggerPopunderAd() {
    // Adsterra / Popunder Script Integration Point
    console.log("Popunder Ad Ready");
}
