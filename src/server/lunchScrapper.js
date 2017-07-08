var request = require('request'),
	cheerio = require('cheerio'),
	Days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'],
	menus = [];

var lunchScrapper = {

	//Need to handle the case when the cafe is closed
	getLunchMenu: function()
	{
		var count = 0,
			prevDay = 'Monday';

		var promise = new Promise(function(resolve, reject){

			request('http://www.nexdine.com/lexingtoncrossing/menu', function(err, resp, body){
				if(!err && resp.statusCode == 200){
					var $ = cheerio.load(body);
					var menu = [];
					$('td', '#content').each(function(){
						var text = $(this).text();
						text = text.replace(/\n/g, "");
						if (!text.match(/^\s*$/)){
							if(Days.indexOf(text.toLowerCase()) >= 0){
								if(text != prevDay){
									menus.push(menu);
									prevDay = text;
									menu = new Array();
									menu.push(text);
								} else {
									menu.push(text);
								}
							} else {
								menu.push(text);
							}
							
						}
					});
					menus.push(menu);
					if(menus.length > 0){
						resolve(menus);
					} else {
						reject(Error("opps"));
					}
				}
			});
		});
		return promise;
	}
}
module.exports = lunchScrapper;