// ==========================================
// MOVIE PLAZA - SMART AD SYSTEM (READY TO USE)
// Networks: Adsterra, Monetag, Adetika
// ==========================================

const ADS_CONFIG = {
    // ১. ADSTERRA (এখানে Adsterra-র কোড ও ডিরেক্ট লিংক বসাবেন)
    adsterra: {
        active: true,
        popunderUrl: "", // <-- এখানে Adsterra-র Popunder/Direct Link পেস্ট করবেন
        bannerCode: ``   // <-- এখানে Adsterra-র Banner HTML/JS কোড পেস্ট করবেন
    },

    // ২. MONETAG (এখানে Monetag-এর তথ্য বসাবেন)
    monetag: {
        active: true,
        tagScriptUrl: "", // <-- Monetag Script URL (যেমন: https://alwingulla.com/...)
        zoneId: ""        // <-- Monetag Zone ID
    },

    // ৩. ADETIKA (এখানে Adetika-র কোড বসাবেন)
    adetika: {
        active: true,
        bannerCode: ``   // <-- Adetika Banner HTML Code
    }
};

// ==========================================
// AUTO-LOADER ENGINE (DO NOT TOUCH BELOW)
// ==========================================

// ১. পপ-আপ / পপ-আন্ডার অটো হ্যান্ডলার
(function initPopAds() {
    if (ADS_CONFIG.adsterra.active && ADS_CONFIG.adsterra.popunderUrl.trim() !== "") {
        document.addEventListener('click', function popHandler() {
            window.open(ADS_CONFIG.adsterra.popunderUrl, '_blank');
            document.removeEventListener('click', popHandler);
        }, { once: true });
    }

    if (ADS_CONFIG.monetag.active && ADS_CONFIG.monetag.zoneId.trim() !== "") {
        const script = document.createElement('script');
        script.src = ADS_CONFIG.monetag.tagScriptUrl;
        script.dataset.zone = ADS_CONFIG.monetag.zoneId;
        script.async = true;
        document.head.appendChild(script);
    }
})();

// ২. অটোমেটিক ব্যানার এড রেন্ডারার
function renderAdBanner(containerId, preferredNetwork = 'adsterra') {
    const container = document.getElementById(containerId);
    if (!container) return;

    let html = "";

    if (preferredNetwork === 'adsterra' && ADS_CONFIG.adsterra.bannerCode.trim() !== "") {
        html = ADS_CONFIG.adsterra.bannerCode;
    } else if (preferredNetwork === 'adetika' && ADS_CONFIG.adetika.bannerCode.trim() !== "") {
        html = ADS_CONFIG.adetika.bannerCode;
    }

    if (html === "") {
        container.style.display = 'none';
        container.innerHTML = '';
    } else {
        container.style.display = 'block';
        container.innerHTML = `<div class="movebox-ad-box">${html}</div>`;
    }
}
