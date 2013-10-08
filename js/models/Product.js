window.TShoppingCart =  window.TShoppingCart || {};

window.TShoppingCart.Product = function(data) {
	
	//private properties ---------
	var self = this;
	var _originalStock = data.stock;
	
	self.id = data.id;
	self.name = data.name;
	self.description = data.description;
	self.price = data.price;
	self.imageUrl = data.imageUrl;
	self.baseProductId = data.baseProductId;
	
	//private properites with observable --------------
	self.stock = function (value) {
		if (value)
			self._originalStock = value;
		else
			return _originalStock - self.bought();
	};
	
	self.bought = ko.observable(0);
	
	//methods and events ---------
	self.bought.subscribe(function(newValue){
		var val = parseInt(newValue);
		if (val > _originalStock) {
			val = _originalStock;
			self.bought(val);
			return;
		}
		
		self.stock(_originalStock - val);
	});
	
	self.buy = function() {
		self.bought(parseInt(self.bought()) + 1);	
	};
	
	self.reset = function() {
		self.bought(0);
	};
	
	self.inStock = ko.computed(function(){
		return (self.stock() > 0);
	});
	
	self.subtotal = ko.computed(function(){
		return self.bought() * self.price;
	});
	
};