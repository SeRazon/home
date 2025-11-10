<template>
  <footer id="footer" :class="{ blur: store.footerBlur }">
    <div class="footer-shell">
      <Transition name="fade" mode="out-in">
        <div
          v-if="!store.playerState || !store.playerLrcShow"
          key="meta"
          class="footer-panel footer-meta"
        >
          <p class="copyright">
            <span class="copyright-label">{{ siteCopyrightText }}</span>
            <span class="separator" aria-hidden="true">©</span>
            <span v-if="showStartYearRange" class="site-start">{{ startYear }} - </span>
            <span class="current-year">{{ fullYear }}</span>
            <a
              class="author-link"
              :href="siteUrl"
              target="_blank"
              rel="noopener noreferrer"
            >
              {{ siteAuthor }}
            </a>
          </p>
          <BeianFooter
            class="beian-footer"
            :province-short="provinceShort"
            :icp="icpRecord"
            :ga-code="gaRecord"
            :police-icon-src="policeIconSrc"
          />
        </div>
        <div v-else key="lrc" class="footer-panel footer-lrc">
          <Transition name="fade" mode="out-in">
            <div class="lrc-all" :key="store.getPlayerLrc">
              <music-one theme="filled" size="18" fill="#efefef" />
              <span class="lrc-text text-hidden" v-html="store.getPlayerLrc" />
              <music-one theme="filled" size="18" fill="#efefef" />
            </div>
          </Transition>
        </div>
      </Transition>
    </div>
  </footer>
</template>

<script setup>
import { MusicOne } from "@icon-park/vue-next";
import { mainStore } from "@/store";
import BeianFooter from "@/components/BeianFooter.vue";
import config from "@/../package.json";

const store = mainStore();
const fullYear = new Date().getFullYear();
const env = import.meta.env;

const defaults = {
  copyright: "星鸿_SeRazon Copyright",
  author: config.author || "SeRazon",
  siteUrl: config.home || "https://xhsr.org.cn",
  provinceShort: "赣",
  icp: "2025074193",
  gaCode: "36012202000590",
  policeIcon: "/images/icon/police-badge.svg",
};

const normalize = (value) => (typeof value === "string" ? value.trim() : "");

const envStart = normalize(env.VITE_SITE_START);
const startYear = ref(envStart.length >= 4 ? envStart.substring(0, 4) : null);

const startYearNumber = computed(() => {
  if (!startYear.value) return null;
  const numeric = Number(startYear.value);
  return Number.isFinite(numeric) ? numeric : null;
});
const showStartYearRange = computed(
  () => startYearNumber.value !== null && startYearNumber.value < fullYear,
);

const siteAuthor = ref(normalize(env.VITE_SITE_AUTHOR) || defaults.author);

const siteCopyrightText = computed(
  () => normalize(env.VITE_SITE_COPYRIGHT) || defaults.copyright,
);

const siteUrl = computed(() => {
  const url = normalize(env.VITE_SITE_URL) || defaults.siteUrl;
  if (!url.startsWith("http://") && !url.startsWith("https://")) {
    return "//" + url.replace(/^\/+/u, "");
  }
  return url;
});

const icpRecord = computed(
  () => normalize(env.VITE_SITE_ICP) || defaults.icp,
);

const gaRecord = computed(() => {
  const code = normalize(env.VITE_SITE_GA_CODE) || normalize(env.VITE_SITE_GA);
  return code || defaults.gaCode;
});

const provinceShort = computed(
  () => normalize(env.VITE_SITE_PROVINCE_SHORT) || normalize(env.VITE_SITE_PROVINCE) || defaults.provinceShort,
);

const policeIconSrc = computed(
  () => normalize(env.VITE_SITE_POLICE_ICON) || defaults.policeIcon,
);
</script>

<style lang="scss" scoped>
#footer {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 32px;
  display: flex;
  justify-content: center;
  padding: 0 clamp(12px, 2vw, 32px);
  color: #efefef;
  z-index: 3;
}

.footer-shell {
  width: 100%;
  max-width: 1200px;
  display: flex;
  justify-content: center;
}

.footer-panel {
  width: 100%;
  padding: 14px 20px;
  border-radius: 12px;
  background: rgba(0, 0, 0, 0.24);
  border: 1px solid rgba(255, 255, 255, 0.08);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  text-align: center;
  line-height: 1.6;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.25);
  transition:
    background 0.3s ease,
    backdrop-filter 0.3s ease,
    border-color 0.3s ease;
}

#footer.blur .footer-panel {
  background: rgba(0, 0, 0, 0.36);
  backdrop-filter: blur(12px);
  border-color: rgba(255, 255, 255, 0.12);
}

.footer-meta .copyright {
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 6px;
  font-size: 0.9rem;
}

.copyright-label {
  font-weight: 600;
}

.separator {
  font-size: 0.85rem;
  opacity: 0.85;
}

.site-start,
.current-year {
  font-variant-numeric: tabular-nums;
}

.author-link {
  color: inherit;
  transition: color 0.3s ease;
}

.author-link:hover {
  color: rgb(57, 159, 255);
}

.beian-footer {
  width: 100%;
  font-size: 0.85rem;
}

.beian-footer :deep(.beian-wrap) {
  width: 100%;
}

.beian-footer :deep(.beian-row) {
  gap: 10px;
}

.footer-lrc {
  flex-direction: row;
  justify-content: center;
  min-height: 36px;
}

.lrc-all {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  max-width: min(640px, 80vw);
}

.lrc-text {
  display: inline-block;
  max-width: 100%;
  text-align: center;
}

@media (max-width: 720px) {
  #footer {
    bottom: 24px;
    padding: 0 20px;
  }

  .footer-panel {
    padding: 12px 16px;
    gap: 8px;
  }

  .footer-meta .copyright {
    font-size: 0.85rem;
  }

  .lrc-all {
    gap: 8px;
    max-width: min(520px, 88vw);
  }
}

@media (max-width: 480px) {
  #footer {
    bottom: 20px;
    padding: 0 16px;
  }

  .footer-panel {
    padding: 12px 14px;
  }

  .footer-meta .copyright {
    gap: 4px;
    font-size: 0.8rem;
  }

  .beian-footer {
    font-size: 0.8rem;
  }
}
</style>
