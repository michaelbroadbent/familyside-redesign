<?php
    // read in package.json, extract version number, use for cachebusting
    // version number is updated via gulp production build
    $packageJson = json_decode(file_get_contents("../package.json"), true);
    $versionNo = $packageJson["version"];
    $errbitKey = $packageJson["errbit-key"];
?>

<!doctype html>
<html lang="en" ng-app="fastfamilyside" id="ng-app">
	<head>

		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=10">
		<title>FAST V4 Family Side</title>
        <link rel="icon" href="img/logos/favicon.ico">
        <script>
            var versionNo = "<?=$versionNo?>";
            var errbitKey = "<?=$errbitKey?>";
        </script>

		<!-- FONTS -->
		<link href='https://fonts.googleapis.com/css?family=Open+Sans:300italic,600italic,700italic,800italic,300,400,600,700,800' rel='stylesheet' type='text/css'>

        <!-- CSS Libs -->
        <!-- <link rel="stylesheet" href="production/css/lib.css?v=<?=$versionNo?>"> -->

        <!--CSS Source -->
        <link rel="stylesheet" href="production/css/source.css?v=<?=$versionNo?>">

        <!--JS Libs -->
        <script type="text/javascript" src="production/js/lib.js?v=<?=$versionNo?>"></script>

        <!--JS Source -->
        <script type="text/javascript" src="production/js/source.js?v=<?=$versionNo?>"></script>

		<!-- Le HTML5 shim, for IE6-8 support of HTML5 elements -->
		<!--[if lt IE 9]>
		<script src="http://html5shim.googlecode.com/svn/trunk/html5.js"></script>
		<![endif]-->

        <script>
            (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
            (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
            m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
            })(window,document,'script','//www.google-analytics.com/analytics.js','ga');
            ga('create', 'UA-31593674-6', 'auto');
            ga('send', 'pageview');
        </script>

	</head>
	<body id="bootstrap-overrides">

		<div ng-include="" src=" 'nav/navbar.html' "></div>

		<!-- Start Content -->
		<div class="off-canvas-wrap">
			<div class="container-fluid">
				<div class="row">
					<!-- Desktop navigation -->
					<div ng-include="" src=" 'sidebar/sidebar.html' "></div>

					<!-- Main content -->
					<div class="main-content col-sm-9">
						<div ui-view=></div>
					</div>
				</div>
			</div>
		</div>

	</body>
</html>
