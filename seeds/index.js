const fs = require('fs');
const path = require('path');
const seedCategories = require('./category-seeds');
const seedProducts = require('./product-seeds');
const seedTags = require('./tag-seeds');
const seedProductTags = require('./product-tag-seeds');

const sequelize = require('../config/connection');

const runSchema = async () => {
  // Read the SQL file
  const schemaSql = fs.readFileSync(path.resolve(__dirname, '../db/schema.sql'), 'utf8');

  // Split the SQL statements into an array
  const queries = schemaSql.split(';');

  // Execute each query using the Sequelize connection
  for (const query of queries) {
    if (query.trim() !== '') {
      await sequelize.query(query);
    }
  }
};

const seedAll = async () => {
  // Run the schema.sql file
  await runSchema();
  console.log('\n----- SCHEMA SYNCED -----\n');

  // Sync and seed the Sequelize models
  await sequelize.sync({ force: true });
  console.log('\n----- DATABASE SYNCED -----\n');
  await seedCategories();
  console.log('\n----- CATEGORIES SEEDED -----\n');
  await seedProducts();
  console.log('\n----- PRODUCTS SEEDED -----\n');
  await seedTags();
  console.log('\n----- TAGS SEEDED -----\n');
  await seedProductTags();
  console.log('\n----- PRODUCT TAGS SEEDED -----\n');

  process.exit(0);
};

seedAll();