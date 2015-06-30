var	dbConn = require('./database_connection.js'),
	express = require('express');
	
function use_produk(req, res, next){
	// mengambil satu produk berdasar produk_id
	function deleteProduk(){
		sql = "delete from produk where id="+req.query.id;
		console.log(sql)
		dbConn.query(sql, function(err, rows){
			if(err)	return console.log(err); 
			res.end("Delete produk dengan ID: "+req.query.id+", berhasil dengan baik.");
		});
	}
	
	// mengambil satu produk berdasar produk_id
	function getProduk(){
		sql = "select * from produk where id="+req.query.id;
		console.log(sql)
		dbConn.query(sql, function(err, rows){
			if(err)	return res.json({error:"Error: "+err}); 
			if(!rows[0]) return res.json({error:"Error: data produk dengan ID:"+req.query.id+", tidak ada."});
			res.json(rows[0]);
		});		
	}
	
	// nambah satu produk
	function insertProduk(){
		var kode = req.query.kode;
		var kategori = req.query.kategori;
		var merk = req.query.merk;
		var produk = req.query.nama;
		var harga_satuan = req.query.harga_satuan;
		var harga_beli = req.query.harga_beli;
		var pajak_persen = req.query.pajak_persen;
		sql = "insert produk (kode, kategori, merk, produk, harga_satuan, harga_beli, pajak_persen) "
			+ " values ('"+kode+"', '"+kategori+"', '"+merk+"', '"+produk+"', '"+harga_satuan+"', '"+harga_beli+"', '"+pajak_persen+"')";
		console.log(sql)
		dbConn.query(sql, function(err, rows){
			if(err)	return console.log(err); 
			dbConn.query("select last_insert_id() as id", function(err, rows){
				var id = rows[0].id;
				res.end("Sukses: Penambahan data produk dengand ID: "+id+", berhasil dengan baik.");
			});
		});		
	}
	
	// update satu produk
	function updateProduk(){
		var kode = req.query.kode;
		var kategori = req.query.kategori;
		var merk = req.query.merk;
		var produk = req.query.nama;
		var harga_satuan = req.query.harga_satuan;
		var harga_beli = req.query.harga_beli;
		var pajak_persen = req.query.pajak_persen;
		sql = "update produk set kode='"+kode+"', kategori='"+kategori+"', merk='"+merk+"', Produk='"+produk+"', harga_satuan='"+harga_satuan+"', harga_beli='"+harga_beli+"', pajak_persen='"+pajak_persen+"' where id="+req.query.id;
		console.log(sql)
		dbConn.query(sql, function(err, rows){
			if(err)	return console.log(err); 
			res.end("Sukses: Update data produk dengan ID: "+req.query.id+", berhasil dengan baik.");
		});		
	}
	console.log(req.query)
	var act = req.query.action;
	// melakukan perintah ke MySQL berdasar data act.
	switch(act){
		case 'delete':
			deleteProduk();
			break;
		case 'get':
			getProduk();
			break;
		case 'insert':
			insertProduk();
			break;
		case 'update':
			updateProduk();
			break;
	} 

}

function use_salesman(req, res, next){
	// mengambil satu produk berdasar produk_id
	function getSalesman(){
		sql = "select * from Salesman where salesman_id="+req.query.id;
		console.log(sql)
		dbConn.query(sql, function(err, rows){
			if(err)	return console.log(err); 
			res.json(rows[0]);
		});		
	}
	
	// menambah satu produk
	function updateSalesman(){
		var kode = req.query.kode;
		var kategori = req.query.kategori;
		sql = "insert Salesman (kode, kategori, merk, Salesman, harga_satuan, harga_beli, pajak_persen) "
			+ " values ('"+kode+"', '"+kategori+"', '', '', '', '', '')";
		console.log(sql)
		dbConn.query(sql, function(err, rows){
			if(err)	return console.log(err); 
			res.end("Sukses: Penambahan data Salesman berhasil dengan baik.");
		});		
	}
	console.log(req.query.action)
	var act = req.query.action;
	// melakukan perintah ke MySQL berdasar data act.
	switch(act){
		case 'delete':
			deleteSalesman();
			break;
		case 'get':
			getSalesman();
			break;
		case 'insert':
			insertSalesman();
			break;
		case 'update':
			updateSalesman();
			break;
	} 

}

function use_faktur(req, res, next){
	function getPenjualan(){
		sql = "select YEAR(faktur_tanggal) AS Tahun, SUM(nilai_netto) AS Penjualan, SUM(pajak) AS Taxes FROM faktur GROUP BY Tahun";
		console.log(sql)
		dbConn.query(sql, function(err, rows){
			if(err)	return console.log(err); 
			res.json(rows);
		});		
	}
	
	console.log(req.query.action)
	var act = req.query.action;
	// melakukan perintah ke MySQL berdasar data act.
	switch(act){
		case 'get_penjualan':
			getPenjualan();
			break;
		} 

}

var app = express();
app.enable('etag');
app.use(express.static("/node.js/"));
app.use(express.static("/node.js/onlineretail/"));
app.use('/produk', use_produk); 
app.use('/salesman', use_salesman); 
app.use('/faktur', use_faktur); 

var port = 8011;
app.listen(port);
console.log("Server is listening at port:" + port);
