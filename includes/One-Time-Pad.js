$(document).ready(function(){

	var map = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
			   'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

	/**
	 *	Cleanse Text
	 *
	 *	@param txt			Text to cleanse
	 *	@return				Cleansed text
	 */
	function cleanseText(txt){
		txt = txt.toUpperCase();
		return txt.replace(/[^a-z]+/gi, '');
	}

	/**
	 *	Detect Errors
	 *
	 *	@param msg			Input
	 *	@param key			Secret key
	 *	@param button		Which button was pressed
	 *	@return				true: errors
	 *						false: no errors
	 */
	function detectErrors(msg, key, button){
		//-- If no message, warn user --
		if(msg.length < 1){
			alert('Input Required');
			return true;
		}

		//-- If no key available --
		if((key.length < 1) && (button == 'decrypt')){
			alert('Key Required');
			return true;
		}

		//-- If key is too short, warn user --
		if((msg.length > key.length)){
			alert('Invalid Key. Key must be at least as long as the message.');
			return true;
		}

		return false;
	}

	/**
	 *	Generate Secret Key
	 *
	 *	@param txt			Text to determine key length
	 *	@return				Secret key
	 */
	function generateKey(txt){
		var key = '';

		//-- Generate secret key with same length as message --
		for(var i = 0; i < txt.length; i++)
			key	+= map[Math.floor(Math.random() * 26)];

		return key;
	}

	/**
	 *	Better modulus
	 *
	 *	@param n, m			Integers
	 *	@return				Result of modulus
	 */
	function mod(n, m) {
        return ((n % m) + m) % m;
	}

	//-- Only Allow Letters To Be Typed --
	$('textarea').alpha();

	//-- Encrypt, Decrypt Input --
	$('#encrypt, #decrypt').click(function(){
		//-- Get Inputs --
		var btn = $(this).attr('id');
		var msg	= cleanseText($('#input').val());
		var key	= cleanseText($('#key').val());
		var out	= '';
		var outArray = [];

		//-- Encrypt Input --
		if(btn == 'encrypt'){
			//-- If no key, generate key --
			if(key.length < 1)
				key = generateKey(msg);

			//-- Check for errors --
			if(!detectErrors(msg, key, btn)){
					//-- Encrypt msg with key --
					for(var i = 0; i < msg.length; i++){
						var msgTmp	= map.indexOf(msg[i]);
						var keyTmp	= map.indexOf(key[i]);
						var tmp		= (msgTmp + keyTmp) % 26;

						outArray.push('(' + msgTmp + ' + ' + keyTmp + ')' + ' % ' + 26 + ' = ' + tmp + " => " + map[tmp] + '\r');
						out += map[tmp];
					}

				//-- Show process of enciphering --
				var counter = 0;
			    var toConsole = function() {
			        $('#output').append(outArray[counter++]);

					//-- Scroll to bottom of output --
					var textarea = document.getElementById('output');
					textarea.scrollTop = textarea.scrollHeight;

			        if (counter < outArray.length) {
			            setTimeout(toConsole, 500);
			        }
			    };
			    toConsole();

				//-- Display output --
				$('#input').val(msg);
				$('#key').val(key);

				//-- Delay until all steps have been output --
				setTimeout(function() {
					$('#output').append(out + '\n');
				}, 500 * outArray.length);

			}
		}

		//-- Decrypt Input --
		else if(btn == 'decrypt'){
			//-- Check for errors --
			if(!detectErrors(msg, key, btn)){
				//-- Decrypt msg with key --
				for(var i = 0; i < msg.length; i++)
				{
					var msgTmp	= map.indexOf(msg[i]);
					var keyTmp	= map.indexOf(key[i]);
					var tmp		= mod(msgTmp - keyTmp, 26);

					outArray.push('(' + msgTmp + ' + ' + keyTmp + ')' + ' % ' + 26 + ' = ' + tmp + " => " + map[tmp] + '\n');
					out += map[tmp];
				}

				//-- Show process of deciphering --
				var counter = 0;
			    var toConsole = function() {
			        $('#output').append(outArray[counter++]);

					//-- Scroll to bottom of output --
					var textarea = document.getElementById('output');
					textarea.scrollTop = textarea.scrollHeight;

			        if (counter < outArray.length) {
			            setTimeout(toConsole, 500);
			        }
			    };
			    toConsole();

				//-- Display output --
				$('#input').val(msg);
				$('#key').val(key);

				//-- Delay until all steps have been output --
				setTimeout(function() {
					$('#output').append(out + '\n');
				}, 500 * outArray.length);
			}
		}
	});

	//-- Reset Fields --
	$('#reset').click(function(){
		$('.output').html('<textarea class="form-control" id="output" name="output" rows="5" readonly></textarea>');
		$('input').val('');
	});
	
});
