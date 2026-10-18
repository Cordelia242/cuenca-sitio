<script setup lang="ts">
import SiteHeader from './components/SiteHeader.vue'
import HeroSection from './components/HeroSection.vue'
import DayToDaySection from './components/DayToDaySection.vue'
import FeaturesSection from './components/FeaturesSection.vue'
import PlatformsSection from './components/PlatformsSection.vue'
import PrivacySection from './components/PrivacySection.vue'
import HowItWorksSection from './components/HowItWorksSection.vue'
import CtaSection from './components/CtaSection.vue'
import SiteFooter from './components/SiteFooter.vue'
import { useReveal } from './composables/useReveal'

useReveal()
</script>

<template>
  <a class="skip-link" href="#contenido">Saltar al contenido</a>
  <SiteHeader />
  <main id="contenido">
    <HeroSection />
    <DayToDaySection />
    <FeaturesSection />
    <PlatformsSection />
    <PrivacySection />
    <HowItWorksSection />
    <CtaSection />
  </main>
  <SiteFooter />
</template>
