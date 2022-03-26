const mongoose = require("mongoose");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");
const Campground = require("../models/campground");

mongoose.connect("mongodb://localhost:27017/yelp-camp", {
  useNewUrlParser: true,
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 300; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      // author -  your user id
      author: "6234d5adc006ce250dff6390",
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      description:
        "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Excepturi blanditiis debitis suscipit. Deleniti, dolorem, earum temporibus quasi dolores nisi mollitia omnis facere nihil maiores amet quo architecto aliquid fuga sapiente.",
      price,
      geometry: {
        type: "Point",
        coordinates: [
          cities[random1000].longitude,
          cities[random1000].latitude,
        ],
      },
      images: [
        {
          url: "https://res.cloudinary.com/deiacifoni/image/upload/v1647998269/YelpCamp/xuetctlkix4h73lnxxz4.jpg",
          filename: "YelpCamp/xuetctlkix4h73lnxxz4",
        },
        {
          url: "https://res.cloudinary.com/deiacifoni/image/upload/v1647998269/YelpCamp/rglfff8yno4sbqrazljx.jpg",
          filename: "YelpCamp/rglfff8yno4sbqrazljx",
        },
        {
          url: "https://res.cloudinary.com/deiacifoni/image/upload/v1647998270/YelpCamp/ojzqqfev8mtxca6cvmcj.jpg",
          filename: "YelpCamp/ojzqqfev8mtxca6cvmcj",
        },
      ],
    });
    await camp.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
