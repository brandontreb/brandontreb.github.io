<?php
	/* linkshare.php */
 	$token = "";
 	$mid = "";
 	$linkShareReturn = "";
 	
 	if(isset($_POST['url'])) {
		// Your linkshare API token
		$token = $_POST['token'];
		// Apples Merchant ID
		$mid   = $_POST['mid'] ? $_POST['mid'] : $_POST['mid_other_id'];
	 
		$link = $_POST['url'];
	 
		// I assume links in an array of links to the app store
		$linkShareURL = "http://feed.linksynergy.com/createcustomlink.shtml?".
			"token=$token&mid=$mid&murl=$link&mt=8&buylink=yes";
		$linkShareReturn = file_get_contents($linkShareURL);
	}
 
?>
<html>
	<head>
		<title>LinkShare Link Generator</title>
		<link type='text/css' rel='stylesheet' href='style.css'>
	</head>
	<body>
		
		<!--
<form method="post">
			<label>LinkShare Token:</label><br />
			<input type="text" name="token" size="75" value="<?php echo $token; ?>"> <br/>
			<label>Merchant:</label><br />
			<select name="mid" onchange="
				if(this.value == 'other') {
					document.getElementById('mid_other').style.display='block';
				} else {
					document.getElementById('mid_other').style.display='none';
				}
			">
				<option value="13508">Apple iTunes</option>
				<option value="other" onselect="alert('foo');">Other</option>
			</select> <br/>
			<span id="mid_other" style="display:none;">
				<label>Merchant ID:</label><br />
				<input type="text" name="mid_other_id" size="15"> <br/>
			</span>
			<label>URL:</label><br />
			<input type="text" name="url" size="75"> <br/>
			<input type="submit" name="Submit" value="Submit">
		</form>
-->
		<div id="stylized" class="myform">
			<form id="form" name="form" method="post" action="">
			<h1>Linkshare Affiliate Link Generator</h1>
			<center><img src="http://brandontreb.com/wp-content/uploads/2009/11/logo.gif"></center>
			<p><?php if($linkShareReturn): ?>
		<span style="color:#FF0000;">LinkShare URL:</span><br />
		<textarea rows="5" cols="53"><?php echo $linkShareReturn; ?></textarea>
		<?php endif; ?></p>
			
			<label>Link Share Token:
			<span class="small">You get this when you sign up for their API</span>
			</label>
			<input type="text" name="token" id="token" value="<?php echo $token; ?>" />
			
			<label>Merchant:
			<span class="small"></span>
			</label>
			<select name="mid" style="margin-left:10px;margin-bottom:15px;" onchange="
				if(this.value == 'other') {
					document.getElementById('mid_other').style.display='block';
				} else {
					document.getElementById('mid_other').style.display='none';
				}
			">
				<option value="13508">Apple iTunes</option>
				<option value="other" >Other</option>
			</select> <br/>
			<!--
<span id="mid_other" style="display:none;">
				<label>Merchant ID:</label><br />
-->
				<span id="mid_other" style="display:none;">
				<label>Merchant ID:
					<span class="small">ID of the merchant to get a URL for.</span>
				</label>
				<input type="text" name="mid_other_id" > 
				</span>
			
			<label>URL:
			<span class="small">The App Store URL of the app.</span>
			</label>
			<input type="text" name="url" id="url" />
			
			<button type="submit" name="submit">Submit</button>
			<div class="spacer"></div>
			
			</form>
		</div>
	</body>
</html>
