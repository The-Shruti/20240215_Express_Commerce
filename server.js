var express = require('express'); 
const bodyParser = require('body-parser');
var app = express();
var path = require('path');
var fs = require('fs');

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Load products from JSON file
var products = JSON.parse(fs.readFileSync('products.json'));

// Route to display all products
app.get('/', (req, res) => {
    res.json(products);
}); 

// Route to fetch data of a particular product by ID
app.get('/products/:id', (req, res) => {
    const productId = parseInt(req.params.id);
    const product = products.find(product =>{
    if( product.id == productId){
        return product
    }});
    if (product) {
        res.json(product);
    } else {
        res.status(404).json({ error: 'Product not found' });
    }
}); 

// Route to fetch data of a particular product by ID using query parameters
app.get('/products', (req, res) => {
    const productId = parseInt(req.query.id);
    const product = products.find(product => product.id === productId);
    if (product) {
        res.json(product);
    } else {
        res.status(404).json({ error: 'Product not found' });
    }
}); 

app.use(bodyParser.json());
// Route to create a new product
app.post('/products', (req, res) => {
    const newProduct = req.body;
    
    // Read existing product data from the file
    const existingData = JSON.parse(fs.readFileSync('products.json', 'utf8'));
    
    // Add the new product to the existing array
    existingData.push(newProduct);
    
    // Write the updated data back to the file
    fs.writeFileSync('products.json', JSON.stringify(existingData, null, 2));

    // Update the products variable with the new data
    products = existingData;
    
    // Send the updated list of products as the response
    res.status(201).json(existingData);
});
 
app.use(bodyParser.json());
// Route to fetch data of a particular product by ID
app.post('/products/:id', (req, res) => {
    const productId = parseInt(req.params.id);
    const product = products.find(product =>{
    if( product.id == productId){
        return product
    }});
    if (product) {
        res.json(product);
    } else {
        res.status(404).json({ error: 'Product not found' });
    }
}); 

const PORT = 5000;

// Route to update a particular product by ID using PUT method
app.put('/products/:id', (req, res) => {
    const productId = parseInt(req.params.id);
    const updatedProduct = req.body;

    // Find the index of the product in the array
    const index = products.findIndex(product => product.id === productId);
    if (index !== -1) {
        // Update the product in the array
        products[index] = { ...products[index], ...updatedProduct };

        // Write the updated products array back to the JSON file
        fs.writeFileSync('products.json', JSON.stringify(products, null, 2));

        res.json(products[index]); // Send back the updated product
    } else {
        res.status(404).json({ error: 'Product not found' });
    }
});  

// File paths
const ordersFilePath = './orders.json'; 

function generateUniqueId() {
    // Generate a unique ID logic here
    // For example, you can use a library like 'uuid' to generate UUIDs
    const uuid = require('uuid');
    return uuid.v4();
}
// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Function to append an object to a JSON file synchronously
function appendObjectToJSONFileSync(filePath, objectData) {
    try {
        let jsonData = JSON.parse(fs.readFileSync(filePath, 'utf8'));

        // Check if the file content is an array
        if (!Array.isArray(jsonData)) {
            jsonData = [];
        }

        // Append the object to the array
        jsonData.push(objectData);

        // Write the updated data back to the JSON file
        fs.writeFileSync(filePath, JSON.stringify(jsonData, null, 2));

        console.log('Object appended to JSON file successfully.');
    } catch (err) {
        console.error('Error appending object to JSON file:', err);
    }
}

// Route to fetch data of a particular order by ID
app.get('/orders/:id', (req, res) => {
    const orderId = req.params.id; // Get the order ID from the URL parameters
    const orders = JSON.parse(fs.readFileSync(ordersFilePath, 'utf8'));

    // Find the order with the specified ID
    const order = orders.find(order => order.o_id === orderId);

    // If the order is found, send it as a response. Otherwise, send a 404 error.
    if (order) {
        res.json(order);
    } else {
        res.status(404).json({ error: 'Order not found' });
    }
});  
 
// Route to create a new order
app.post('/orders', (req, res) => {
    const newOrder = req.body;

    // Generate a unique order ID
    newOrder.o_id = generateUniqueId();

    // Set the order date to the current date
    newOrder.o_date = new Date().toISOString();

    // Add the new order to the orders array or save it to the orders.json file
    appendObjectToJSONFileSync(ordersFilePath, newOrder);

    // Send a success response
    res.status(201).json(newOrder);
}); 

// Route to update a particular order by ID using PUT method
app.put('/orders/:id', (req, res) => {
    const orderId = req.params.id; // Get the order ID from the URL parameters
    const updatedOrder = req.body; // Get the updated order data from the request body

    // Read the existing orders data from the JSON file
    const orders = JSON.parse(fs.readFileSync(ordersFilePath, 'utf8'));

    // Find the index of the order in the array
    const index = orders.findIndex(order => order.o_id === orderId);
    if (index !== -1) {
        // Update the order in the array
        orders[index] = { ...orders[index], ...updatedOrder };

        // Write the updated orders array back to the JSON file
        fs.writeFileSync(ordersFilePath, JSON.stringify(orders, null, 2));

        res.json(orders[index]); // Send back the updated order
    } else {
        res.status(404).json({ error: 'Order not found' });
    }
});


// Route to delete a particular product by ID using DELETE method
app.delete('/products/:id', (req, res) => {
    const productId = parseInt(req.params.id); // Get the product ID from the URL parameters

    // Find the index of the product in the array
    const index = products.findIndex(product => product.id === productId);
    if (index !== -1) {
        // Remove the product from the array
        products.splice(index, 1);

        // Write the updated products array back to the JSON file
        fs.writeFileSync('products.json', JSON.stringify(products, null, 2));

        res.status(204).send(); // Send a 204 No Content response
    } else {
        res.status(404).json({ error: 'Product not found' });
    }
}); 

// Route to delete a particular order by ID using DELETE method
app.delete('/orders/:id', (req, res) => {
    const orderId = req.params.id; // Get the order ID from the URL parameters

    // Load existing orders from the JSON file
    let orders = JSON.parse(fs.readFileSync(ordersFilePath, 'utf8'));

    // Find the index of the order in the array
    const index = orders.findIndex(order => order.o_id === orderId);
    if (index !== -1) {
        // Remove the order from the array
        orders.splice(index, 1);

        // Write the updated orders array back to the JSON file
        fs.writeFileSync(ordersFilePath, JSON.stringify(orders, null, 2));

        // Log success message
        console.log(`Order with ID ${orderId} deleted successfully.`);
        
        res.status(204).send(); // Send a 204 No Content response
    } else {
        // Log error message
        console.error(`Order with ID ${orderId} not found.`);
        
        res.status(404).json({ error: 'Order not found' });
    }
});




// Start the server
var server = app.listen(5000, () => {
    console.log("Express App running");
});
