const fs = require('fs');
const path = require('path');

// File paths
const productsFilePath = './products.json';
const ordersFilePath = './orders.json';

// Create initial products and orders files if they don't exist
if (!fs.existsSync(productsFilePath)) {
    fs.writeFileSync(productsFilePath, '[]');
}

if (!fs.existsSync(ordersFilePath)) {
    fs.writeFileSync(ordersFilePath, '[]');
}

/**
 * Function to append an object to a JSON file synchronously.
 * @param {string} filePath - The path to the JSON file.
 * @param {Object} objectData - The object to append.
 */
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

        console.log('Order Placed Successfully.');
    } catch (err) {
        console.error('Error appending object to JSON file:', err);
    }
}

// Usage example:
const newProduct1 = {
    id: 1,
    name: 'Product1',
    description: 'Protection Herbour',
    price: 10,
    stock: 100, 
    image: 'https://off.com.ph/en-ph/product/off-overtime', 
}; 

const newProduct2 = {
    id: 2,
    name: 'Product 2',
    description: 'Colgate',
    price: 20,
    stock: 150,
    image: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.colgate.com%2Fen-us%2Fproducts&psig=AOvVaw0efKwXDUTqFXnwnKkkilIM&ust=1708081444946000&source=images&cd=vfe&opi=89978449&ved=0CBMQjRxqFwoTCIjTjLGZrYQDFQAAAAAdAAAAABAJ',
};

const newProduct3 = {
    id: 3,
    name: 'Product 3',
    description: 'Description of Product 3',
    price: 30,
    stock: 200,
    image: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.cosmopolitan.com%2Fuk%2Fbeauty-hair%2Fg14191580%2Fbest-skin-care-products%2F&psig=AOvVaw0efKwXDUTqFXnwnKkkilIM&ust=1708081444946000&source=images&cd=vfe&opi=89978449&ved=0CBMQjRxqFwoTCIjTjLGZrYQDFQAAAAAdAAAAABAS',
}; 

const newProduct4 = {
    id: 4,
    name: 'Product 4',
    description: 'Himalaya',
    price: 50,
    stock: 80,
    image: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fhimalayawellness.in%2Fcollections%2Fall&psig=AOvVaw0efKwXDUTqFXnwnKkkilIM&ust=1708081444946000&source=images&cd=vfe&opi=89978449&ved=0CBMQjRxqFwoTCIjTjLGZrYQDFQAAAAAdAAAAABAa',
}; 

const newProduct5 = {
    id: 5,
    name: 'Product 5',
    description: 'Skincare',
    price: 90,
    stock: 200,
    image: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.healthline.com%2Fhealth%2Fwomens-health%2Fhers-review&psig=AOvVaw0efKwXDUTqFXnwnKkkilIM&ust=1708081444946000&source=images&cd=vfe&opi=89978449&ved=0CBMQjRxqFwoTCIjTjLGZrYQDFQAAAAAdAAAAABAi',
}; 

const newOrder = {};

// Append new product and order to their respective files
appendObjectToJSONFileSync(productsFilePath, newProduct5);
appendObjectToJSONFileSync(ordersFilePath, newOrder);

