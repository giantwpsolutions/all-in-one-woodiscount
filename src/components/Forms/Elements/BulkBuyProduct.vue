<script setup>
import { reactive, ref, onMounted, watch } from "vue";
import { QuestionMarkCircleIcon } from "@heroicons/vue/24/solid";
import { Delete, CirclePlus } from "@element-plus/icons-vue";
import { debounce } from "lodash";
import {
  productOption,
  productOperator,
  getProductOperator,
  ProductIsDropdown,
  getProductDropdown,
  productDropdownOptions,
} from "@/data/form-data/buyXGetYProductData.js";

import {
  productOptions,
  isLoadingProducts,
  productError,
  loadProducts,
  variationOptions,
} from "@/data/productsFetch.js";

import {
  categoryOptions,
  tagOptions,
  isLoadingCategoriesTags,
  loadCategoriesAndTags,
} from "@/data/categoriesAndTagsFetch.js";

import {
  generalData,
  isLoadingGeneralData,
  generalDataError,
  loadGeneralData,
} from "@/data/generalDataFetch";

// **Props & Emits**
const props = defineProps({
  value: { type: Array, default: () => [] },
  getApplies: { type: String, default: "any" },
});

const emit = defineEmits(["update:value", "update:getApplies"]);

// **Reactive State**
const buyProducts = ref([...props.value]);
const getApplies = ref(props.getApplies);

// Fetch Api

onMounted(async () => {
  try {
    // Load products and variations
    await loadProducts();
    productDropdownOptions.product = productOptions.value; // Products
    productDropdownOptions.product_variation = variationOptions.value; // Variations

    //Load Category and Tags
    await loadCategoriesAndTags();
    productDropdownOptions.product_category = categoryOptions.value;
    productDropdownOptions.product_tags = tagOptions.value;

    //load general Data
    await loadGeneralData();
  } catch (error) {
    console.error("Error loading dropdown options:", error);
  }
});

// Add a New Product Selection option
const addProduct = (event) => {
  event.preventDefault();
  buyProducts.value.push({
    id: Date.now(),
    field: "product",
    operator: "",
    value: [],
  });
};

// Remove a Product Selection option
const removeProduct = (id) => {
  buyProducts.value = buyProducts.value.filter((product) => product.id !== id);
};

const productisPricingField = (field) => ["product_price"].includes(field);

const productisNumberField = (field) => ["product_instock"].includes(field);

// **Emit Updated Get Product **
const updateBuyProducts = () => {
  emit("update:value", [...buyProducts.value]);
};

// **Emit Buyx Change**
const updateGetApplies = () => {
  emit("update:getApplies", getApplies.value);
};

watch(
  buyProducts,
  (newVal) => {
    // console.log("Child Conditions Updated:", newVal);
    emit("update:value", [...newVal]);
  },
  { deep: true } // Single watcher handles all changes
);

watch(getApplies, () => {
  updateGetApplies();
});

// Single debounced watcher for all changes
const emitUpdates = debounce(() => {
  // console.log(
  //   "Child Get Y (Debounced):",
  //   JSON.parse(JSON.stringify(buyProducts.value))
  // );
  emit("update:value", [...buyProducts.value]);
}, 300);

watch(
  [buyProducts, getApplies],
  () => {
    emitUpdates();
  },
  { deep: true }
);
</script>

<template>
  <div class="space-y-4 max-w-full mt-2 mb-6 border-b py-6">
    <h3 class="text-base text-gray-950">
      <div class="inline-flex items-center space-x-1">
        <span>{{ __("Select Product", "giantwp-discount-rules") }}</span>
        <el-tooltip
          class="box-item"
          effect="dark"
          :content="
            __(
              'Which product will get the bulk rule?',
              'giantwp-discount-rules'
            )
          "
          placement="top"
          popper-class="custom-tooltip">
          <QuestionMarkCircleIcon
            class="w-4 h-4 text-gray-500 hover:text-gray-700 cursor-pointer" />
        </el-tooltip>
      </div>
    </h3>

    <!-- Match Condition -->
    <div class="flex flex-wrap items-center gap-2 mt-6 mb-1">
      <label class="text-sm font-medium text-gray-900 flex items-center gap-1">
        {{ __("Rules apply to products if matches", "giantwp-discount-rules") }}
      </label>
      <el-radio-group v-model="getApplies" @change="updateGetApplies">
        <el-radio-button
          :label="__('Any', 'giantwp-discount-rules')"
          value="any" />
        <el-radio-button
          :label="__('All', 'giantwp-discount-rules')"
          value="all" />
      </el-radio-group>
    </div>

    <!-- Product Conditions -->
    <div
      v-for="(buyProduct, index) in buyProducts"
      :key="buyProduct.id"
      class="max-w-full">
      <!-- Or/And Label -->
      <div v-if="index > 0" class="mb-2">
        <span class="text-black italic text-sm">
          {{
            getApplies === "any"
              ? __("Or", "giantwp-discount-rules")
              : __("And", "giantwp-discount-rules")
          }}
        </span>
      </div>

      <div class="flex flex-wrap gap-2">
        <!-- Field 1: Field -->
        <div class="w-full sm:w-[25%]">
          <el-select
            v-model="buyProduct.field"
            clearable
            @change="updateBuyProducts"
            class="w-full">
            <el-option
              v-for="item in productOption"
              :key="item.value"
              :label="item.label"
              :value="item.value" />
          </el-select>
        </div>

        <!-- Field 2: Operator -->
        <div class="w-full sm:w-[20%]">
          <el-select
            v-if="getProductOperator(buyProduct.field)?.length"
            v-model="buyProduct.operator"
            @change="updateBuyProducts"
            class="w-full">
            <el-option
              v-for="item in getProductOperator(buyProduct.field)"
              :key="item.value"
              :label="item.label"
              :value="item.value" />
          </el-select>
        </div>

        <!-- Field 3: Value -->
        <div class="w-full sm:w-[35%]">
          <el-select-v2
            v-if="ProductIsDropdown(buyProduct.field)"
            v-model="buyProduct.value"
            @change="updateBuyProducts"
            :options="getProductDropdown(buyProduct.field)"
            :placeholder="__('Select', 'giantwp-discount-rules')"
            filterable
            multiple
            :loading="isLoadingProducts"
            class="custom-select-v2 w-full" />

          <el-input
            v-else-if="productisPricingField(buyProduct.field)"
            v-model="buyProduct.value"
            @change="updateBuyProducts"
            class="w-full">
            <template #append>
              <span v-html="generalData.currency_symbol || '$'"></span>
            </template>
          </el-input>

          <el-input-number
            v-else-if="productisNumberField(buyProduct.field)"
            v-model="buyProduct.value"
            @change="updateBuyProducts"
            class="w-full"
            controls-position="right" />
        </div>

        <!-- Field 4: Delete Icon -->
        <div class="w-full sm:w-[10%] flex items-center gap-4">
          <el-icon
            @click="removeProduct(buyProduct.id)"
            size="20px"
            color="red"
            class="cursor-pointer text-red-500">
            <Delete />
          </el-icon>
        </div>
      </div>
    </div>

    <!-- Add Product -->
    <button
      @click="addProduct"
      class="bg-blue-500 text-white rounded px-4 py-2 hover:bg-blue-600">
      {{ __("Assign Bulk Product", "giantwp-discount-rules") }}
    </button>
  </div>
</template>
