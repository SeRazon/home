<template>
  <div class="beian-wrap">
    <span class="beian-row">
      <a
        class="beian-link"
        :href="`https://beian.mps.gov.cn/#/query/webSearch?code=${gaCode}`"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img
          class="beian-icon"
          :src="policeIconSrc"
          alt="公安备案图标"
        />
        <span>{{ provinceShort }}公网安备{{ gaCode }}号</span>
      </a>

      <span class="beian-sep">|</span>

      <a
        class="beian-link"
        href="https://beian.miit.gov.cn/"
        target="_blank"
        rel="noopener noreferrer"
      >
        {{ provinceShort }}ICP备{{ icp }}号-1
      </a>
    </span>
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
  icp: string
  gaCode: string
  provinceShort?: string
  policeIconSrc?: string
}>(), {
  provinceShort: '赣',
  policeIconSrc: '/images/icon/ghs.svg'
})
</script>

<style scoped lang="scss">
.beian-wrap {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}
.beian-row {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 8px;
  line-height: 1.4;
}
.beian-link {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: inherit;
  text-decoration: none;
  line-height: 1;
}
.beian-icon {
  width: 16px;
  height: 16px;
  display: inline-block;
  margin: 0;
}
.beian-sep {
  color: #999;
  margin: 0 6px;
}
</style>
