<script setup>
import { ref } from "vue";

const { __ } = wp.i18n;
import Conditions from "./Elements/Conditions.vue";
import CouponName from "./Elements/CouponName.vue";
import FlatPercentageSelection from "./Elements/FlatPercentageSelection.vue";
import DateTimePicker from "./Elements/DateTimePicker.vue";
import UsageLimits from "./Elements/UsageLimits.vue";
import CheckProduct from "./Elements/CheckProduct.vue";
import AutoApply from "./Elements/AutoApply.vue";
</script>

<template>
  <form action="">
    <CouponName></CouponName>
    <FlatPercentageSelection></FlatPercentageSelection>
    <DateTimePicker></DateTimePicker>
    <UsageLimits></UsageLimits>
    <AutoApply></AutoApply>
    <Conditions></Conditions>
  </form>
</template>

<style scoped></style>
