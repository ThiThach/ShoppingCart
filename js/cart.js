window.TShoppingCart =  window.TShoppingCart || {};

window.TShoppingCart.Cart = function(data) {
	var self = this;
	
	self.items = ko.observableArray([]);
	self.isEmpty = ko.computed(function(){
		return (self.items().length == 0);
	});
	
	self.add = function(item) {
		var purchasedItem = ko.utils.arrayFirst(self.items(), function(obj){
			return (obj.id === item.id)
		});
		
		if (purchasedItem === null) {
			self.items.push(item);
			
			//if user change the bought quantity to zero
			//then we need to remove this item off the cart
			item.bought.subscribe(function(newValue){
				if (parseInt(newValue) === 0) {
					self.items.remove(item);
				}
			});
		}
	};
	
	self.subtotal = ko.computed(function(){
		var total = 0;
		ko.utils.arrayForEach(self.items(), function(item){
			if(item.bought()) {
				total += item.total();
			}
		});
		
		return total;
	});
};