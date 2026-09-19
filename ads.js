// SMART AD CONTROLLER
const ADS_CONFIG = {
    adsterra: { active: false, popunderUrl: "", bannerCode: "" },
    monetag: { active: false, tagScriptUrl: "", zoneId: "" },
    adetika: { active: false, bannerCode: "" }
};

function renderAdBanner(containerId) {
    const container = document.getElementById(containerId);
    if (container) {
        container.style.display = 'none';
        container.innerHTML = '';
    }
}
