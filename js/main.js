window.TShoppingCart =  window.TShoppingCart || {};

window.TShoppingCart.App = function(data) {
	var self = this;
	
	self.items = ko.observableArray([]);
	self.cart = new window.TShoppingCart.Cart();
	
	self.init = function(){
		var items = [
					{id:1,name:'Milk',price:'1.75',stock:10},
					{id:2,name:'Sugar',price:'2.50',stock:20},
					{id:3,name:'Coffee',price:'12.99',stock:50} 
					];
					
					
		for (var i=0, len=items.length; i<len; i++){
			var item = new TShoppingCart.Product(items[i]);
			self.items().push(item);
		}
	};
	
	self.buy = function(item) {
		self.cart.add(item);
		item.buy();	
	};

	//------ Thi codes --------
	self.selectedItem = ko.observable(null);
	self.selectItem = function() {
		self.selectedItem(this);
	};
	
	self.newItem = function() {
		var currentItem = self.selectedItem();
		var isOldRecord = (currentItem && currentItem.id);
		
		if (isOldRecord){
			currentItem.save();
		}
		else {
			var item = new TShoppingCart.Product({id:self.items.length+1,name:self.selectedItem().name,price:'2',stock:10});
			self.items.push(item);
		}
		
		self.cancelItem();
	};	 
	
	self.cancelItem = function(){
		self.selectedItem(null);
	}	
	
};