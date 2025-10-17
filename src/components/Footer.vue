<template>
   <footer id="footer" :class="store.footerBlur ? 'blur' : null">
     <Transition name="fade" mode="out-in">
       <div v-if="!store.playerState || !store.playerLrcShow" class="power">
         <span>
           <span :class="startYear < fullYear ? 'c-hidden' : 'hidden'">星鸿_SeRazon Copyright</span>
           &copy;
           <span v-if="startYear < fullYear"
             class="site-start">
             {{ startYear }}
             -
           </span>
           {{ fullYear }}
           <a :href="siteUrl">{{ siteAuthor }}</a>
         </span>

         <!-- 站点备案（直接使用组件，保证与页脚一起显示） -->
         <BeianFooter
           class="beian-footer"
           provinceShort="赣"
           icp="2025074193"
           gaCode="36012202000590"
           policeIconSrc="https://www.beian.gov.cn/img/ghs.png"
         />
       </div>
       <div v-else class="lrc">
         <Transition name="fade" mode="out-in">
           <div class="lrc-all" :key="store.getPlayerLrc">
             <music-one theme="filled" size="18" fill="#efefef" />
             <span class="lrc-text text-hidden" v-html="store.getPlayerLrc" />
             <music-one theme="filled" size="18" fill="#efefef" />
           </div>
         </Transition>
       </div>
     </Transition>
   </footer>
 </template>

 <script setup>
 import { MusicOne } from "@icon-park/vue-next";
 import { mainStore } from "@/store";
 import BeianFooter from "@/components/BeianFooter.vue";
 import config from "@/../package.json";

 const store = mainStore();
 const fullYear = new Date().getFullYear();

 // 加载配置数据
 // const siteStartDate = ref(import.meta.env.VITE_SITE_START);
 const startYear = ref(
   import.meta.env.VITE_SITE_START?.length >= 4 ? 
   import.meta.env.VITE_SITE_START.substring(0, 4) : null
 );
 const siteIcp = ref(import.meta.env.VITE_SITE_ICP);
 const siteAuthor = ref(import.meta.env.VITE_SITE_AUTHOR);
 const siteUrl = computed(() => {
   const url = import.meta.env.VITE_SITE_URL;
   if (!url) return "https://xhsr.org.cn";
   // 判断协议前缀
   if (!url.startsWith("http://") && !url.startsWith("https://")) {
     return "//" + url;
   }
   return url;
 });
 </script>
