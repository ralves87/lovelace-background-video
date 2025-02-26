// Constantes e Prefíxos de Log
const DEBUG_PREFIX = "Background Video DEBUG: ";
const LOG_PREFIX = "Background Video: ";

// Variáveis Globais
let root, panelHolder, hui, lovelace, backgroundConfig, viewLayout, haObj = null;
let view, debugMode = false, loaded = false, viewLoaded = false;
let previousState, previousEntity, previousUrl, previousConfig;

// Funções auxiliares para logs
function logStatus(message, force = false) {
    if (debugMode || force) {
        console.log(`${DEBUG_PREFIX}${message}`);
    }
}

function debugLog(message, obj = null) {
    if (debugMode) {
        console.log(`${DEBUG_PREFIX}${message}`);
        if (obj) console.log(obj);
    }
}

// Função principal para carregar variáveis DOM
function initializeVars() {
    root = document.querySelector("home-assistant");
    if (!root) return;
    root = root.shadowRoot?.querySelector("home-assistant-main")?.shadowRoot;
    panelHolder = root?.querySelector("ha-panel-lovelace")?.shadowRoot;
    hui = panelHolder?.querySelector("hui-root");
    if (hui) {
        lovelace = hui.lovelace;
        backgroundConfig = lovelace?.config?.background_video;
        viewLayout = hui.shadowRoot?.getElementById("layout");
        view = hui.shadowRoot?.getElementById("view");
    }
}

// Observadores para mudanças no estado
const viewObserver = new MutationObserver(() => {
    viewLoaded = false;
    renderBackground();
});

const huiObserver = new MutationObserver(() => {
    debugLog("HUI observer triggered.");
    renderBackground();
});

// Determina a configuração atual com base no estado
function getCurrentConfig() {
    if (!backgroundConfig) return null;
    const currentViewPath = window.location.pathname.split('/')[2];
    let config = backgroundConfig;

    if (backgroundConfig.views) {
        const viewConfig = backgroundConfig.views.find(view => view.path === currentViewPath);
        if (viewConfig?.config) config = viewConfig.config;
    }

    return config;
}

// Renderiza o fundo animado
function renderBackground() {
    const config = getCurrentConfig();
    if (!config || !config.default_url) {
        logStatus("Nenhuma configuração encontrada ou URL padrão ausente.");
        return;
    }

    const stateUrl = config.default_url;
    const existingVideo = hui.shadowRoot.querySelector("#background-video");

    // Reutilize o elemento <video> se ele já existir
    if (existingVideo) {
        if (existingVideo.src !== stateUrl) {
            existingVideo.src = stateUrl; // Atualiza o vídeo apenas se a URL for diferente
        }
        return;
    }

    // Criação do elemento <video> apenas se ainda não existir
    const wrapper = document.createElement("div");
    wrapper.id = "background-video-wrapper";
    wrapper.style.position = "fixed";
    wrapper.style.top = "0";
    wrapper.style.left = "0";
    wrapper.style.width = "100vw";
    wrapper.style.height = "100vh";
    wrapper.style.zIndex = "-1";
    wrapper.style.overflow = "hidden";

    const videoElement = document.createElement("video");
    videoElement.id = "background-video";
    videoElement.src = stateUrl;
    videoElement.autoplay = true;
    videoElement.loop = true;
    videoElement.muted = true;
    videoElement.playsInline = true; // Para iOS e dispositivos móveis
    videoElement.style.position = "absolute";
    videoElement.style.top = "0";
    videoElement.style.left = "0";
    videoElement.style.width = "100%";
    videoElement.style.height = "100%";
    videoElement.style.minWidth = "100%";
    videoElement.style.minHeight = "100%";
    videoElement.style.objectFit = "cover"; // Para ajustar o vídeo sem distorção
    videoElement.style.opacity = config.opacity ?? 1.0; // Configurar opacidade do vídeo

    wrapper.appendChild(videoElement);
    hui.shadowRoot.appendChild(wrapper);
}

// Função principal
function run() {
    initializeVars();
    if (!view || !hui) {
        logStatus("Erro ao localizar elementos principais.");
        return;
    }

    // Desconecta os observadores antes de conectá-los novamente
    viewObserver.disconnect();
    huiObserver.disconnect();

    viewObserver.observe(view, { childList: true, subtree: true });
    huiObserver.observe(hui, { childList: true, subtree: true });

    renderBackground();
}

// Inicializa o script
run();