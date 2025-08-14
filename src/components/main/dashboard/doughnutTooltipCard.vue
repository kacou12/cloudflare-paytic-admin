<template>
  <!-- <div class="tooltip-content" style="
              background: white;
              border-radius: 8px;
              padding: 12px;
              box-shadow: 0 2px 8px rgba(0,0,0,0.15);
              min-width: 150px;
            ">
              <div style="
                display: flex;
                align-items: center;
                margin-bottom: 8px;
              ">
                <span style="
                  width: 8px;
                  height: 8px;
                  border-radius: 50%;
                  background: ${data.color};
                  margin-right: 8px;
                "></span>
                <span style="font-weight: bold;">${data.label}</span>
              </div>
              <div style="
                color: #666;
                font-size: 0.9em;
              ">${data.amount}</div>
              <div style="
                color: #999;
                font-size: 0.8em;
              ">soit ${data.percentage}</div>
            </div> -->
  <div style="background-color: #ED7F10;"
    class="text-xs bg-white rounded-md p-5 transition-opacity duration-300 shadow-lg font-publicsans">
    <section class="flex gap-1 items-center">
      <div class="w-2 h-2 rounded-full bg-${test.color}-900"></div>
      <p class="font-bold">${test.label}</p>
    </section>
    <section>
      <p class="font-medium text-neutral-20">11450551 F CFA / 23450551.6 F CFA</p>
    </section>
    <section class="font-medium  text-neutral-20">
      <p>soit 55%</p>
    </section>
  </div>
</template>

<script setup lang="ts">

</script>

<style scoped></style>