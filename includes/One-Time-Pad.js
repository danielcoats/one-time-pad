$(document).ready(function(){
	const A			= 65; // ASCII value for A
	const Z			= 90; // ASCII value for Z
	const CHARSET	= 26; // Length of Alphabet

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
	 *	Format Text
	 *
	 *	@param txt			Text to format
	 *	@return				Formatted text
	 */
	function formatText(txt){
		var tmp	= '';

		//-- Separate string into groups of 5 letters --
		for(var i = 0; i < txt.length; i++){
			tmp += txt[i];

			if(i % 5 == 4)
				tmp += ' ';
		}

		return tmp;
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
			alert('Invalid Key');
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
	 *	Better modulo
	 *
	 *	@param n, m			Ints to mod
	 *	@return				Result of modulo
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
		var outPut = [];

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

						outPut.push('(' + msgTmp + ' + ' + keyTmp + ')' + ' % ' + 26 + ' = ' + tmp + " => " + map[tmp] + '\r');
						out += map[tmp];
					}

				//-- Show process --
				var counter = 0;
			    var toConsole = function() {
			        $('#output').append(outPut[counter++]);
					var textarea = document.getElementById('output');
					textarea.scrollTop = textarea.scrollHeight;

			        if (counter < outPut.length) {
			            setTimeout(toConsole, 500);
			        }
			    };
			    toConsole();

				//-- Display output --
				$('#input').val(msg);
				$('#key').val(key);
				setTimeout(function() {
					$('#output').append(out + '\n');
				}, 500 * outPut.length);

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

					outPut.push('(' + msgTmp + ' + ' + keyTmp + ')' + ' % ' + 26 + ' = ' + tmp + " => " + map[tmp] + '\n');
					out += map[tmp];
				}

				//-- Show process --
				var counter = 0;
			    var toConsole = function() {
			        $('#output').append(outPut[counter++]);
					var textarea = document.getElementById('output');
					textarea.scrollTop = textarea.scrollHeight;
			        if (counter < outPut.length) {
			            setTimeout(toConsole, 500);
			        }
			    };
			    toConsole();

				//-- Display output --
				$('#input').val(msg);
				$('#key').val(key);
				setTimeout(function() {
					$('#output').append(out + '\n');
				}, 500 * outPut.length);
			}
		}
	});

	//-- Reset Fields --
	$('#reset').click(function(){
		$('.output').html('<textarea class="form-control" id="output" name="output" rows="5" readonly></textarea>');
	});
});
