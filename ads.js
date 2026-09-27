// HIGH CPM & HIGH PAYOUT REVENUE ADS CONFIGURATION
const ADS_CONFIG = {
    adsterra: {
        active: true,
        popunderUrl: "https://pl31424997.profitableratecpmnetwork.com/7e/fd/aa/7efdaaa393c2dc8048d0cf9140960aa1.js",
        socialBarUrl: "https://pl31424999.profitableratecpmnetwork.com/39/d3/01/39d301af575b3858e93c128747cc277b.js",
        nativeBannerCode: `<script async="async" data-cfasync="false" src="https://pl31424998.profitableratecpmnetwork.com/ac931699afda4d03a4b65faad94251d8/invoke.js"></script><div id="container-ac931699afda4d03a4b65faad94251d8"></div>`,
        banner728Code: `<script>atOptions = {'key' : 'f535efb3faec8ed3e53169d6fa9c3b33', 'format' : 'iframe', 'height' : 90, 'width' : 728, 'params' : {}};</script><script src="https://www.highrevenueformat.com/f535efb3faec8ed3e53169d6fa9c3b33/invoke.js"></script>`
    },
    monetag: {
        active: true,
        multitagScript: `<script src="https://quge5.com/88/tag.min.js" data-zone="283434" async data-cfasync="false"></script>`
    },
    smartLink: {
        active: true, // স্মার্ট লিঙ্ক চালু আছে
        url: "https://www.profitableratecpmnetwork.com/tq0n29rh7s?key=954d42fe6c7cea196376a9f0a71d66f6",
        delaySeconds: 5 // ৫ সেকেন্ড পর রিডাইরেক্ট হবে
    }
};

// গ্লোবাল অ্যাডস এবং ব্যাক-বাটন সেফ স্মার্ট লিঙ্ক রিডাইরেক্ট
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

    // ৫ সেকেন্ড পর রিডাইরেক্ট হবে (সেম পেজে) এবং ব্যাক করলে সাইটেই থাকবে
    if (ADS_CONFIG.smartLink.active && ADS_CONFIG.smartLink.url) {
        setTimeout(function() {
            if (!sessionStorage.getItem('smart_redirected')) {
                sessionStorage.setItem('smart_redirected', 'true');
                // ব্রাউজারের বর্তমান URL হিস্ট্রিতে সেভ করে তারপর রিডাইরেক্ট করা হচ্ছে
                window.history.pushState("movieplaza", "Movie Plaza", window.location.href);
                window.location.assign(ADS_CONFIG.smartLink.url); // .assign ব্যবহার করা হলো যাতে ব্যাক বাটন কাজ করে
            }
        }, ADS_CONFIG.smartLink.delaySeconds * 1000);
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
