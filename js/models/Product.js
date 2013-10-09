window.TShoppingCart =  window.TShoppingCart || {};

window.TShoppingCart.Product = function(data) {
	
	//private properties ---------
	var self = this;
	var _originalStock = data.stock;
	
	self.id = ko.protectedObservable(data.id);
	self.name = ko.protectedObservable(data.name);
	self.description = ko.protectedObservable(data.description);
	self.price = ko.protectedObservable(data.price);
	self.imageUrl = ko.protectedObservable(data.imageUrl);
	self.baseProductId = ko.protectedObservable(data.baseProductId);
	self.stock = ko.protectedObservable(data.stock);
	self.bought = ko.protectedObservable(0);

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
		self.bought.commit();
	};
	
	self.inStock = ko.computed(function(){
		return (self.stock() > 0);
	});
	
	self.subtotal = ko.computed(function(){
		return self.bought() * self.price;
	});

	self.reset = function() {
		self.bought(0);
	};

	self.save = function() {
		for (var property in self){
			if (self.hasOwnProperty(property) && self[property].commit) 
				self[property].commit();
		}
		
		_originalStock = self.stock();
	}	
};