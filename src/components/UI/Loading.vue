<script setup>
import { motion } from "motion-v";

const dotVariants = {
  jump: {
    y: -30,
    transition: {
      duration: 0.8,
      repeat: Infinity,
      repeatType: "mirror",
      ease: "easeInOut",
    },
  },
};
</script>

<template>
  <motion.div
    class="container"
    animate="jump"
    :transition="{ staggerChildren: -0.2, staggerDirection: -1 }"
  >
    <motion.div class="dot" :variants="dotVariants" />
    <motion.div class="dot" :variants="dotVariants" />
    <motion.div class="dot" :variants="dotVariants" />
  </motion.div>
</template>

<style>
.container {
  /* top: 0%;
  bottom: 0%;
  left: 0%;
  right: 0%;
  position: fixed; */
  width: 100%;
  height: 100%;
  display: flex;
  margin: auto;
  justify-content: center;
  /* justify-items: center; */
  align-items: center;
  /* align-content: center; */
  gap: 10px;
}

.dot {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: #d400ff;
  will-change: transform;
}
</style>
