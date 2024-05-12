const mongoose = require('mongoose');
const cities = require('./cities');
const {descriptors ,places} = require('./seedHelpers'); // here descriptors & places are both seperate arrays
const Campground = require('../models/campground');
mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp')
    .then(() => {
        console.log("Success");
    })
    .catch(err => {
        console.log("Error");
        console.log(err);
    })

const sample = array => array[Math.floor(Math.random() *array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0 ; i <50 ; i++){
        const random1000 = Math.floor(Math.random() *1000);
        const price = Math.floor(Math.random() * 20) + 10 ;
        const camp = new Campground({
            location : `${cities[random1000].city} , ${cities[random1000].state}`,
            title : `${sample(descriptors)} ${sample(places)}` ,// here both (descriptors) & (places) are passed as arrays in sample function which expects array
            image :'https://source.unsplash.com/collection/483251',
            description : 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt quos at voluptatum dolores facere odit, consequuntur minima hic perspiciatis? Nam, quo. Aspernatur autem illo voluptates unde inventore totam, hic recusandae.',
            price : price
        })
        await camp.save();
    }
}

seedDB().then (() => {
    mongoose.connection.close();
})
