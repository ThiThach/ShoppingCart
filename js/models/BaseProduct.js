window.TShoppingCart =  window.TShoppingCart || {};

window.TShoppingCart.BaseProduct = function(data) {
	var self = this;
	
	self.id = ko.observable(data.Id);
	self.name = ko.observable(data.Name);
	self.description = ko.observable(data.description);
	self.stockInHand = ko.observable(data.stockInHand);
	self.cost = ko.observable(data.cost);
	self.imageUrl = ko.observable(data.imageUrl);
};