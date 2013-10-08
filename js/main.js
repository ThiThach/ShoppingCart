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
					
					
		/*
for (var i=0, len=items.length; i<len; i++){
			var item = new TShoppingCart.Product(items[i]);
			//var product = new TShoppingCart.Product(items[i]);
			//console.log(product);
			var item = new ko.protectedObservableItem(item);
			//console.log(item);
			self.items().push(item);
		}
*/
		
		//var koItems = ko.toProtectedObservableItemArray(items, self.toShoppingProduct, self.doneHandler);	
		self.items = ko.observableArray(ko.toProtectedObservableItemArray(items, self.toShoppingProduct));	
	};
	
	self.buy = function(item) {
	console.log(item);
		self.cart.add(item);
		item.buy();	
	};

	self.doneHandler = function (items) {
		console.log(items);
		ko.utils.arrayMap(items, function(item){
		
			self.items().push(item.applySubscribes());
		});	

	}

	self.toShoppingProduct = function(item) {
		return new window.TShoppingCart.Product(item);
	}

	//------ Thi codes --------
	self.selectedItem = ko.observable(null);
	self.selectItem = function() {
		self.selectedItem(this);
	};
	
	self.newItem = function() {
		var currentItem = self.selectedItem();
		var isOldRecord = (currentItem && currentItem.id);
		
		if (isOldRecord){
			currentItem.commit();
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
	
/*
	self.protectedItem = function (product) {
		return {
			id: ko.protectedObservable(product.id),
			name:ko.protectedObservable(product.name),
			price:ko.protectedObservable(product.price),
			stock:ko.protectedObservable(product.stock)
		};
	};
	
	self.toProtectedObservableItems =  function(items) {
		var result = ko.utils.arrayMap(items, function(item) {
			return new protectedItem(item);
		});
		
		return result;
	};
*/
	
	
};