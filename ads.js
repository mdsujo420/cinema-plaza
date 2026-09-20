// HIGH CPM & HIGH PAYOUT REVENUE ADS CONFIGURATION
const ADS_CONFIG = {
    adsterra: {
        active: true,
        // ১. পপআপ / পপাউন্ডার অ্যাড (সর্বোচ্চ রেভিনিউয়ের জন্য)
        popunderUrl: "https://pl31424997.profitableratecpmnetwork.com/7e/fd/aa/7efdaaa393c2dc8048d0cf9140960aa1.js",
        // ২. সোশ্যাল বার অ্যাড
        socialBarUrl: "https://pl31424999.profitableratecpmnetwork.com/39/d3/01/39d301af575b3858e93c128747cc277b.js",
        // ব্যানার বা নেটিভ অ্যাড স্লট (যদি প্রয়োজন হয়)
        nativeBannerCode: `<script async="async" data-cfasync="false" src="https://pl31424998.profitableratecpmnetwork.com/ac931699afda4d03a4b65faad94251d8/invoke.js"></script><div id="container-ac931699afda4d03a4b65faad94251d8"></div>`,
        banner728Code: `<script>atOptions = {'key' : 'f535efb3faec8ed3e53169d6fa9c3b33', 'format' : 'iframe', 'height' : 90, 'width' : 728, 'params' : {}};</script><script src="https://www.highrevenueformat.com/f535efb3faec8ed3e53169d6fa9c3b33/invoke.js"></script>`
    },
    monetag: {
        active: true,
        // ৩. মনিট্যাগ মাল্টিট্যাগ (Multitag) স্ক্রিপ্ট
        multitagScript: `<script src="https://quge5.com/88/tag.min.js" data-zone="283434" async data-cfasync="false"></script>`
    }
};

// অটো ইনজেক্ট গ্লোবাল অ্যাডস (Popunder, Social Bar, Monetag Multitag)
(function() {
    if (ADS_CONFIG.adsterra.active) {
        if (ADS_CONFIG.adsterra.popunderUrl) {
            let s1 = document.createElement('script');
            s1.src = ADS_CONFIG.adsterra.popunderUrl;
            document.head.appendChild(s1);
        }
        if (ADS_CONFIG.adsterra.socialBarUrl) {
            let s2 = document.createElement('script');
            s2.src = ADS_CONFIG.adsterra.socialBarUrl;
            document.head.appendChild(s2);
        }
    }
    if (ADS_CONFIG.monetag.active && ADS_CONFIG.monetag.multitagScript) {
        let div = document.createElement('div');
        div.innerHTML = ADS_CONFIG.monetag.multitagScript;
        document.head.appendChild(div);
    }
})();

// ব্যানার রেন্ডার করার ফাংশন
function renderAdBanner(containerId, type = 'banner728') {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    if (type === 'native' && ADS_CONFIG.adsterra.active) {
        container.innerHTML = ADS_CONFIG.adsterra.nativeBannerCode;
    } else if (type === 'banner728' && ADS_CONFIG.adsterra.active) {
        container.innerHTML = ADS_CONFIG.adsterra.banner728Code;
    }
}
