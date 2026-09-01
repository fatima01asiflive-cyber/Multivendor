// navigation Data
export const navItems = [
    { title: "Home", url: "/" },
    { title: "Best Selling", url: "/best-selling" },
    { title: "Products", url: "/products" },
    { title: "Events", url: "/events" },
    { title: "FAQ", url: "/faq" },
];

export const brandingData = [
    {
        id: 1,
        title: "Free Shipping",
        Description: "From all orders over 100$",
        icon: "🚚",
    },
    {
        id: 2,
        title: "Daily Surprise Offers",
        Description: "Save up to 25% off",
        icon: "🎁",
    },
    {
        id: 3,
        title: "Affordable Prices",
        Description: "Get Factory direct price",
        icon: "💸",
    },
    {
        id: 4,
        title: "Secure Payments",
        Description: "100% protected payments",
        icon: "🔒",
    },
];

export const categoriesData = [
    {
        id: 1,
        title: "Computers and Laptops",
        image_Url:
            "https://cdn.shopify.com/s/files/1/1706/9177/products/NEWAppleMacbookProwithM1ProChip14InchLaptop2021ModelMKGQ3LL_A_16GB_1TBSSD_custommacbd.jpg?v=1659592838",
    },
    {
        id: 2,
        title: "Cosmetics and body care",
        image_Url:
            "https://indian-retailer.s3.ap-south-1.amazonaws.com/s3fs-public/2021-07/kosme1.png",
    },
    {
        id: 3,
        title: "Accessories",
        image_Url:
            "https://img.freepik.com/free-vector/ordering-goods-online-internet-store-online-shopping-niche-e-commerce-website-mother-buying-babies-clothes-footwear-toys-infant-accessories_335657-2345.jpg?w=2000",
    },
    {
        id: 4,
        title: "Cloths",
        image_Url:
            "https://www.shift4shop.com/2015/images/industries/clothing/clothing-apparel.png",
    },
    {
        id: 5,
        title: "Shoes",
        image_Url:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvBQPQMVNRd6TtDkGs2dCri0Y-rxKkFOiEWw&usqp=CAU",
    },
    {
        id: 6,
        title: "Gifts",
        image_Url:
            "https://securecdn.pymnts.com/wp-content/uploads/2014/11/Gifts-Photo-700x489.jpg",
    },
    {
        id: 7,
        title: "Pet Care",
        image_Url: "https://cdn.openpr.com/T/c/Tc15444071_g.jpg",
    },
    {
        id: 8,
        title: "Mobile and Tablets",
        image_Url:
            "https://st-troy.mncdn.com/mnresize/1500/1500/Content/media/ProductImg/original/mpwp3tua-apple-iphone-14-256gb-mavi-mpwp3tua-637986832343472449.jpg",
    },
    {
        id: 9,
        title: "Music and Gaming",
        image_Url:
            "https://static.vecteezy.com/system/resources/previews/011/996/555/original/3d-black-headphone-illustration-ecommerce-icon-png.png",
    },
    {
        id: 10,
        title: "Others",
        image_Url:
            "https://searchspring.com/wp-content/uploads/2022/10/Hero-Image-Platform-Others-2.png",
    },
];

export const productData = [
    {
        id: 1,
        category: "Computers and Laptops",
        name: "MacBook Pro M2 256GB SSD 8GB RAM",
        price: 1099,
        discount_price: 1049,
        rating: 4,
        total_sell: 35,
        stock: 10,
        shop: { name: "Apple inc.", ratings: 4.2 },
        image_Url: [
            {
                url: "https://www.istorebangladesh.com/images/thumbs/0000286_macbook-pro-m1_550.png",
            },
        ],
    },
    {
        id: 2,
        category: "Mobile and Tablets",
        name: "iPhone 14 Pro Max 256GB",
        price: 1199,
        discount_price: 1099,
        rating: 5,
        total_sell: 80,
        stock: 10,
        shop: { name: "Amazon Ltd", ratings: 4.2 },
        image_Url: [{ url: "https://m.media-amazon.com/images/I/31Vle5fVdaL.jpg" }],
    },
    {
        id: 3,
        category: "Others",
        name: "New Fashionable Watch for men 2023",
        price: 100,
        discount_price: 79,
        rating: 4,
        total_sell: 62,
        stock: 10,
        shop: { name: "Shahriar Watch House", ratings: 4.2 },
        image_Url: [
            {
                url: "https://i0.wp.com/eccocibd.com/wp-content/uploads/2022/01/1802NL02_1.png?fit=550%2C550&ssl=1",
            },
        ],
    },
    {
        id: 4,
        category: "Shoes",
        name: "New Trend shoes for gents",
        price: 120,
        discount_price: 89,
        rating: 5,
        total_sell: 49,
        stock: 10,
        shop: { name: "Alisha Shoes Mart", ratings: 4.2 },
        image_Url: [
            {
                url: "https://mirzacdns3.s3.ap-south-1.amazonaws.com/cache/catalog/RLV0015/2-800x800.jpg",
            },
        ],
    },
    {
        id: 5,
        category: "Music and Gaming",
        name: "Gaming Headphone Asus",
        price: 300,
        discount_price: 239,
        rating: 4.5,
        total_sell: 20,
        stock: 10,
        shop: { name: "Asus Ltd", ratings: 4.2 },
        image_Url: [
            {
                url: "https://www.startech.com.bd/image/cache/catalog/headphone/havit/h763d/h763d-02-500x500.jpg",
            },
        ],
    },
];

export const footerProductLinks = [
    { name: "About us", link: "/about" },
    { name: "Careers", link: "/carrers" },
    { name: "Store Locations" },
    { name: "Our Blog" },
    { name: "Reviews" },
];

export const footercompanyLinks = [
    { name: "Game & Video" },
    { name: "Phone & Tablets" },
    { name: "Computers & Laptop" },
    { name: "Sport Watches" },
    { name: "Events" },
];

export const footerSupportLinks = [
    { name: "FAQ" },
    { name: "Reviews" },
    { name: "Contact Us" },
    { name: "Shipping" },
    { name: "Live chat" },
];
