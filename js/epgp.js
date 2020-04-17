var lh,
LootHistory;

LootHistory = {
	settings: {
		lootHistory: {},
		loot: {},
		searchBox: $('#search-loot')

	},

	init: function(url) {
		lh = LootHistory.settings;
		LootHistory.bindUIActions();
		LootHistory.getLootHistory(url);
	},

	bindUIActions: function() {

		lh.searchBox.on("input", function(e) {
				var term = lh.searchBox.val();
				LootHistory.searchLoot(term);
		});

	},

	getLootHistory: function (url) {
		$.getJSON( url, function( data ) {  
		    lh.lootHistory = data.loot;
				LootHistory.display(lh.lootHistory);
				
        LootHistory.searchLoot(lh.searchBox.val());
		});




	},

	display: function(items) {


		for (var i=0; i<items.length; i++) {

			var item = items[i];

			var displayContainer = $('<tr>', {
				"class": "display-container"
			}).insertAfter($('#loot-history'));

			var displayDate = $('<td>', {
				"class": "display-date",
				"data-timestamp": item[0],
				"text": LootHistory.parseDate(item[0])
			}).appendTo(displayContainer);

			var displayName = $('<td>', {
				"class": "display-name",
				"text": LootHistory.stripName(item[1])
			}).appendTo(displayContainer);

			var displayLink = $('<td>', {
				"class": "display-link"
			}).appendTo(displayContainer);

			var displayItem = $('<a>', {
				"class": "display-item",
				"href": LootHistory.formatItem(item[2]),
				"text": LootHistory.formatItem(item[2])
			}).appendTo(displayLink);

			var displayGP = $('<td>', {
				"class": "display-gp",
				"text": item[3]
			}).appendTo(displayContainer);
		}


	},

	parseDate: function(timestamp) {
		var date = new Date(timestamp*1000);

		var month = date.getMonth() + 1;
		var day = date.getDate();
		var year = date.getFullYear();

		var formattedTime = month +'/' + day + '/' + year;
		return formattedTime;
	},

	stripName: function(name) {
		return name.split('-')[0];
	},

	formatItem: function(item_string) {
		var item = item_string.split(':');
		var itemID = item[1];
		var link = "http://classic.wowhead.com/item=" + itemID;

		return link;
	},

	searchLoot: function(term) {
	  // Declare variables 
	  var table, tr, displayName, lootItem, i, filter;
	  table = $(".loot-history");
	  tr = $(".display-container");
	  filter = term.toUpperCase();

	  // Loop through all table rows, and hide those who don't match the search query
	  for (i = 0; i < tr.length; i++) {
	    displayName = tr[i].getElementsByClassName("display-name");
	    lootItem = tr[i].getElementsByClassName("display-item");
	    if (displayName || lootItem) {
	      if (displayName[0].innerHTML.toUpperCase().indexOf(filter) > -1 || lootItem[0].innerText.toUpperCase().indexOf(filter) > -1) {
	        tr[i].style.display = "";
	      } else {
	        tr[i].style.display = "none";
	      }
	    } 
	  }
	}
};