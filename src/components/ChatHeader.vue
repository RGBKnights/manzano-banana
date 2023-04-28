<template>
 <div class="pb-6 flex justify-center">
    <div>
      <span class="font-bold italic text-emerald-600 dark:text-emerald-500 text-2xl underlined underline-part1">Manzano</span><span class="text-amber-500 drk:text-amber-400 font-bold underlined underline-part2"> Banana</span>
    </div>
    <div class="text-xs pt-5 pl-3"> v1.1</div>
  </div>
</template>

<style scoped>
.underlined {
  position: relative;
}

.underline-overflow {
  display: inline-block;
  /* A little extra padding and overflow hidden   */
  overflow: hidden;
  padding-bottom: clamp(1rem, 2vmin, 2rem);
}

.underline-part2:after {
  content: '';
  position: absolute;
  top: 95%;
  width: 150%;
  aspect-ratio: 3 / 1;
  left: 50%;
  transform: translate(-50%, 0);
  border-radius: 50%;
  border: 6px solid rgb(245 158 11);
  /* Use a clip-path to hide and show the bits you want */
  clip-path: polygon(0 0, 50% 50%, 100% 0);
}

.underline-part1:after {
  content: '';
  position: absolute;
  top: 95%;
  width: 150%;
  aspect-ratio: 3 / 1;
  left: 50%;
  transform: translate(-50%, 0);
  border-radius: 50%;
  border: 6px solid rgb(10, 170, 117);
  /* Use a clip-path to hide and show the bits you want */
  clip-path: polygon(0 0, 50% 50%, 100% 0);
}
</style>