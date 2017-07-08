<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge"> <!-- ie互換モード -->
  <meta name="viewport" content="width=device-width, initial-scale=1"> <!-- viewport設定 -->

  <!-- html5のie対応 -->
  <!--[if lt IE 9]>
		<script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
		<script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
	<![endif]-->

  <!-- Font Awesome CDN-->
	<script src="https://use.fontawesome.com/3190151f5e.js"></script>
  <!-- Font Adobe-typekit -->
	<script src="https://use.typekit.net/xxx7jhr.js"></script>
	<script>try{Typekit.load({ async: true });}catch(e){}</script>

  <!-- css -->
  <link rel="stylesheet" href="<?php echo get_stylesheet_uri(); ?>" media="screen" />

  <link rel="stylesheet" href="<?php echo get_template_directory_uri();?>/dist/css/main.min.css" media="screen" />

  <!-- js -->

  <?php wp_head(); ?>
</head>
