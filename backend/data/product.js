const products = [
  {
    name: 'Watch Series 7 45mm',
    image: '/images/Apple_Watch.jpg',
    description:
      'The largest, most advanced Always-on Retina display yet makes everything you do with your Apple Watch Series 7 bigger and better. Series 7 is the most durable Apple Watch ever built, with an even more crack-resistant front crystal. Advanced features let you measure your blood oxygen level take an ECG anytime and access mindfulness and sleep tracking apps. You can also track dozens of workouts, including new tai chi and pilates.',
    brand: 'Apple',
    category: 'Smartwatch',
    price: 529.99,
    countInStock: 8,
    rating: 0,
    numReviews: 0
  },

  {
    name: '10 Pro 5G',
    image: '/images/OnePlus_10_Pro_5G.jpg',
    description:
      'The OnePlus 10 Pro 5G, our most powerful smartphone ever. Unleash your creativity with a triple-camera system co-developed with Hasselblad, featuring the new OnePlus Billion Color Solution and a wider 150° FOV Ultra-Wide lens. A 6.7” QHD+ screen displays stunning colors and adjusts dynamically from 1Hz up to 120Hz, delivering the smoothest & most battery-efficient user experience. Powering the 10 Pro is the latest Qualcomm Snapdragon 8 Gen 1 Processor. Coupled with the new HyperBoost Gaming Engine and next-gen heat dissipation, the 10 Pro is one of the best choices for mobile gaming. Say goodbye to battery anxiety with 65W fast charging (wired) and 50W wireless charging, giving you a day’s power in 15 minutes. Packed with premium features & a smooth and clean interface, the 10 Pro is best smartphone from OnePlus yet.',
    brand: 'Oneplus',
    category: 'Mobile',
    price: 889.0,
    countInStock: 4,
    rating: 0,
    numReviews: 0
  },
  {
    name: 'Amazon Echo Dot 3rd Generation',
    image: '/images/alexa.jpg',
    description:
      'Meet Echo Dot - Our most popular smart speaker with a fabric design. It is our most compact smart speaker that fits perfectly into small space',
    brand: 'Amazon',
    category: 'Accessories',
    price: 27.99,
    countInStock: 6,
    rating: 0,
    numReviews: 0
  },
  {
    name: 'Apple Earpods with Lightning Connector',
    image: '/images/apple_earpods.jpg',
    description:
      'Unlike traditional, circular earbuds, the design of the EarPods is defined by the geometry of the ear. Which makes them more comfortable for more people than any other earbud-style headphones. The speakers inside the EarPods have been engineered to maximize sound output and minimize sound loss, which means you get high-quality audio. The EarPods with Lightning Connector also include a built-in remote that lets you adjust the volume, control the playback of music and video, and answer or end calls with a pinch of the cord.',
    brand: 'Apple',
    category: 'Headphone',
    price: 19.99,
    countInStock: 15,
    rating: 0,
    numReviews: 0
  },
  {
    name: 'Logitech G-Series Gaming Mouse',
    image: '/images/mouse.jpg',
    description:
      'Get a better handle on your games with this Logitech LIGHTSYNC gaming mouse. The six programmable buttons allow customization for a smooth playing experience',
    brand: 'Logitech',
    category: 'Accessories',
    price: 49.99,
    countInStock: 7,
    rating: 0,
    numReviews: 0
  },
  {
    name: 'iPhone 11 Pro 256GB Memory',
    image: '/images/phone.jpg',
    description:
      'Introducing the iPhone 11 Pro. A transformative triple-camera system that adds tons of capability without complexity. An unprecedented leap in battery life',
    brand: 'Apple',
    category: 'Mobile',
    price: 599.99,
    countInStock: 10,
    rating: 0,
    numReviews: 0
  },
  {
    name: 'Amazon Echo (4th Gen)',
    image: '/images/amazon_echo_4th_gen.jpg',
    description:
      "The Amazon Echo (4th gen.) is a great smart speaker for the price as long as you live in an Alexa world. If your smart home devices are all compatible (which most are) and you don't mind the new orb-like design of the speaker then you'll likely be very happy with what this has to offer. It sounds good and the LED ring on the bottom makes it very clear when the microphone is listening and when it isn't.",
    brand: 'Amazon',
    category: 'Accessories',
    price: 99.0,
    countInStock: 6,
    rating: 0,
    numReviews: 0
  },
  {
    name: 'Pixel 6 Pro',
    image: '/images/Google_Pixel_6_Pro.jpg',
    description:
      'Pixel 6 Pro, the completely redesigned, fully loaded Google phone. The Pixel Camera system includes a pro-level telephoto lens with 4x optical zoom. Its main sensor captures 150% more light, bringing vivid color and greater accuracy to photos.4 Pixel’s 6.7-inch Smooth Display can intelligently adjust up to 120Hz for easy scrolling and responsive gaming.5 With the next-gen TitanM2TM security chip, Pixel helps protect you, your data, and your privacy, and keeps you in control. And with the Google Tensor processor, it’s the smartest and fastest Pixel yet – up to 80% faster than Pixel 5.6',
    brand: 'Google',
    category: 'Mobile',
    price: 899.0,
    countInStock: 5,
    rating: 0,
    numReviews: 0
  },
  {
    name: 'Sony Playstation 4 Pro White Version',
    image: '/images/playstation.jpg',
    description:
      'The ultimate home entertainment center starts with PlayStation. Whether you are into gaming, HD movies, television, music',
    brand: 'Sony',
    category: 'Accessories',
    price: 399.99,
    countInStock: 10,
    rating: 0,
    numReviews: 0
  },
  {
    name: 'Google Home Mini',
    image: '/images/google_home_mini.jpg',
    description:
      "Get hands-free help in any room with Google Home Mini Chalk. It's powered by Google Assistant so you can ask it questions or tell it to do things. This Google Home chalk is your own personal Google. Just start with 'Hey Google' to get answers from Google, tackle your day and enjoy music and entertainment. This Google Mini chalk will help you to control your smart home or entertain the family. And when you ask for help, it can tell your voice from others for a more personalized experience. Google Home Mini Chalk works on its own or you can have a few around the house, giving you the power of Google throughout your space.",
    brand: 'Google',
    category: 'Accessories',
    price: 49.99,
    countInStock: 7,
    rating: 0,
    numReviews: 0
  },
  {
    name: 'Galaxy S22 Ultra',
    image: '/images/galaxy_s22_ultra.png',
    description:
      'The Samsung Galaxy S22 Ultra offers the ultimate epic standard of smartphone experiences bringing back the best of Galaxy Note to the S22 line with an embedded SPen enabling new ways to work and create on the go. The quad cameras let you capture premium detail with the ultra-clear 108MP main lens, the highest resolution available on a smartphone. Shoot videos that rival how epic your life is with stunning 8K recording. Your favorite content will look even better on the amazingly bright 6.8” WQHD+ Dynamic AMOLED 2X display with adaptive 120Hz refresh rate. The Galaxy S22 Ultra’s long lasting 5000 mAh intelligent battery powers your day and then some. Do more of what you love, with the incredibly fast 4nm processor, all on the nation’s largest, fastest, and most reliable nationwide 5G network.\n\nAvailable in three memory variants, 8GB RAM/128 ROM, 12GB RAM/256GB ROM, or 12GB RAM/512GB ROM.',
    brand: 'Samsung',
    category: 'Mobile',
    price: 1074.99,
    countInStock: 6,
    rating: 0,
    numReviews: 0
  },
  {
    name: 'Cannon EOS 80D DSLR Camera',
    image: '/images/camera.jpg',
    description:
      'Characterized by versatile imaging specs, the Canon EOS 80D further clarifies itself using a pair of robust focusing systems and an intuitive design',
    brand: 'Cannon',
    category: 'Camera',
    price: 929.99,
    countInStock: 0,
    rating: 0,
    numReviews: 0
  },
  {
    name: 'Google Pixel 5a with 5G (128GB, 6GB)',
    image: '/images/pixrl_5a.jpg',
    description:
      "Pixel 5a with 5G, the latest A-series Pixel phone from Google with many of the helpful features users have grown to love (and a few new hardware additions) all at a more affordable price. The phone arrives on August 26 and includes IP67 water resistance, a powerful battery, Pixel's impressive dual camera system and a whole lot more",
    brand: 'Google',
    category: 'Mobile',
    price: 449.0,
    countInStock: 8,
    rating: 0,
    numReviews: 0
  },
  {
    name: 'Airpods Wireless Bluetooth Headphones',
    image: '/images/airpods.jpg',
    description:
      'Bluetooth technology lets you connect it with compatible devices wirelessly High-quality AAC audio offers immersive listening experience Built-in microphone allows you to take calls while working',
    brand: 'Apple',
    category: 'Headphone',
    price: 89.99,
    countInStock: 3,
    rating: 0,
    numReviews: 0
  },
  {
    name: 'Lenovo IdeaPad 5 15.6" | 11th Gen - i7-1165G7 | 12GB RAM | 512GB SSD',
    image: '/images/lenovo_ideapad5.jpg',
    description:
      'Hard Drive: 512GB SSD. Memory: 12GB DDR4. Display: 15.6" FHD (1920 x 1080) IPS Touch Screen LED-Backlit Display. Screen Resolution: 1920 x 1080. Processor: Intel i7-1165G7 Processor at 2.8GHz. Graphics: Integrated Intel Iris Xe Graphics. Operating system: Windows 10 Home 64-bit. Bluetooth: Bluetooth 5.1.',
    brand: 'Lenovo',
    category: 'Computer',
    price: 799.99,
    countInStock: 7,
    rating: 0,
    numReviews: 0
  },
  {
    name: 'iPhone 13 Pro Max, 128GB',
    image: '/images/iPhone_13_Pro_Max.jpg',
    description:
      'iPhone 13 Pro. Even more Pro. The iPhone 13 Pro Max on SIMPLE Mobile features the biggest pro system camera upgrade ever and lightning-fast performance with the all-new A15 bionic chip. Shoot incredible low-light photos and videos with the new 12MP Telephoto, Wide, and Ultra Wide cameras and make movie magic with Cinematic mode. With 128GB of storage space, you’ll be able to download and store your favorite apps, games, music and more! Plus, enjoy the 6.7-inch Super Retina XDR display with ProMotion for a faster, more responsive feel. Add in durability, power and speed with Ceramic Shield, a leap in battery with up to 28 hours of video playback, the best battery life ever in an iPhone² and 5G capability for superfast downloads and high-quality streaming¹. Pair it with a no-contract unlimited talk, text & data plan from SIMPLE Mobile with coverage on a nationwide 5G network.',
    brand: 'Apple',
    category: 'Mobile',
    price: 1099.0,
    countInStock: 10,
    rating: 0,
    numReviews: 0
  }
];

module.exports = products;
