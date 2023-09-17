// Import necessary modules
const express = require('express');
const AWS = require('aws-sdk');
require("dotenv").config();
const app = express();

// Set up AWS configuration (as shown above)
AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    sessionToken: process.env.AWS_SESSION_TOKEN,
    region: process.env.REGION,
});
// Define the S3 bucket name and counter object key
const bucketName = '11047836-counter'; // Replace with your S3 bucket name
const counterObjectKey = 'visit-counter.json'; // The counter object key in S3

// Initialize the S3 service
const s3 = new AWS.S3();

// Check if the S3 bucket exists, and create it if it doesn't
async function createBucketIfNotExists() {
  try {
    await s3.headBucket({ Bucket: bucketName }).promise();
  } catch (error) {
    if (error.statusCode === 404) {
      // Bucket does not exist, create it
      await s3.createBucket({ Bucket: bucketName }).promise();
    } else {
      throw error;
    }
  }
}

// Initialize the visit counter object in S3 if it doesn't exist
async function initializeCounter() {
  const params = {
    Bucket: bucketName,
    Key: counterObjectKey,
  };

  try {
    // Check if the object exists
    await s3.headObject(params).promise();
  } catch (error) {
    if (error.statusCode === 404) {
      // Object does not exist, create it with an initial count of 0
      await s3.putObject({ Bucket: bucketName, Key: counterObjectKey, Body: JSON.stringify({ count: 0 }) }).promise();
    } else {
      throw error;
    }
  }
}

// Retrieve the visit count from the counter object in S3
async function retrieveCountFromS3() {
  const params = {
    Bucket: bucketName,
    Key: counterObjectKey,
  };

  const response = await s3.getObject(params).promise();
  const counterData = JSON.parse(response.Body.toString());
  return counterData.count;
}

// Update the visit count in the counter object in S3
async function updateCountInS3(newCount) {
  const params = {
    Bucket: bucketName,
    Key: counterObjectKey,
    Body: JSON.stringify({ count: newCount }),
  };

  await s3.putObject(params).promise();
}

// Handle GET requests
async function initializeAws() {
  try {
    // Ensure the S3 bucket exists
    await createBucketIfNotExists();

    // Initialize the visit counter object in S3
    await initializeCounter();

    // Retrieve the current visit count from S3
    const currentCount = await retrieveCountFromS3();

    // Increment the count
    const newCount = currentCount + 1;

    // Update the counter object in S3
    await updateCountInS3(newCount);

    // Display the current count
    return (`Page visits: ${newCount}`);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Internal Server Error');
  }
};

module.exports = {
    initializeAws, // Export the initializeAws function
  };

