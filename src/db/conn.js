const mongoose = require("mongoose");
mongoose.connect('mongodb://localhost:27017/BloodHub', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log(`Connection successful`);
}).catch((e) => {
    console.error(`Connection error: ${e.message}`);
});
