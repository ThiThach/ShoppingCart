/* http://www.knockmeout.net/2011/03/guard-your-model-accept-or-cancel-edits.html */
//wrapper for observable that protects value until comitted
ko.protectedObservable = function(initialValue){
	
	//private variables
	var _temp = initialValue;
	var _actual = ko.observable(initialValue);
	
	var result = ko.dependentObservable({
		read: function() {
			return _actual();
		},
		write: function (newValue){
			_temp = newValue;
		}
	});
	
	//commit the temporary value our observable, if different
	result.commit = function() {
		if (_temp !== _actual())
			_actual(_temp);	
	};
	
	//notify subscribers to update their value with original
	result.reset = function() {
		_actual.valueHasMutated();
		_temp = _actual();	
	};
	
	return result;
};


ko.protectedObservableItem = function(item){
	for (var param in item){
		if (item.hasOwnProperty(param))
		{
			if (typeof item[param] == "function")
				this[param] = item[param];
			else
				this[param] = ko.protectedObservable(item[param]);
		}
	}
	
	this.commit = function() {
		for (var property in this){
			if (this.hasOwnProperty(property) && this[property].commit) //&& typeof item[param] != 'function'
				this[property].commit();
		}
	}
};

ko.toProtectedObservableItemArray = function(sourceArray, convertToCallerObjectFirst, doneHandler) {
	var drillItems = ko.utils.arrayMap(sourceArray, function(item){
		if (convertToCallerObjectFirst != null)
			item = convertToCallerObjectFirst(item);
						
		return new ko.protectedObservableItem(item);
	});	
	
	if (doneHandler)
		doneHandler(drillItems);
		
	return drillItems;
};


