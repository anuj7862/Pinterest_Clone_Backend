const mongoose = require('mongoose');

const exploreCardModel = mongoose.Schema({
    image: {
        type: String,
        required : true,
    },
    title: {
        type: String,
        required : true,
    },
    description: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        default: () => {
            const currentDate = new Date();
            const year = currentDate.getFullYear();
            const month = String(currentDate.getMonth() + 1).padStart(2, '0');
            const day = String(currentDate.getDate()).padStart(2, '0');
            return `${year}-${month}-${day}`;
          },
    }
});


module.exports = mongoose.model("exploreCard", exploreCardModel);
