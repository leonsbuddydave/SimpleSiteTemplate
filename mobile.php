<!DOCTYPE html>
	<head>
		<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0"/ >
		<title></title>
	</head>
	<body>
		<?php
			$pagesDirectory = "pages/";
			$extension = ".html";

			$page = "home";
			if (isset( $_GET['p'] ))
			{
				$page = $_GET['p'];
			}

			$page .= $extension;
		?>

		<style type="text/css">
			iframe
			{
				border: 0;
				width: 100%;
				height: 100%;
				position: absolute;
				top: 50px;
			}

			nav
			{
				position: absolute;
				left: 0;
				top: 0;
				width: 100%;
				background-color: #f00;
				color: #fff;
				z-index: 100;
				height: 50px;
				font-family: Arial, Helvetica, sans-serif;
			}

			ul
			{
				list-style-type: none;
				margin: 0;
				padding: 0;
			}

			li
			{
				text-align: center;
				float: left;
				width: 33%;
				margin-top: 13px;
			}

			a
			{
				color: #fff;
				text-decoration: none;
			}
		</style>

		<nav>
			<ul>
				<li><a href="mobile.php?p=home">HOME</a></li>
				<li><a href="mobile.php?p=about">ABOUT</a></li>
				<li><a href="mobile.php?p=schedule">SCHEDULE</a></li>
			</ul>
		</nav>

		<iframe id="page" src='<?php echo $pagesDirectory; echo $page; ?>'></iframe>
	
		<script type="text/javascript">
			window.Resize = function(e)
			{
				var p = document.getElementById("page");

				p.style.height = (window.innerHeight - 50) + "px";
			}

			window.addEventListener("resize", Resize);

			Resize();
		</script>
	</body>
</html>