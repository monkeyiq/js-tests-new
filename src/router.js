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
const brands = [
    { id: 1, name: 'Donut King' }
];

// brand id is the array index.
var db = [
    {
	brandname: 'Donut King',
	stores: [ {name:'Brisbane CBD', storeid:1 }, {name: 'Manly', storeid:656 } ]
    }, {
	brandname: 'Donut Queen',
	stores: [ {name:'San Fran', storeid: 54}, {name:'Alice Springs', storeid:6 } ]
    }
];

module.exports = (app) => {
    
    // Returns all brands:
    // curl  'http://127.0.0.1:3000/api/brands'
    // [{"id":0,"name":"Donut King"},{"id":1,"name":"Donut Queen"}]
    app.get('/api/brands', (req, res) => {
	var result = db.map( function(x,idx) { return {id:idx, name: x.brandname } } );
	res.json(result);
    });
    
    // Returns all stores:
    // curl  'http://127.0.0.1:3000/api/stores'
    // [ {"id":1,"name":"Brisbane CBD"},{"id":656,"name":"Manly"},
    //   {"id":54,"name":"San Fran"},{"id":6,"name":"Alice Springs"} ]
    app.get('/api/stores', (req, res) => {
	var result = db.map( x => x.stores.map( x => {return {id: x.storeid, name: x.name}} ));
	result = [].concat.apply([], result);
	res.json(result);
    });
    
    // Returns all stores for a particular brand ID:
    // curl  'http://127.0.0.1:3000/api/brands/1/stores'
    // ["San Fran","Alice Springs"]
    // curl  'http://127.0.0.1:3000/api/brands/2/stores'
    // Invalid brand ID 2 selected.
    app.get('/api/brands/:brandId/stores', (req, res) => {
	var bid = req.params.brandId;
	if( bid < 0 || bid >= db.length ) {
	    res.send(`Invalid brand ID ${req.params.brandId} selected.`);
	} else {
	    var result = db[bid].stores.map( x => x.name );
	    res.json(result);
	}
    });
    
    // Updates a store:
    // curl -X PUT  'http://127.0.0.1:3000/api/stores/6?name=Barry'
    app.put('/api/stores/:storeId', (req, res) => {
	var sid  = req.params.storeId;
	var name = req.query.name;
	var changeName = function( store ) {
	    if( store.storeid == sid ) {
		store.name = name;
		res.send('Updated your store.');
	    }
	}
	var result = db.map( x => x.stores.map(changeName) );
	res.send('Store not found!');
    });
};
