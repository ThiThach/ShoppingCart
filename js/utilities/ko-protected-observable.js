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
