import { reactive, ref, onMounted } from 'vue';
const { __ } = wp.i18n;


//State for conditions usages (on/off)
export const enableConditions = ref(false);

// State for conditions application (any/all)
export const conditonsApplies = ref('any');


// Reactive data for conditions
export const conditions = reactive([
    { id: Date.now(), field: '', operator: '', value: '' },
]);

// Dynamic condition options with i18n
export const conditionOptions = [
    {
        label: __('Cart', 'aio-woodiscount'),
        options: [
            { label: __('Cart Subtotal Price', 'aio-woodiscount'), value: 'cart_subtotal_price' },
            { label: __('Cart Quantity', 'aio-woodiscount'), value: 'cart_quantity' },
            { label: __('Cart Total Weight', 'aio-woodiscount'), value: 'cart_total_weight' },
        ],
    },
    {
        label: __('Cart Items', 'aio-woodiscount'),
        options: [
            { label: __('Cart Item - Product', 'aio-woodiscount'), value: 'cart_item_product' },
            { label: __('Cart Item - Variation', 'aio-woodiscount'), value: 'cart_item_variation' },
            { label: __('Cart Item - Category', 'aio-woodiscount'), value: 'cart_item_category' },
            { label: __('Cart Item - Tag', 'aio-woodiscount'), value: 'cart_item_tag' },
            { label: __('Cart Item - Regular Price', 'aio-woodiscount'), value: 'cart_item_regular_price' },
        ],
    },
    {
        label: __('Customer', 'aio-woodiscount'),
        options: [
            { label: __('Customer Is Logged In', 'aio-woodiscount'), value: 'customer_is_logged_in' },
            { label: __('Customer Role', 'aio-woodiscount'), value: 'customer_role' },
            { label: __('Specific Customer', 'aio-woodiscount'), value: 'customer_specific' },
        ],
    },
    {
        label: __('Purchase History', 'aio-woodiscount'),
        options: [
            { label: __('Customer Order Count', 'aio-woodiscount'), value: 'customer_order_count' },
            { label: __('Order History Category', 'aio-woodiscount'), value: 'customer_order_history_category' },
            { label: __('Shipping Region', 'aio-woodiscount'), value: 'customer_shipping_region' },
        ],
    },
    {
        label: __('Others', 'aio-woodiscount'),
        options: [
            { label: __('Payment Method', 'aio-woodiscount'), value: 'payment_method' },
            { label: __('Applied Coupons', 'aio-woodiscount'), value: 'applied_coupons' },
        ],
    },
];


// Operator Options
export const operatorOptions = {
    default: [
        { label: __('Greater Than', 'aio-woodiscount'), value: 'greater_than' },
        { label: __('Less Than', 'aio-woodiscount'), value: 'less_than' },
        {
            label: __('Equal or Greater Than', 'aio-woodiscount'),
            value: 'equal_greater_than',
        },
        {
            label: __('Equal or Less Than', 'aio-woodiscount'),
            value: 'equal_less_than',
        },
    ],

    contain: [
        { label: __('Contains All', 'aio-woodiscount'), value: 'contain_all' },
        {
            label: __('Contains in List', 'aio-woodiscount'),
            value: 'contain_in_list',
        },
        {
            label: __('Not Contain in List', 'aio-woodiscount'),
            value: 'not_contain_inlist',
        },
    ],

    isLoggedIn: [
        {
            label: __('Logged In', 'aio-woodiscount'),
            value: 'logged_in',
        },
        {
            label: __('Not Logged In', 'aio-woodiscount'),
            value: 'not_logged_in',
        },
    ],
};



// Function to add a new condition
export const addCondition = () => {
    conditions.push({
        id: Date.now(),
        field: '',
        operator: '',
        value: '',
    });
};

// Function to remove a condition by ID
export const removeCondition = (id) => {
    const index = conditions.findIndex((cond) => cond.id === id);
    if (index > -1) conditions.splice(index, 1);
};