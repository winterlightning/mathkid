jQuery.extend(KhanUtil, {
	// takes a as an array of digits and b as a number
	// returns an array of carry operations at each position and
	// the result in array form
	createLongMultiplicationTable: function( a, b ) {
		var carry = new Array(a.length);
		var digits = [];
		initArray( carry, 0);
		for( var i = 0; i < a.length; i++ ){
			var multi = paddedDigits( a[i] * b, 2 );
			var digitResult = paddedDigits( multi[0] + carry[i], 2 );
			digitResult[1] += multi[1];
			carry[i+1] = digitResult[1];
			digits[i] = digitResult[0];
			if( digitResult[1] !== 0 ){
				digits[i+1] = digitResult[1];
			}
		}
		return { carry: carry, digits: digits };
	},

	// takes a and b as addends in array form
	// returns the carrys at each position
	createLongAdditionTable: function( a, b, c ){
		if( !c ){
			c = [];
		}
		var length = Math.max( a.length, b.length, c.length );
		var paddedA = KhanUtil.padd( a, length);
		var paddedB = KhanUtil.padd( b, length);
		var paddedC = KhanUtil.padd( c, length);
		var carry = new Array( length + 1);
		var result = new Array( length + 1);
		KhanUtil.initArray( carry, 0 );
		KhanUtil.initArray( result, 0 );
		for( var i = 0; i < length; i++){
			var tempResult = KhanUtil.digits(paddedA[i] + paddedB[i] + paddedC[i] + carry[i]);
			if( tempResult[1] ){
				carry[i+1] = tempResult[1];
			}
			result[i] = tempResult[0];
		}
		return carry;
	},

	// take n as the dividend and div as the divisor
	// returns an object with three array
	// divisions contains every division that was performed
	// subtrahends contains the number that had to be subtracted from the division
	// minuends contains number that was subtracted from
	createLongDivisionTable: function(n,div){
		var temp = KhanUtil.digits(n);
		var divisions= [];
		var subtrahends = [];
		var minuends = [];
		for( var i=temp.length-1;i>=0;i--){
			var curDividend = 0;
			for( var y=i;y<temp.length;y++){
				curDividend+=temp[y]*Math.pow(10,y-i);
			}
			if(curDividend>=div || divisions.length > 0){
				var division=Math.floor(curDividend/div);
				divisions.push(division);
				var subtrahend = division*div;
				subtrahends.push(subtrahend);
				temp= KhanUtil.digits(parseInt(temp.reverse().join(""), 10)-subtrahend*Math.pow(10,i));
				minuends.push(curDividend);
			}
		}
		return {divisions:divisions, subtrahends:subtrahends, minuends:minuends};
	},

	createLongSubtractionTable: function( a, b ) {
		var i, table = a.slice();
		var borrow = new Array( a.length + 1 );
		initArray( borrow, 0);
		for( i = 0; i < a.length; i++){
			if(a[i] < b[i] || a[i] < 0){
				table[i+1] -= 1;
				table[i] +=10;
				borrow[i+1] = 1;
			}
		}
		var result = 0;
		for( i = 0; i < a.length; i++){
			if(b[i]){
				result += (a[i] - b[i]) * Math.pow(10,i);
			}
			else{
				result += a[i] * Math.pow(10,i);
			}
		}
		return { borrow: borrow, result: result};
	},

	// returns the an array version of n, that has array.length>=length and is padded with 0�s
	paddedDigits: function( n, length ){
		var result = KhanUtil.digits(n);
		return padd( result, length );
	},

	// returns a padded version of arr, that has arr.length>=length and is padded with 0�s
	padd: function( arr, length){
		var result = arr.slice();
		if( result.length >= length ){
			return result;
		}
		for( var i = result.length ; i < length; i++ ){
			result[i] = 0;
		}
		return result;
	},

	// completly fills the arr array with the val value
	initArray: function( arr, val){
		for( var i = 0; i < arr.length; i++){
			arr[i] = val;
		}
	},

	// returns an integer of length, that contains no zeros
	intWithoutZero: function( length ){
		var result = 0;
		for( var i = 0; i < length; i++ ){
			result += KhanUtil.randRange( 1, 9 ) * Math.pow( 10, i );
		}
		return result;
	}
});
