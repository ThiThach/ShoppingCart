//Global functions
function formatCurrency(price) {

	return '$' + parseFloat(price).toFixed(2);
}

//remove display:none for div with class hide-by-default
function removeHiddenByDefaultItem(timeout){
	setTimeout(function(){
		$('.hide-by-default').removeClass('hide-by-default');
	}, parseInt(timeout));
}

$(function()
{

	require( ['cart'], function( ) {
	
		var items = [
					{id:1,name:'Milk',price:'1.75',stock:10},
					{id:2,name:'Sugar',price:'2.50',stock:20},
					{id:3,name:'Coffee',price:'12.99',stock:50} 
					];
							
		window.TShoppingCart =  window.TShoppingCart || {};
	
							
		window.TShoppingCart.App = function(data) {
			var self = this;
	
			self.items = ko.observableArray(ko.utils.arrayMap(items, function(obj)
				{
					return new TShoppingCart.Product(obj);
				})
			);
	
			
			self.cart = new window.TShoppingCart.Cart();
			self.filterText = ko.observable("");		
		
			
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
					removeHiddenByDefaultItem(100);
				}
				
				self.cancelItem();
			};	 
			
			self.cancelItem = function(){
				self.selectedItem(null);
			}
			
			
			self.filterProducts = ko.dependentObservable(function () {	
				
				var term = this.filterText().toLowerCase();
				if (!term)
				 	return this.items();
		
		        return ko.utils.arrayFilter(this.items(), function (item) {
	                return (item.name().toLowerCase().search(term) !== -1);
				});
			}, self);
		
						
		};
	
				
		//Initalise new shopping cart
		setTimeout(function(){
			var app = new window.TShoppingCart.App();
			ko.applyBindings(app);	
			removeHiddenByDefaultItem();
		}, 300);
		
	
	});


});	


