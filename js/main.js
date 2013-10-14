require( ['cart'], function( ) {

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
	
		self.remove = function(item){
			//get the remove item from the cart
			var tmp = ko.utils.arrayFirst(self.cart.items(), function(obj)
			{
				return (obj.id === item.id);
			});
			
			if (tmp !== null)
			{
				//set the bought value to zero will auto delete this time from the cart
				tmp.bought(0);	
				tmp.save();
			}
			
			//remove item from the product list
			self.items.remove(item);
		}
	
		//------ Thi codes --------
		self.selectedItem = ko.observable(null);
		self.selectItem = function() {
			self.selectedItem(this);		
		};
		
		self.newItem = function() {
			var item = new TShoppingCart.Product({id:0,name:'new product',price:'1.99',stock:1});
			self.selectedItem(item);
		};
		
		self.saveItem = function() {
			var currentItem = self.selectedItem();
			var isNew = (currentItem && currentItem.id() === 0);
			currentItem.save();
			
			if (isNew){
				var obj = {id:self.items().length+1,name:currentItem.name(),price:currentItem.price(),stock:currentItem.stock()};
				var item = new TShoppingCart.Product(obj);
				self.items.push(item);
			}
			
			self.cancelItem();
		};	 
		
		self.cancelItem = function(){
			self.selectedItem(null);
		}	
	};
	
	//Initalise new shopping cart
	setTimeout(function(){
		var app = new window.TShoppingCart.App();
		app.init();
		ko.applyBindings(app);	
	}, 400);
	

});

