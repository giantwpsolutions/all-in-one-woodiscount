import { reactive, ref } from 'vue';
import { operatorOptions } from './conditionsData';
const { __ } = wp.i18n;

export const bogoBuyProductOptions = [
    {
        label: __('All Products', 'giantwp-discount-rules'),
        value: 'all_products',
    },
    {
        label: __('Product', 'giantwp-discount-rules'),
        value: 'product',
    },
    {
        label: __('Product Variation', 'giantwp-discount-rules'),
        value: 'product_variation',
    },
    {
        label: __('Product Tags', 'giantwp-discount-rules'),
        value: 'product_tags',
    },
    {
        label: __('Product Category', 'giantwp-discount-rules'),
        value: 'product_category',
    },
    {
        label: __('Product Price', 'giantwp-discount-rules'),
        value: 'product_price',
    },
    {
        label: __('Product in Stock', 'giantwp-discount-rules'),
        value: 'product_instock',
    },
];

export const bogoBuyProductOperator = {
    default: [
        { label: __('Greater Than', 'giantwp-discount-rules'), value: 'greater_than' },
        { label: __('Less Than', 'giantwp-discount-rules'), value: 'less_than' },
        {
            label: __('Greater Than or Equal', 'giantwp-discount-rules'),
            value: 'equal_greater_than',
        },
        {
            label: __('Less Than or Equal', 'giantwp-discount-rules'),
            value: 'equal_less_than',
        },
    ],
    inList: [
        {
            label: __('In List', 'giantwp-discount-rules'),
            value: 'in_list',
        },
        {
            label: __('Not in List', 'giantwp-discount-rules'),
            value: 'not_in_list',
        },
    ],
};

export const getBogoBuyProductOperator = (field) => {

    if (field === "product_price" ||
        field === "product_instock"

    ) {
        return bogoBuyProductOperator.default;
    }
    if (field === "product" ||
        field === "product_variation" ||
        field === "product_tags" ||
        field === "product_category"

    ) {
        return bogoBuyProductOperator.inList;
    }


}

//if it's dropdown
export const bogoSameProductBuyIsDropdown = (field) =>
    [
        "product",
        "product_variation",
        "product_tags",
        "product_category",
    ].includes(field);

export const bogoSameProductDropdownOptions = reactive({
    product: [],
    product_variation: [],
    product_tags: [],
    product_category: [],
});

export const getBogoSameProductDropdown = (field) => bogoSameProductDropdownOptions[field] || [];