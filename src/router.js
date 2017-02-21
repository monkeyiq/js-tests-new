/**
 * OBJECTIVES:
 * 
 * Create a very simple Node.js API to manage a list of "brands" and "stores."
 * 
 * - Entities:
 *   - brand (e.g. "Donut King")
 *   - store (e.g. "Donut King Brisbane CBD", "Donut King Manly", etc.)
 * 
 * - Relationships
 *   - A brand may have many stores.
 *   - A store belongs to a brand.
 * 
 * - Only a 'name' field is required on each entity.
 * - Data may be stored in memory on the server.
 *
 *  Satisfy the following API endpoints:
 */
const brands = [{ id: 1, name: 'Donut King' }];

module.exports = (app) => {
  
  // Returns all brands:
  app.get('/api/brands', (req, res) => {
    res.json(brands);
  });
  
  // Returns all stores:
  app.get('/api/stores', (req, res) => {
    res.send('List all stores here.');
  });
  
  // Returns all stores for a particular brand ID:
  app.get('/api/brands/:brandId/stores', (req, res) => {
    res.send(`List all stores for brand ID ${req.params.brandId} here.`);
  });
  
  // Updates a store:
  app.put('/api/stores/:storeId', (req, res) => {
    res.send('Update a store here.');
  });
};
